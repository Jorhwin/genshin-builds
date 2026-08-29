import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const targets = [
  { file: 'comparisons.js', exportName: 'comparisons' },
  { file: 'analyses.js', exportName: 'analyses' },
  { file: 'guides.js', exportName: 'guides' },
  { file: 'changelog.js', exportName: 'changelog' },
];

for (const t of targets) {
  const mod = await import(pathToFileURL(base + t.file).href);
  const raw = mod[t.exportName];
  const arr = Array.from(raw);
  const before = arr.length;
  const cleaned = arr.filter((x) => x && typeof x === 'object' && (x.slug || x.date));
  const body = cleaned.map((c) => JSON.stringify(c, null, 2)).join(',\n');
  const content = `export const ${t.exportName} = [\n${body}\n];\n`;
  writeFileSync(base + t.file, content, 'utf-8');
  console.log(t.file, 'before', before, 'after', cleaned.length);
}
