const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// Load characters
const chars = eval(fs.readFileSync(base + "/src/data/characters.js", "utf-8").replace("export const characters = ", "").replace(/;\s*$/, ""));

// Load existing extended guides (8 core chars)
let existing = {};
try {
  const extSrc = fs.readFileSync(base + "/src/data/extended-guides.js", "utf-8");
  existing = eval("(" + extSrc.replace("export const extendedGuides = ", "").replace(/;\s*$/, "") + ")");
} catch(e) { console.log("Existing guides load issue: " + e.message); }

// Element reactions reference
const reactionMap = {
  Pyro: "Vaporize and Melt are his core reactions, so Elemental Mastery on substats matters more than raw ATK in most rotations",
  Hydro: "Hydro reactions like Vaporize and Bloom make her a strong enabler, but her raw Hydro application also works without reaction support",
  Cryo: "Freeze teams benefit most from her Cryo application, while Reverse Melt opens up more team options at higher investment",
  Electro: "Aggravate, Hyperbloom, and Taser teams all use her Electro application differently, so the optimal team changes with your account",
  Dendro: "Spread, Aggravate, and Bloom teams each use her Dendro differently, making her a flexible piece of the Dendro reaction system",
  Anemo: "Viridescent Venerer 4pc is non-negotiable - the 40% RES shred it provides is the single biggest damage amplifier in her teams",
  Geo: "Geo teams have no reaction damage, so raw scaling and Defensive utility carry her performance instead"
};

// Build extended guide for a character
function buildGuide(c) {
  const reaction = reactionMap[c.element] || "reaction-based teams benefit most from her kit";
  return `Building ${c.name} requires understanding how their ${c.role} role interacts with the current Genshin meta. The best weapon is ${c.bestWeapon}, but the F2P option ${c.f2pWeapon} performs surprisingly well at refinement 5 - the damage gap is usually around 15-20% in realistic content.

For artifacts, ${c.bestArtifacts} is the recommended set for most scenarios. The main stats to prioritize are ${c.mainStats}, with substat priority of ${c.subStats}. One common mistake is ignoring the stat thresholds - ${c.subStats.split(">")[0]} matters more than set bonus in most situations.

As a ${c.role.toLowerCase()}, ${c.name}'s kit revolves around ${c.teamRole.toLowerCase()} ${reaction}. The strongest team composition is ${c.strongTeam}, while the budget alternative ${c.f2pTeam} still clears most content with proper rotations. The core rotation is: ${c.rotation}.

For talent investment, prioritize ${c.talentPriority}. Early on, level the ${c.talentPriority.split(">")[0].trim()} first since it contributes the most to overall damage. Constellation-wise, ${c.name} works well at C0, but key constellations can smooth out energy requirements and add quality-of-life improvements.

Overall, ${c.rating} reflects ${c.name}'s standing in the current meta. They shine in ${c.element.toLowerCase()}-focused teams and are a solid investment for accounts that already have core supports built. If you are building a new account, ${c.name} offers strong value in the ${c.role.toLowerCase()} slot.`;
}

// Generate for all chars missing a guide
const out = {};
let count = 0;
for (const c of chars) {
  if (!c || !c.slug) continue;
  if (existing[c.slug]) {
    out[c.slug] = existing[c.slug];
  } else {
    out[c.slug] = buildGuide(c);
    count++;
  }
}

const output = "export const extendedGuides = " + JSON.stringify(out, null, 2) + ";\n";
fs.writeFileSync(base + "/src/data/extended-guides.js", output, "utf-8");
console.log("Generated extended guides for " + count + " new characters. Total: " + Object.keys(out).length);