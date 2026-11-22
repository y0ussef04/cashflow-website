// Local browser fixture with ephemeral signing keys. No cloud writes or real prices.
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { fixture } from './fixtures.mjs';
const f = fixture();
const server = createServer((request, response) => {
  const mode = new URL(request.url, 'http://127.0.0.1').searchParams.get('mode');
  let envelope = f.envelope();
  if (mode === 'expired') envelope = f.envelope({ ...f.payload, issued_at_ms: 1, not_before_ms: 1, refresh_by_ms: 2, expires_at_ms: 3 });
  if (mode === 'paused') envelope = f.envelope({ ...f.payload, checkout_policy: { ...f.payload.checkout_policy, sales_enabled: false } });
  if (mode === 'tampered') { const b = Buffer.from(envelope.signature_b64u, 'base64url'); b[b.length - 1] ^= 1; envelope.signature_b64u = b.toString('base64url'); }
  response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify({ catalog_v1: envelope }));
});
server.listen(3010, '127.0.0.1');
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3009'], {
  stdio: 'inherit', env: { ...process.env, NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS: `local-test=${f.publicKey}` }, windowsHide: true,
});
function close() { child.kill(); server.close(); }
process.on('SIGTERM', close); process.on('SIGINT', close);
child.on('exit', code => { server.close(); process.exitCode = code ?? 1; });
