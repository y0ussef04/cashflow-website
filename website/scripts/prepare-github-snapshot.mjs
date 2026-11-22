// Prepare a new website-only repository directory. Never push or alter existing Git history.
import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(import.meta.dirname, '../..');
const source = join(root, 'website');
const destination = join(root, 'scratch/release-preparation', `github-website-${new Date().toISOString().replace(/[:.]/g, '-')}`);
mkdirSync(join(destination, 'website'), { recursive: true });
const allowed = ['src', 'public', 'scripts', 'tests', 'package.json', 'package-lock.json', 'next.config.ts',
  'tsconfig.json', 'postcss.config.mjs', 'playwright.config.ts', 'wrangler.jsonc', '.node-version', '.gitignore', '.env.example', 'README.md'];
for (const name of allowed) cpSync(join(source, name), join(destination, 'website', name), { recursive: true, errorOnExist: true, force: false });
cpSync(join(root, 'supabase/tests/catalog-golden-vectors.json'), join(destination, 'website/tests/catalog-golden-vectors.json'));
mkdirSync(join(destination, 'docs/release'), { recursive: true });
cpSync(join(root, 'docs/release/cloudflare-github-deployment-guide.md'), join(destination, 'docs/release/cloudflare-github-deployment-guide.md'));
writeFileSync(join(destination, '.gitignore'), '.env\n.env.*\n!.env.example\nnode_modules/\n.next/\nout/\n.wrangler/\n*.jks\n*.keystore\n*.tsbuildinfo\n');
const inventory = [];
function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) scan(path);
    else inventory.push({ path: path.slice(destination.length + 1).replaceAll('\\', '/'), sha256: createHash('sha256').update(readFileSync(path)).digest('hex') });
  }
}
scan(destination);
writeFileSync(join(destination, 'snapshot-manifest.json'), JSON.stringify({ scope: 'Website only; no prior Git history, backend, Dashboard, credentials or APK', files: inventory }, null, 2) + '\n');
writeFileSync(join(root, 'docs/evidence/final-completion/github-snapshot.json'), JSON.stringify({ directory: destination, file_count: inventory.length, published: false }, null, 2) + '\n');
console.log(`Prepared ${inventory.length} files in ${destination}. No Git repository initialized or remote publishing performed.`);
