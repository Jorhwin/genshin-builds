const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
// 读取 characters.js 第一段确认字段
const chars = fs.readFileSync(base + "/src/data/characters.js", "utf-8");
const first = chars.match(/\{\s*slug: "[^"]+",[\s\S]*?\n\s*\}/);
console.log("=== 角色字段示例 ===");
console.log(first ? first[0] : "未找到");
// 检查 extended guides 覆盖
const bG = require(base + "/src/data/extended-guides-build.js");
const tG = require(base + "/src/data/extended-guides-team.js");
const eG = require(base + "/src/data/extended-guides.js");
console.log("\n=== Extended guides 覆盖 ===");
console.log("build extended:", Object.keys(bG).length, "角色");
console.log("team extended:", Object.keys(tG).length, "角色");
console.log("character extended:", Object.keys(eG).length, "角色");