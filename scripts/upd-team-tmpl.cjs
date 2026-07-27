const fs=require("fs");
const base="D:/GAME/Game web 1000plus AI/genshin-builds";
let t=fs.readFileSync(base+"/src/pages/team/[slug].astro","utf-8");
t=t.replace('import { characters } from "../../data/characters";','import { characters } from "../../data/characters";\nimport { teamExtendedGuides } from "../../data/extended-guides-team";');
t=t.replace('<div class="version-badge">','{teamExtendedGuides[c.slug] && (\n    <div class="card" style="margin:20px 0;border-color:rgba(96,128,255,0.15);">\n      <h3>Team Strategy Notes</h3>\n      <div style="white-space:pre-line;line-height:1.8;">{teamExtendedGuides[c.slug]}</div>\n    </div>\n  )}\n\n  <div class="version-badge">');
fs.writeFileSync(base+"/src/pages/team/[slug].astro",t,"utf-8");
console.log("Team template updated");