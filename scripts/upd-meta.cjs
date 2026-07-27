const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// 1. Character page
let c = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");
c = c.replace(
  'const title = c.name + " Build Guide - Best Weapons and Artifacts 2026"',
  'const title = c.name + " Best Build & Weapons Guide (2026) - Artifacts, Teams & Rotation"'
);
c = c.replace(
  'const description = "Complete " + c.name + " build guide. Best weapon: " + c.bestWeapon + ". Best artifacts: " + c.bestArtifacts + "."',
  'const description = c.name + " best build guide for 2026. Top weapon: " + c.bestWeapon + " | F2P: " + c.f2pWeapon + " | Best artifacts: " + c.bestArtifacts + ". Complete stats, team comps & rotation guide included."'
);
fs.writeFileSync(base + "/src/pages/character/[slug].astro", c, "utf-8");
console.log("Character meta updated");

// 2. Build page
let b = fs.readFileSync(base + "/src/pages/build/[slug].astro", "utf-8");
b = b.replace(
  'const title = c.name + " Best Build Guide 2026 - Weapons & Artifacts"',
  'const title = c.name + " Best Build Guide (2026) - Best Weapons, Artifacts & Teams"'
);
b = b.replace(
  'const description = "Best " + c.name + " build guide. Best weapon: " + c.bestWeapon + ". F2P option: " + c.f2pWeapon + ". Best artifact set: " + c.bestArtifacts + ". Stats priority and rotation included."',
  'const description = "Best " + c.name + " build guide for 2026. Top weapon: " + c.bestWeapon + " | F2P option: " + c.f2pWeapon + " | Best artifact set: " + c.bestArtifacts + ". Stats priority, team comps & rotation included."'
);
fs.writeFileSync(base + "/src/pages/build/[slug].astro", b, "utf-8");
console.log("Build meta updated");

// 3. Team page
let t = fs.readFileSync(base + "/src/pages/team/[slug].astro", "utf-8");
t = t.replace(
  'const title = c.name + " Best Team Guide 2026 - Team Compositions"',
  'const title = c.name + " Best Team Guide (2026) - Best Team Compositions & Synergy"'
);
t = t.replace(
  'const description = "Best teams for " + c.name + ". Strongest team and F2P team. Team role and rotation guide."',
  'const description = "Best teams for " + c.name + " in 2026. Strongest team comp, F2P alternatives, team role analysis & rotation guide. Updated for current meta."'
);
fs.writeFileSync(base + "/src/pages/team/[slug].astro", t, "utf-8");
console.log("Team meta updated");

console.log("All meta titles/descriptions updated!");