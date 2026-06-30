const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";
let chars = fs.readFileSync(base + "/src/data/characters.js", "utf-8");

const newChars = [
  ["yae-miko", "Yae Miko", "Sub-DPS", "Electro", "Catalyst", "S", "Kaguras Verity", "Widsith / Oathsworn Eye", "Golden Troupe (4pc) / Gilded Dreams (4pc)", "ATK/EM Sands, Electro DMG Goblet, CRIT Circlet", "CRIT > ATK% > EM > ER%", "Skill > Burst", "Off-field turret Electro DPS — three totems auto-attack enemies.", "Yae + Fischl + Kazuha + Baizhu (Aggravate)", "Yae + Fischl + Sucrose + Yaoyao", "Yae provides consistent off-field Electro damage with her three totems.", "E (x3) >> Q >> E (x3)", "8.5/10"],
  ["yoimiya", "Yoimiya", "Main DPS", "Pyro", "Bow", "S", "Thundering Pulse", "Rust (R5) / Slingshot (R5)", "Shimenawa Reminiscence (4pc) / Echoes Offering (4pc)", "ATK Sands, Pyro DMG Goblet, CRIT Circlet", "CRIT > ATK% > EM", "Normal Attack > Skill > Burst", "Ranged Pyro DPS — auto-targeting attacks with consistent damage.", "Yoimiya + Yelan + Zhongli + Yun Jin", "Yoimiya + Xingqiu + Thoma + Sucrose", "Yoimiya is the easiest ranged Pyro DPS with braindead-auto gameplay.", "E (Skill) >> N5 spam >> Q", "8.5/10"],
  ["kamisato-ayato", "Ayato", "Main DPS", "Hydro", "Sword", "S", "Haran Geppaku Futsu", "Black Sword (BP) / Amenoma Kageuchi", "Echoes Offering (4pc) / Heart of Depth (4pc)", "ATK Sands, Hydro DMG Goblet, CRIT Circlet", "CRIT > ATK% > ER% > HP%", "Skill > Burst > Normal", "On-field Hydro DPS with wide slashes during skill stance.", "Ayato + Xiangling + Bennett + Kazuha (Soup)", "Ayato + Xiangling + Bennett + Sucrose", "Ayato provides consistent AoE Hydro with his versatile skill-based playstyle.", "E (Skill, stance) >> N3 spam >> Q", "8/10"],
  ["fischl", "Fischl", "Sub-DPS", "Electro", "Bow", "S", "Elegy for the End / Polar Star", "Stringless (R5) / Alley Hunter", "Golden Troupe (4pc)", "ATK Sands, Electro DMG Goblet, CRIT Circlet", "CRIT > ATK% > EM > ER%", "Skill > Burst > Normal", "Off-field Electro DPS — Oz attacks enemies for his entire duration.", "Fischl + Keqing + Kazuha + Baizhu (Aggravate)", "Fischl + Sucrose + Xingqiu + Beidou (Taser)", "Fischl's Oz provides the best single-target Electro application in the game.", "E (Oz) >> swap (refresh with Q)", "9/10"],
  ["cyno", "Cyno", "Main DPS", "Electro", "Polearm", "S", "Staff of the Scarlet Sands", "White Tassel (R5) / Deathmatch (BP)", "Thundering Fury (4pc) / Gilded Dreams (4pc)", "EM/ATK Sands, Electro DMG Goblet, CRIT Circlet", "CRIT > EM > ATK% > ER%", "Burst > Skill > Normal", "On-field Electro DPS with extended burst stance — long field time requirement.", "Cyno + Nahida + Xingqiu + Kuki (Hyperbloom)", "Cyno + Dendro MC + Barbara + Fischl", "Cyno has extended burst duration making him strong in sustained fights but inflexible.", "E (outside burst) >> Q >> E (endorse) x4 >> Q", "8/10"],
  ["beidou", "Beidou", "Sub-DPS", "Electro", "Claymore", "A", "Wolf Gravestone", "Luxurious Sea Lord / Serpent Spine (BP)", "Emblem of Severed Fate (4pc)", "ATK/ER Sands, Electro DMG Goblet, CRIT Circlet", "CRIT > ATK% > ER% (until 180%)", "Burst > Skill > Normal", "Off-field Electro Sub-DPS — perfect counter mechanic with high burst damage.", "Beidou + Fischl + Xingqiu + Sucrose (Taser)", "Beidou + Fischl + Barbara + Sucrose", "Beidou excels in multi-target with her burst arcing between enemies.", "E (counter) >> Q >> swap", "7.5/10"],
  ["faruzan", "Faruzan", "Support", "Anemo", "Bow", "A", "Elegy for the End", "Favonius Warbow / Sacrificial Bow", "Noblesse Oblige (4pc) / Tenacity Millelith (4pc)", "ER% Sands, Anemo DMG Goblet, CRIT Circlet", "ER% (until 250%) > CRIT > ATK%", "Skill > Burst > Normal", "Anemo buffer — provides 30% Anemo RES shred and 40% Anemo DMG bonus.", "Wanderer + Faruzan (C6) + Bennett + Zhongli", "Xiao + Faruzan + Sucrose + Diona", "Faruzan is THE essential Anemo support for Xiao and Wanderer hypercarry teams.", "E >> Q >> charged shot >> swap", "8/10"],
  ["gorou", "Gorou", "Support", "Geo", "Bow", "A", "Elegy for the End", "Favonius Warbow / Sacrificial Bow", "Husk of Opulent Dreams (4pc) / Noblesse Oblige (4pc)", "ER% Sands, DEF%/Geo Goblet, CRIT Circlet", "ER% (until 200%) > CRIT > DEF%", "Skill > Burst > Normal", "Geo buffer — provides DEF% buff and Geo DMG bonus based on team Geo count.", "Itto + Gorou + Zhongli + Albedo (Mono Geo)", "Itto + Gorou + Geo MC + Diona", "Gorou is mandatory for Itto mono-Geo teams — provides team DEF and Geo DMG buffs.", "E >> Q >> swap", "7.5/10"],
  ["layla", "Layla", "Support", "Cryo", "Sword", "A", "Key of Khaj-Nisut", "Favonius Sword / Sacrificial Sword", "Tenacity Millelith (4pc)", "HP% Sands, HP% Goblet, HP% Circlet", "HP% > ER% (until 160%) > CRIT", "Skill > Burst > Normal", "Shielder + off-field Cryo — shield scales with HP, provides Cryo application.", "Ayaka + Shenhe + Kazuha + Layla (Freeze)", "Wanderer + Faruzan + Bennett + Layla", "Layla is the best 4-star shielder with 100% uptime and Cryo application.", "E (hold) >> Q >> swap", "7.5/10"],
  ["tighnari", "Tighnari", "Main DPS", "Dendro", "Bow", "A", "Hunters Path", "Slingshot (R5) / Prototype Crescent", "Wanderers Troupe (4pc) / Gilded Dreams (4pc)", "EM/ATK Sands, Dendro DMG Goblet, CRIT Circlet", "CRIT > EM > ATK%", "Normal Attack > Skill > Burst", "Quick-swap Dendro DPS — fires homing charged shots after skill.", "Tighnari + Fischl + Kazuha + Baizhu (Spread)", "Tighnari + Fischl + Sucrose + Yaoyao", "Tighnari is a quick-swap Dendro DPS with excellent Spread reaction synergy.", "E >> CA x3 (rapid) >> Q >> swap", "8/10"]
];

