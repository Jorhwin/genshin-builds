const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
["build","team","character","comparison","guide"].forEach(t => {
  const f = fs.readFileSync(base + "/src/pages/" + t + "/[slug].astro", "utf-8");
  console.log("=== " + t + " 模板 (" + f.length + " bytes) ===");
  console.log(f);
  console.log("");
});