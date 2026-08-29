const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
let chars = fs.readFileSync(base + "/src/data/characters.js", "utf-8");

// 1. 去重：保留每个 slug 第一次出现，删除重复块
const slugPattern = /(\{\s*slug: "([^"]+)",[\s\S]*?\n  \},)/g;
let match;
const seen = new Set();
let result = "";
let lastIdx = 0;
const blocks = [];
while ((match = slugPattern.exec(chars)) !== null) {
  blocks.push({ full: match[0], slug: match[1], start: match.index });
}
const arrayStart = chars.indexOf("export const characters = [");
const header = chars.substring(0, arrayStart + "export const characters = [".length);
let output = header;
const uniqueBlocks = [];
for (const b of blocks) {
  if (!seen.has(b.slug)) {
    seen.add(b.slug);
    uniqueBlocks.push(b.full);
  }
}
const closingIdx = chars.lastIndexOf("];");
output = header + "\n" + uniqueBlocks.join("\n") + "\n];";
fs.writeFileSync(base + "/src/data/characters.js", output, "utf-8");
console.log("去重后角色数: " + uniqueBlocks.length);