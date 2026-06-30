const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
const file = base + "/src/pages/character/[slug].astro";

let content = fs.readFileSync(file, "utf-8");
console.log("Length: " + content.length);
console.log("Has Gameplay: " + content.includes("Gameplay"));

if (!content.includes("Gameplay")) {
  const insert = [
    '  <h2>Gameplay Strategy</h2>',
    '  <div class="card">',
    "    <p>{c.name} functions best as a {c.role}. The key strategy is understanding how their kit scales and which teams maximize their contribution.</p>",
    "    <h3>Rotation Tips</h3>",
    "    <p>{c.rotation}</p>",
    '  </div>',
    ""
  ].join("\n");
  
  const anchor = '  <div class="insight-box" style="margin-top: 20px;">';
  content = content.replace(anchor, insert + anchor);
  fs.writeFileSync(file, content, "utf-8");
  console.log("Enhanced! New: " + content.length);
} else {
  console.log("Already enhanced");
}