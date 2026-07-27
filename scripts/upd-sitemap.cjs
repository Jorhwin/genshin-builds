const fs=require("fs");
const base="D:/GAME/Game web 1000plus AI/genshin-builds";
let s=fs.readFileSync(base+"/scripts/generate-sitemap.mjs","utf-8");
s=s.replace('import { guides } from "../src/data/guides.js";','import { guides } from "../src/data/guides.js";\nimport { changelog } from "../src/data/changelog.js";');
s=s.replace('}\n\nconst site','}\nfor (const e of changelog) {\n  pages.push({ loc: "/changelog/", priority: "0.6" });\n}\n\nconst site');
// Remove duplicate changelog entries
s=s.replace('for (const e of changelog) {\n  pages.push({ loc: "/changelog/", priority: "0.6" });\n}\nfor (const e of changelog) {\n  pages.push({ loc: "/changelog/", priority: "0.6" });\n}','for (const e of changelog) {\n  pages.push({ loc: "/changelog/", priority: "0.6" });\n}');
fs.writeFileSync(base+"/scripts/generate-sitemap.mjs",s,"utf-8");
console.log("Sitemap generator updated");