const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// 1. Character page - add weakness/controversy sections
let charPage = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");

console.log("Char page length: " + charPage.length);

// Add weakness section before the version badge
// The anchor is the closing of the insight box
const anchor1 = '  <div class="version-badge">Updated for Version 5.x</div>';
const insert1 = '  {coreInsights[c.slug] && coreInsights[c.slug].weakness && (\n    <div class="card" style="border-color:rgba(255,96,32,0.2);">\n      <h3 style="color:#ff6020;">When NOT to use this character</h3>\n      <p>{coreInsights[c.slug].weakness}</p>\n    </div>\n  )}\n\n  {coreInsights[c.slug] && coreInsights[c.slug].controversy && (\n    <div class="card" style="border-color:rgba(255,215,0,0.2);">\n      <h3 style="color:#ffd700;">Community Controversy</h3>\n      <p>{coreInsights[c.slug].controversy}</p>\n    </div>\n  )}\n\n  <div class="version-badge">Updated for Version 5.x</div>';

charPage = charPage.replace(anchor1, insert1);
console.log("After replace length: " + charPage.length);

fs.writeFileSync(base + "/src/pages/character/[slug].astro", charPage, "utf-8");
console.log("Character page updated");

// 2. Build page - add Common Mistakes section
let buildPage = fs.readFileSync(base + "/src/pages/build/[slug].astro", "utf-8");
console.log("Build page length: " + buildPage.length);

const anchor2 = '  <div class="internal-links">';
const insert2 = '  <h2>Common Mistakes When Building This Character</h2>\n  <ul>\n    <li>Using wrong main stat on artifacts — stat priority beats set bonus in most cases.</li>\n    <li>Ignoring Energy Recharge requirements — not enough ER breaks the rotation.</li>\n    <li>Copying whale builds — most guides assume 5-star weapons and high cons.</li>\n    <li>Over-investing in ATK when the character scales with HP, DEF, or EM.</li>\n    <li>Not leveling the right talents first — some talent upgrades are trap investments.</li>\n  </ul>\n\n  <div class="internal-links">';

buildPage = buildPage.replace(anchor2, insert2);
fs.writeFileSync(base + "/src/pages/build/[slug].astro", buildPage, "utf-8");
console.log("Build page updated");

console.log("DONE");