// Find closing bracket
const lastIdx = chars.lastIndexOf("];");
let insert = "";
for (const nc of newChars) {
  insert += ",\n  {\n";
  insert += '    slug: "' + nc[0] + '",\n';
  insert += '    name: "' + nc[1] + '",\n';
  insert += '    role: "' + nc[2] + '",\n';
  insert += '    element: "' + nc[3] + '",\n';
  insert += '    weapon: "' + nc[4] + '",\n';
  insert += '    tier: "' + nc[5] + '",\n';
  insert += '    bestWeapon: "' + nc[6] + '",\n';
  insert += '    f2pWeapon: "' + nc[7] + '",\n';
  insert += '    bestArtifacts: "' + nc[8] + '",\n';
  insert += '    mainStats: "' + nc[9] + '",\n';
  insert += '    subStats: "' + nc[10] + '",\n';
  insert += '    talentPriority: "' + nc[11] + '",\n';
  insert += '    teamRole: "' + nc[12] + '",\n';
  insert += '    strongTeam: "' + nc[13] + '",\n';
  insert += '    f2pTeam: "' + nc[14] + '",\n';
  insert += '    description: "' + nc[15] + '",\n';
  insert += '    rotation: "' + nc[16] + '",\n';
  insert += '    rating: "' + nc[17] + '",\n';
  insert += '  }';
}

chars = chars.substring(0, lastIdx) + insert + "\n];";
fs.writeFileSync(base + "/src/data/characters.js", chars, "utf-8");

// Count
const cnt = chars.match(/slug: "/g);
console.log("Characters now: " + (cnt ? cnt.length : 0));