const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

const data = {
  "raiden-shogun": {
    whyItWorks: "Raiden's damage scales with ER through A4 passive — each 1% ER above 100% gives 0.4% Electro DMG. At 270% ER she gains 68% Electro DMG Bonus from passive alone.",
    keyThreshold: "220% ER minimum, 270% optimal with Engulfing Lightning. Below 200% ER kills both damage and team energy refund.",
    metaStatus: "S-tier. Fits Hypercarry, National, and Hyperbloom. Universal value.",
    weakness: "Avoid if your team doesn't rely on burst rotation. Underperforms in quick-swap teams. Fischl provides comparable off-field Electro at lower investment cost.",
    controversy: "Some argue C2 Raiden is overrated — C0 National clears Abyss just as fast as C2 Hypercarry in most cycles."
  },
  "hu-tao": {
    whyItWorks: "HP-to-ATK conversion (E skill) with 33% Pyro DMG below 50% HP. Double Hydro core ensures 100% Vaporize uptime on every charged attack.",
    keyThreshold: "HP 30k-35k. EM 100-200. CRIT Rate 70%+ with DMG circlet.",
    metaStatus: "S-tier single-target Pyro DPS, but Arlecchino offers similar damage without HP management complexity.",
    weakness: "NOT recommended for mobile players or those who dislike jump-cancels. Underperforms in multi-wave content. C0 stamina management is punishing.",
    controversy: "Since Arlecchino's release, debate rages on whether Hu Tao is still worth pulling. Arlecchino does comparable damage without the HP micromanagement."
  },
  "neuvillette": {
    whyItWorks: "CA beam scales purely on HP — his damage doesn't depend on reaction uptime. A1 passive boosts CA damage by 110% on three different Hydro reactions.",
    keyThreshold: "HP 40k+. ER 110-120% solo, 100% with Furina.",
    metaStatus: "Top 3 DPS. Self-heal makes him extremely comfortable with Furina teams.",
    weakness: "Extremely vulnerable to interruption during CA without shield or Baizhu. Struggles against spread-out enemies. His linear beam AoE is wasted on scattered targets.",
    controversy: "Community divided on Neuvillette vs Ayato. Neuvillette wins raw damage; Ayato offers more team flexibility. Which is 'better' depends on account needs."
  },
  "nahida": {
    whyItWorks: "Off-field Dendro application via marked enemies. A4 gives on-field character 25% of her EM (up to 250). At 1000 EM, skill hits deal 200%+ more damage.",
    keyThreshold: "800 EM minimum, 1000 EM ideal. Beyond 1000, diminishing returns kick in.",
    metaStatus: "Absolute core of all Dendro teams. Irreplaceable in Hyperbloom, Spread, and Bloom.",
    weakness: "Mark application is range-limited. Needs a second Dendro for optimal performance. Extremely squishy compared to other supports.",
    controversy: "Nahida is the closest Genshin has to a 'mandatory' character for an entire archetype. Some argue she is replaceable by Dendro MC."
  },
  "zhongli": {
    whyItWorks: "Strongest shield + 20% universal RES shred. The only ability that makes any team unkillable without specific composition requirements.",
    keyThreshold: "HP 50k+ for max shield. Mixing ATK/CRIT for burst is viable but reduces shield strength.",
    metaStatus: "Always relevant. Universal RES shred makes him valuable in any team.",
    weakness: "Shield can be overkill in teams with strong healers (Kokomi, Baizhu). Another support (Kazuha) provides more total team damage. His personal damage is very low.",
    controversy: "Debate on whether Zhongli is worth a team slot in current meta. His 20% RES shred is smaller than VV's 40%. Some argue strong healers + buffers provide more value."
  },
  "kazuha": {
    whyItWorks: "A4 converts EM to Elemental DMG Bonus (0.04% per EM). At 1000 EM: 40% Elemental DMG + VV 40% RES shred = two independent damage amps that stack multiplicatively.",
    keyThreshold: "800-1000 EM optimal. Beyond 1000, diminishing returns.",
    metaStatus: "S-tier. Value increases with high-investment EM builds.",
    weakness: "CC pull weak against heavy enemies and bosses. EM-to-DMG conversion has diminishing returns above 1000 EM. Against bosses, his CC is wasted.",
    controversy: "Kazuha vs Sucrose debate continues. C6 Sucrose with TTDS can match or exceed his buffs in reaction teams. Is he worth 180 wishes over a free 4-star?"
  },
  "yelan": {
    whyItWorks: "Burst ramps 3.5% per second up to 50% over 15s. A4 increases active character's damage by 1% per 10s of burst duration (up to 50%).",
    keyThreshold: "ER 140-160% solo, 110-120% with another Hydro. HP 35k+.",
    metaStatus: "Core unit. HP-scaling + ramping damage gives increasing value over combat duration.",
    weakness: "Requires high investment (HP artifacts, ER substats) for peak damage. Solo Hydro ER needs are punishing (180-200%). Skill hard to aim on mobile.",
    controversy: "Yelan vs Furina is the most debated Hydro support question. Yelan is easier to build teams around; Furina provides higher damage buffing."
  },
  "alhaitham": {
    whyItWorks: "DMG scales with EM through A4 (0.1% per EM on Projection Attacks). Three mirrors = 90% more damage than one mirror. 4-second triple-mirror window for max burst.",
    keyThreshold: "EM 200-400. ATK 1,200+ base. 3-mirror uptime during burst windows is critical.",
    metaStatus: "Best on-field Dendro DPS. Works equally well in Spread and Quickbloom teams.",
    weakness: "Mirror management is punishing if mistimed — losing 3 mirrors wastes 30%+ of damage. Needs significant field time. Requires a second Dendro (Nahida) for optimal damage.",
    controversy: "Alhaitham vs Nahida as Dendro DPS is commonly debated. He deals more on-field damage; she provides team-wide EM buff. Most accounts benefit more from Nahida first."
  }
};

let output = "export const coreInsights = {\n";
for (const [slug, fields] of Object.entries(data)) {
  output += '  "' + slug + '": {\n';
  for (const [key, val] of Object.entries(fields)) {
    output += '    ' + key + ': "' + val.replace(/"/g, "\\'") + '",\n';
  }
  output += '  },\n';
}
output += "};\n";

fs.writeFileSync(base + "/src/data/insights.js", output, "utf-8");
console.log("Written: " + output.length + " bytes, " + Object.keys(data).length + " characters");

// Verify
let lines = output.split("\n").filter(l => l.includes("weakness:") || l.includes("controversy:")).length;
console.log("Weakness+controversy fields: " + lines);