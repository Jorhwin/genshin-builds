import { readFileSync, writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/pages/';
const files = ['index.astro', 'characters/index.astro', 'builds/index.astro', 'teams/index.astro'];
const routes = ['character', 'build', 'team'];

const avatar = '<span class={"avatar avatar-" + c.element.toLowerCase()}>{c.name.charAt(0)}</span>';

for (const f of files) {
  const path = base + f;
  let s = readFileSync(path, 'utf8');
  let count = 0;
  for (const r of routes) {
    const re = new RegExp('(<a href=\\{`/' + r + '/\\$\\{c\\.slug\\}/`\\}>)', 'g');
    s = s.replace(re, (m) => {
      count += 1;
      return m + '\n            ' + avatar;
    });
  }
  writeFileSync(path, s, 'utf8');
  console.log(f, 'avatars inserted:', count);
}
