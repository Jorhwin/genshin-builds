import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { extendedGuides } from '../src/data/extended-guides.js';
import { groupA } from '../_gen/group-a.js';
import { groupB } from '../_gen/group-b.js';
import { groupC } from '../_gen/group-c.js';
import { groupD } from '../_gen/group-d.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = join(__dirname, '..', 'src', 'data', 'extended-guides.js');

const sources = [groupA, groupB, groupC, groupD];
const existing = new Set(Object.keys(extendedGuides));

let added = 0;
const blocks = [];
for (const src of sources) {
  for (const [slug, val] of Object.entries(src)) {
    if (existing.has(slug)) {
      console.log('SKIP (already exists):', slug);
      continue;
    }
    const guide = typeof val === 'string' ? val : val.guide;
    const json = JSON.stringify(guide); // properly escapes \n and quotes
    blocks.push(`  "${slug}": {\n    "guide": ${json}\n  },`);
    added++;
  }
}

if (added === 0) {
  console.log('Nothing to add. All 40 already present.');
  process.exit(0);
}

let raw = readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
// Strip the trailing export-closing `};`
const idx = raw.lastIndexOf('};');
if (idx === -1) {
  console.error('Could not find closing }; in extended-guides.js');
  process.exit(1);
}
const head = raw.slice(0, idx);
const tail = raw.slice(idx); // '};'

// Ensure there's a separator from the previous entry
const sep = head.trimEnd().endsWith(',') || head.trimEnd().endsWith('{') ? '\n' : ',\n';
const insert = sep + blocks.join('\n') + '\n';
const out = head + insert + tail;

writeFileSync(target, out, 'utf8');
console.log(`Added ${added} new character guides. New total: ${Object.keys(extendedGuides).length + added}`);
