const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
let content = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");

// Add import
content = content.replace(
  'import { coreInsights } from "../../data/insights";',
  'import { coreInsights } from "../../data/insights";\nimport { extendedGuides } from "../../data/extended-guides";'
);

// Add extended guide section before the version badge
content = content.replace(
  '  <div class="version-badge">Updated for Version 5.x</div>',
  '  {extendedGuides[c.slug] && (\n    <div class="card" style="margin: 20px 0; border-color: rgba(96,128,255,0.15);">\n      <h3 style="color: var(--accent);">In-Depth Guide</h3>\n      <div style="white-space: pre-line; line-height: 1.8;">{extendedGuides[c.slug].guide}</div>\n    </div>\n  )}\n\n  <div class="version-badge">Updated for Version 5.x</div>'
);

fs.writeFileSync(base + "/src/pages/character/[slug].astro", content, "utf-8");
console.log("Character template updated with extended guides");