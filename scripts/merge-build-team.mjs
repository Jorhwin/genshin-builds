import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

import { buildText, teamText } from '../_gen/guide-build-team.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function merge(targetRel, sourceObj, exportName) {
  const target = join(__dirname, '..', targetRel);
  const existing = await import(pathToFileURL(target).href + '?t=' + Date.now());
  const existingKeys = new Set(Object.keys(existing[exportName]));
  let added = 0;
  const blocks = [];
  for (const [slug, txt] of Object.entries(sourceObj)) {
    if (existingKeys.has(slug)) { console.log('SKIP', slug); continue; }
    const json = JSON.stringify(txt);
    blocks.push(`  "${slug}": ${json},`);
    added++;
  }
  if (!blocks.length) { console.log('Nothing to add to', targetRel); return; }
  let raw = readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
  const idx = raw.lastIndexOf('};');
  if (idx === -1) { console.error('No closing }; in', targetRel); process.exit(1); }
  const head = raw.slice(0, idx);
  const tail = raw.slice(idx);
  const sep = head.trimEnd().endsWith(',') || head.trimEnd().endsWith('{') ? '\n' : ',\n';
  const out = head + sep + blocks.join('\n') + '\n' + tail;
  writeFileSync(target, out, 'utf8');
  console.log(`Added ${added} to ${targetRel}. New total: ${existingKeys.size + added}`);
}

await merge('src/data/extended-guides-build.js', buildText, 'buildExtendedGuides');
await merge('src/data/extended-guides-team.js', teamText, 'teamExtendedGuides');
