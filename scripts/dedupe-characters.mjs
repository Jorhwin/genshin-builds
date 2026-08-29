import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const p = pathToFileURL('D:/GAME/Game web 1000plus AI/genshin-builds/src/data/characters.js').href;
const mod = await import(p);
const list = mod.characters;
const seen = new Set();
const out = [];
const removed = [];
for (const c of list) {
  if (!c || !c.slug) { removed.push('INVALID:' + JSON.stringify(c)); continue; }
  if (seen.has(c.slug)) { removed.push(c.slug); continue; }
  seen.add(c.slug);
  out.push(c);
}
const body = out.map((c) => JSON.stringify(c, null, 2)).join(',\n');
const content = `export const characters = [\n${body}\n];\n`;
writeFileSync('D:/GAME/Game web 1000plus AI/genshin-builds/src/data/characters.js', content, 'utf-8');
console.log('kept', out.length, 'removed', removed.length, removed.join(','));
