"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";

interface PhoneFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Restrained Android device bezel matching the exact 9:16 (720x1280) aspect ratio
 * of captured CashFlow screenshots so zero UI edges are clipped.
 * Handles pre-hydration cached/eager loads safely via ref inspection.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
}: PhoneFrameProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(priority);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        setLoaded(true);
      } else {
        setFailed(true);
      }
    } else if (!priority) {
      setLoaded(false);
    }
  }, [src, priority]);

  return (
    <div
      className={`relative mx-auto w-full max-w-[292px] rounded-[32px] border-[6px] border-[#0B2144] bg-[#0B2144] p-1.5 shadow-sm ${className}`}
    >
      {/* Top speaker/camera bar */}
      <div
        className="mx-auto mb-1.5 h-1.5 w-14 rounded-full bg-[#1E3A6D]"
        aria-hidden="true"
      />

      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-cf-bg border border-[#1E3A6D]/40">
        {!loaded && !failed && (
          <div
            className="absolute inset-0 bg-cf-surface-container"
            aria-hidden="true"
          />
        )}

        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-cf-text-muted">
            <ImageOff className="h-7 w-7" aria-hidden="true" />
            <span className="text-xs font-medium">{alt}</span>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover object-top transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"
              }`}
          />
        )}
      </div>
    </div>
  );
}
