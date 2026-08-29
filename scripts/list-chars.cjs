const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
const chars = fs.readFileSync(base + "/src/data/characters.js", "utf-8");
const names = [...chars.matchAll(/name: "([^"]+)"/g)].map(m => m[1]);
console.log("当前角色数: " + names.length);
console.log("角色列表: " + names.join(", "));