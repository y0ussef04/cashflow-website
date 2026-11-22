"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { verifySignedCatalogEnvelope, type VerifiedCatalogSummary } from "@/lib/catalogProtocol";

type Status = "loading" | "unconfigured" | "unavailable" | "invalid" | "expired" | "ready";
const Context = createContext<{ status: Status; catalog: VerifiedCatalogSummary | null; retry: () => void }>({ status: "unconfigured", catalog: null, retry: () => {} });
const WATERMARK_KEY = "cashflow_public_catalog_production_watermark";

export function PublicCatalogProvider({ children }: { children: React.ReactNode }) {
  const configured = Object.keys(siteConfig.catalog.trustedPublicKeys).length > 0;
  const [status, setStatus] = useState<Status>(configured ? "loading" : "unconfigured");
  const [catalog, setCatalog] = useState<VerifiedCatalogSummary | null>(null);
  const [attempt, setAttempt] = useState(0);
  const watermark = useRef<{ sequence: string; payloadSha256: string } | undefined>(undefined);
  const retry = useCallback(() => setAttempt(a => a + 1), []);
  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    setStatus("loading"); setCatalog(null);
    async function load() {
      try {
        // Browser storage improves rollback detection; it is never a licensing authority.
        if (!watermark.current) {
          try {
            const saved = JSON.parse(localStorage.getItem(WATERMARK_KEY) ?? "null");
            if (saved && /^[1-9][0-9]{0,15}$/.test(saved.sequence) && /^[a-f0-9]{64}$/.test(saved.payloadSha256)) watermark.current = saved;
          } catch { /* Storage may be unavailable. Keep the in-memory anchor. */ }
        }
        const response = await fetch(siteConfig.catalog.url, { method: "GET", cache: "no-store", credentials: "omit", redirect: "error", signal: controller.signal });
        if (!response.ok) throw new Error("Catalog unavailable");
        const data = await response.json();
        const verified = await verifySignedCatalogEnvelope(data.catalog_v1, {
          expectedEnvironment: siteConfig.catalog.environment, expectedProjectRef: siteConfig.catalog.projectRef,
          trustedPublicKeys: siteConfig.catalog.trustedPublicKeys, highWater: watermark.current,
        });
        if (cancelled) return;
        if (!verified.ok) { setStatus(verified.code === "CATALOG_EXPIRED" ? "expired" : "invalid"); return; }
        watermark.current = { sequence: verified.catalog.sequence, payloadSha256: verified.catalog.payload_sha256 };
        try { localStorage.setItem(WATERMARK_KEY, JSON.stringify(watermark.current)); } catch { /* In-memory protection remains. */ }
        setCatalog(verified.catalog); setStatus("ready");
      } catch { if (!cancelled) setStatus("unavailable"); }
      finally { clearTimeout(timeout); }
    }
    void load();
    return () => { cancelled = true; clearTimeout(timeout); controller.abort(); };
  }, [configured, attempt]);
  useEffect(() => {
    if (!catalog) return;
    const timer = setInterval(() => {
      if (Date.now() >= catalog.expires_at_ms) { setCatalog(null); setStatus("expired"); }
    }, 1000);
    const refresh = setTimeout(retry, Math.max(1000, Math.min(300000, catalog.refresh_by_ms - Date.now())));
    return () => { clearInterval(timer); clearTimeout(refresh); };
  }, [catalog, retry]);
  return <Context.Provider value={{ status, catalog, retry }}>{children}</Context.Provider>;
}
export function usePublicCatalog() { return useContext(Context); }
