const fs=require("fs");
const base="D:/GAME/Game web 1000plus AI/genshin-builds";
let t=fs.readFileSync(base+"/src/pages/build/[slug].astro","utf-8");
t=t.replace('import { characters } from "../../data/characters";','import { characters } from "../../data/characters";\nimport { buildExtendedGuides } from "../../data/extended-guides-build";');
t=t.replace('<div class="version-badge">','{buildExtendedGuides[c.slug] && (\n    <div class="card" style="margin:20px 0;border-color:rgba(96,128,255,0.15);">\n      <h3>Build Tips & Optimization</h3>\n      <div style="white-space:pre-line;line-height:1.8;">{buildExtendedGuides[c.slug]}</div>\n    </div>\n  )}\n\n  <div class="version-badge">');
fs.writeFileSync(base+"/src/pages/build/[slug].astro",t,"utf-8");
console.log("Build template updated");