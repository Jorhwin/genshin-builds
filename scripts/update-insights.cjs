const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

let content = fs.readFileSync(base + "/src/data/insights.js", "utf-8");

// Each character's additions: weakness and controversy
const extras = {
  "raiden-shogun": {
    weakness: "Avoid Raiden if your team does not rely on burst rotation. She underperforms in teams that don't need energy support or when enemies push her out of her burst radius. In quick-swap teams without burst reliance, Fischl often provides comparable value at lower investment.",
    controversy: "Some experienced players argue that C2 Raiden is overrated — her C0 National team clears content just as fast as C2 Hypercarry in most Abyss cycles, making the extra investment questionable for cost-conscious players."
  },
  "hu-tao": {
    weakness: "Hu Tao is NOT recommended for mobile players or those who struggle with jump-cancel mechanics. At C0, stamina management is punishing. She also underperforms in multi-wave content where enemy positioning changes frequently and against enemies that are difficult to Vaporize (like Hydro slimes).",
    controversy: "Since Arlecchino's release, there is active debate about whether Hu Tao is still worth pulling. Arlecchino offers comparable single-target damage without HP management, jump cancels, or stamina issues — making her the more comfortable choice for most players."
  },
  "neuvillette": {
    weakness: "Neuvillette is extremely vulnerable to interruption during his charged attack. Without a shield (Zhongli) or interrupt resistance (Baizhu), he gets knocked out of his beam frequently. He also struggles in content where enemies are spread far apart, wasting his linear beam AoE.",
    controversy: "The community is divided on whether Neuvillette or Hydro DPS units like Ayato provide more value. Neuvillette wins in raw damage numbers, but Ayato offers more team flexibility and easier team building. Which one is 'better' depends on your account's needs."
  },
  "nahida": {
    weakness: "Nahida's skill mark application is limited by range and she needs another Dendro character on the team for optimal performance. Against single-target bosses without consistent aura application, her personal damage drops significantly. She is also extremely squishy compared to other supports.",
    controversy: "Nahida is the only character in Genshin that feels 'mandatory' for an entire archetype (Dendro reactions). Some argue this is unhealthy game design, and others say she is replaceable by Dendro MC in Hyperbloom teams — though the damage loss is substantial."
  },
  "zhongli": {
    weakness: "Zhongli's shield can be overkill in teams with strong healers (Kokomi, Baizhu). In such teams, another support like Kazuha provides more total team damage. His personal damage is very low unless built hybrid, which reduces shield strength. He also provides no energy generation for the team.",
    controversy: "There is ongoing debate about whether Zhongli is worth a team slot in the current meta. His 20% RES shred is universal but smaller than dedicated supports (Kazuha 40%, VV). Some argue that strong healers + damage buffers provide more value than infinite shield uptime."
  },
  "kazuha": {
    weakness: "Kazuha's crowd control pull is weak against heavy enemies and bosses — his grouping only works on smaller mobs. His EM-to-DMG conversion has diminishing returns above 1000 EM. Against bosses, his damage amplification is still strong but his CC is wasted, reducing his value proposition.",
    controversy: "The Kazuha vs Sucrose debate continues in the community. C6 Sucrose with TTDS can provide comparable or even better damage buffs in reaction teams (Vaporize, Melt). Kazuha wins in mono-element teams. Whether he is 'worth 180 wishes' over Sucrose is the main point of contention."
  },
  "yelan": {
    weakness: "Yelan requires high investment (proper HP artifacts, ER substats) to reach her peak damage. As a solo Hydro unit, her ER needs are punishing (180-200%). Her skill can be difficult to aim effectively on mobile or controller. She also struggles to replace Xingqiu in teams that need his damage reduction.",
    controversy: "The Yelan vs Furina comparison is the most debated Hydro support question in 2026. Yelan is easier to build teams around (no healer requirement) but Furina provides higher damage buffing. Which one to pull depends entirely on the rest of your account."
  },
  "alhaitham": {
    weakness: "Alhaitham's mirror management is punishing if mistimed — losing all three mirrors wastes 30%+ of his damage potential. He requires significant field time that conflicts with other on-field DPS units. His teams also need a second Dendro character (Nahida) for optimal performance, making him a high-investment unit.",
    controversy: "The Alhaitham vs Nahida as Dendro DPS debate is common. Alhaitham deals more on-field personal damage, but Nahida provides team-wide EM buff and off-field application. Most accounts benefit more from Nahida first, then Alhaitham as a luxury pick for Spread teams."
  }
};

// Build the insertion text
let insert = "";
for (const [slug, data] of Object.entries(extras)) {
  insert += `\n"${slug}": {\n`;
  insert += `    weakness: "${data.weakness}",\n`;
  insert += `    controversy: "${data.controversy}"\n`;
  insert += `  },\n`;
}

// Find where to insert - we need to add weakness/controversy to EACH existing character entry
// Since each entry already ends with a closing }, we need to add these fields before the closing brace
for (const [slug, data] of Object.entries(extras)) {
  // Find the slug in the file
  const slugPattern = `"${slug}": {`;
  const slugIdx = content.indexOf(slugPattern);
  if (slugIdx === -1) continue;
  
  // Find the closing } of this entry
  // Look for the line that has just "  }," after the keyThreshold/metaStatus
  const searchFrom = slugIdx;
  const endPattern = "    metaStatus: \"";
  const metaIdx = content.indexOf(endPattern, searchFrom);
  if (metaIdx === -1) continue;
  
  // Find the end of the metaStatus value line
  const metaEnd = content.indexOf("\"", metaIdx + endPattern.length + 1);
  if (metaEnd === -1) continue;
  
  // Find the closing }, after metaStatus
  const closeIdx = content.indexOf("  },", metaEnd);
  if (closeIdx === -1) continue;
  
  // Insert weakness and controversy before closing }
  const insertText = `,\n    weakness: "${data.weakness}",\n    controversy: "${data.controversy}"\n  }`;
  
  // Replace "  }," with the extended version
  content = content.substring(0, closeIdx) + `  {\n    weakness: "${data.weakness}",\n    controversy: "${data.controversy}"\n  }` + content.substring(closeIdx + 4);
}

fs.writeFileSync(base + "/src/data/insights.js", content, "utf-8");
console.log("Updated insights.js with weakness and controversy data");

// Verify
let lines = content.split("\n").filter(l => l.includes("weakness:") || l.includes("controversy:")).length;
console.log("Fields added: " + lines);