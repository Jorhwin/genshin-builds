import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const newGuides = {
  ganyu: `Ganyu is the most flexible Cryo unit in the game because she has two completely separate playstyles. As a Freeze carry she runs Blizzard Strayer and uses her burst as a massive off-field Cryo aura while another unit drives. As a Melt carry she stands on field, charges Frostflake Arrows, and reverse-Melts them off Xiangling's Pyronado for the single largest per-hit numbers a Cryo unit can produce.\n\nThe Frostflake Arrow has two charge levels, and the second charge blooms into an AoE Cryo hit - that bloom is what makes her Melt damage so high, because both the arrow and the bloom can react. Her burst is a persistent AoE Cryo field with no ICD issues for aura purposes, which is why Freeze teams value it even when Ganyu is not the driver.\n\nWhere she struggles: charge shots are slow and interruption ends them immediately, so she needs a shielder (Zhongli or Layla) to function in Melt. On mobile, aiming charged shots is genuinely difficult, and against mobile bosses her Melt arrows simply miss.`,
  xiao: `Xiao trades his own HP for the highest plunge multipliers in the game. During his burst his jumps cost HP, his attack range expands, and his plunge damage scales off ATK - which makes him one of the few carries that wants pure ATK stacking with no reaction dependency at all.\n\nThat simplicity is also his weakness: Xiao has no reaction to multiply, so his damage ceiling is decided almost entirely by his supports. Faruzan is not optional - she provides Anemo RES shred, Anemo DMG bonus, and particle generation, and at C6 she even lets his burst crit-consistently battery itself. Add Furina or Xianyun and Xiao jumps tier lists; without them he feels noticeably weaker than modern carries.\n\nWhere he struggles: Xiao drains his own HP during his burst, so he needs a healer or shielder in every team, and his plunge pattern is predictable and interruption-prone. He also has no off-field presence whatsoever - when his burst ends, he contributes nothing.`,
  tartaglia: `Childe's entire value is one thing: he applies Hydro faster than any other character in the game from melee range. That single property is what makes International (Childe + Xiangling + Bennett + Kazuha) work, because every Pyronado hit Vaporizes instead of every other hit.\n\nHis melee stance (E) is a stance change with a scaling cooldown - the longer you stay in melee, the longer the cooldown before you can use it again. This is the core skill of playing Childe: stay in melee just long enough to let Xiangling's Pyronado run its full duration, then swap out and let the cooldown tick while your supports do their work. Overstaying in melee is the single most common Childe mistake.\n\nWhere he struggles: Childe has no defensive utility in melee stance and takes more damage while in it. His ranged burst (used at range) has a much shorter cooldown, so ranged burst into melee swap is the correct pattern rather than melee into melee.`,
  "arataki-itto": `Itto is the rare carry that scales on DEF instead of ATK. His burst converts his DEF into attack damage and gives him Geo infusion, and his Ushi (skill) both generates energy and taunts enemies. Because his entire kit scales on one stat, his artifacts are unusually easy to please: DEF Sands, Geo DMG Goblet, CRIT Circlet, then CRIT and DEF% substats.\n\nHis real constraint is team building. Itto wants Gorou, who provides DEF buffs, Geo DMG bonus, and Geo particles, and he wants a third Geo unit for resonance and crystallize shields. That means Itto teams are effectively mono-Geo, which gives up reactions entirely in exchange for very stable, shield-protected damage.\n\nWhere he struggles: mono-Geo has no reaction multiplier, so Itto's ceiling is fixed by his own stats. He also has no off-field damage, and against enemies with high Geo resistance or elemental shields, Geo teams have no way to break those shields quickly.`,
  yoimiya: `Yoimiya is the easiest carry in the game to play well. Press her skill and her normal attacks become Pyro-infused with auto-targeting, so she never misses and never needs to aim. For players who struggle with animation cancels or positioning, she converts almost all of her theoretical damage into real damage.\n\nThe tradeoff is AoE. Yoimiya is strictly single-target - her arrows hit one enemy at a time, so she is strong against bosses and weak against grouped mobs. She is also interruption-sensitive: getting hit mid-attack string cancels the rest of it, which is why Zhongli or a shielder is effectively mandatory in her best teams.\n\nHer two viable archetypes are Vaporize (with Xingqiu or Yelan) and Overload (with Fischl, Beidou, or Chevreuse). Vaporize has the higher single-target ceiling; Overload gives her the AoE she otherwise lacks.\n\nWhere she struggles: no AoE, no crowd control, and heavy reliance on a shielder. In Abyss halves with many small enemies she is one of the weakest carry choices available.`,
  "yae-miko": `Yae Miko is the strongest off-field Electro damage dealer in the game. Her skill plants three Sesshou Sakura turrets that continuously fire Electro at enemies, and her burst consumes and refreshes them for a burst of AoE damage. Once the turrets are placed she contributes damage while standing completely off-field.\n\nHer kit has two real costs. First, placing three turrets takes field time (three skill casts), so she wants to come in, set up, and leave. Second, her burst costs 90 energy, which is the highest in the game - she needs 130-150% ER or an Electro battery to use it every rotation, and many players simply skip it in Aggravate teams where her turret damage is the point.\n\nYae's best archetype is Aggravate, where Dendro turns her Electro application into reaction damage. She also works in Taser and as a Hyperbloom enabler, though her turrets target randomly which makes her a poor Hyperbloom trigger specifically.\n\nWhere she struggles: she provides no buffs, no healing, and no shielding - she is a pure damage slot. Against single bosses with no adds, her turret targeting is less efficient than Fischl's Oz.`,
  cyno: `Cyno is a long-field-time Electro carry. His burst extends his stance, converts his attacks to Electro, and refreshes its own duration through his Endorse mechanic, which means he wants to stay on field for 12-18 seconds at a time. That is both his identity and his biggest problem.\n\nBecause he occupies the field for so long, his teams must be built entirely around supporting him while he is out. Quickbloom (Cyno + Nahida + Xingqiu + Baizhu) is his strongest archetype: he triggers both Aggravate and Hyperbloom damage simultaneously, and Baizhu's interrupt resistance prevents his long attack strings from being cancelled.\n\nHis stat line is also unusual - he wants EM as much as ATK, because both Aggravate and Hyperbloom scale with it. An EM Sands is often correct on him, which is rare for an on-field carry.\n\nWhere he struggles: Cyno has almost no team flexibility. His long field time conflicts with any other carry, and without interrupt resistance his entire rotation collapses when he gets hit.`,
  mavuika: `Mavuika is the highest-ceiling Pyro carry currently available. Her skill puts her on a motorcycle that deals continuous Pyro damage and works as a traversal tool, while her burst is one of the largest single hits in the game. Both scale off her Fighting Spirit, a resource she builds when nearby characters consume Nightsoul.\n\nThis is the key to her team building: Mavuika wants Natlan teammates (Citlali, Xilonen, Ororon, Iansan) because their Nightsoul consumption is what charges her Fighting Spirit fastest. In a team with no other Natlan unit she still functions, but her burst comes up much less often.\n\nHer strongest archetype by far is Melt, because her burst has an enormous single-instance multiplier that Cryo aura turns into a massive reaction hit. Citlali is the ideal partner - she applies Cryo off-field, shreds Pyro RES, and charges Fighting Spirit at the same time.\n\nWhere she struggles: her best team is expensive (Mavuika + Citlali + Xilonen + Bennett), and her damage pattern is heavily front-loaded into her burst, so missing the Melt setup wastes most of her value.`,
};

const newInsights = {
  ganyu: {
    whyItWorks: "Her Frostflake Arrow bloom creates a second AoE Cryo hit, so a single charged shot can trigger Melt twice — the highest per-hit Cryo damage in the game.",
    keyThreshold: "Freeze: CRIT Rate 30-45% is enough (Blizzard Strayer + Cryo resonance). Melt: EM 200-300 plus normal CRIT investment. ATK 2,000+.",
    metaStatus: "Still the strongest Cryo unit overall because she can drive Freeze or Melt from the same build slot.",
    weakness: "Charged shots are slow and cancel on interruption — she needs a shielder, and she is awkward to play on mobile.",
    controversy: "Ganyu vs Ayaka: Ayaka has far higher burst damage and easier Freeze uptime, while Ganyu is more flexible and scales harder in Melt. Freeze-focused accounts pick Ayaka, Melt-focused accounts pick Ganyu.",
  },
  xiao: {
    whyItWorks: "His burst converts HP drain into the highest plunge multipliers in the game, and plunge damage scales purely on ATK with no reaction needed.",
    keyThreshold: "ATK 2,000+. CRIT 70/160+. ER 130-150% with a battery, or 110-120% with C6 Faruzan.",
    metaStatus: "A-tier on paper, but jumps to S-tier once you have Faruzan C6 plus Furina or Xianyun.",
    weakness: "Drains his own HP, contributes nothing off-field, and depends almost entirely on Faruzan for his damage.",
    controversy: "Xiao vs Wanderer: Xiao has higher AoE plunge damage, while Wanderer has better ranged comfort and easier team building. Both need Faruzan, so most accounts only build one.",
  },
  tartaglia: {
    whyItWorks: "He has the highest melee Hydro application rate in the game, which lets Xiangling Vaporize every single Pyronado hit in International teams.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. EM 100-200. No ER requirement is meaningful because his ranged burst is cheap.",
    metaStatus: "Core of International, still one of the strongest AoE teams in the game years after release.",
    weakness: "Melee stance cooldown scales with time spent in it — overstay and your whole rotation desyncs. He also takes more damage in melee stance.",
    controversy: "Childe vs Neuvillette: Neuvillette is easier and self-sustaining, but Childe enables Xiangling Vaporize in a way no other Hydro unit can, which keeps International relevant.",
  },
  "arataki-itto": {
    whyItWorks: "His burst converts DEF into attack damage, and DEF is much easier to stack than CRIT — so Itto reaches high damage with simpler artifact requirements.",
    keyThreshold: "DEF 2,000+ (before buffs). CRIT 70/140+. ER 130-140% with Gorou battery.",
    metaStatus: "Best Geo carry in the game, and the anchor of the strongest mono-element team archetype.",
    weakness: "Effectively locked to mono-Geo teams, has no reaction multiplier, and cannot quickly break elemental shields.",
    controversy: "Itto vs Navia: Itto has higher sustained damage over a long rotation, while Navia has far better front-loaded burst and much shorter field time.",
  },
  yoimiya: {
    whyItWorks: "Her skill gives Pyro-infused normal attacks with auto-targeting, so she converts nearly all of her theoretical damage into real damage without any execution requirement.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. EM 100-200 in Vaporize teams.",
    metaStatus: "Easiest carry in the game to play well, and still strong in single-target content — weak in AoE.",
    weakness: "Strictly single-target with no crowd control, and interruption cancels her entire attack string, so a shielder is mandatory.",
    controversy: "Yoimiya vs Hu Tao: Hu Tao has a much higher ceiling, but Yoimiya requires no stamina management, no HP management, and no animation cancels — for many accounts she is the better real-world choice.",
  },
  "yae-miko": {
    whyItWorks: "Three Sesshou Sakura turrets deal continuous off-field Electro damage, so she contributes full damage while another character is on field.",
    keyThreshold: "ATK 1,800+. EM 200-300 in Aggravate. ER 130-150% if you want her burst every rotation (90 energy cost).",
    metaStatus: "Best off-field Electro damage dealer, and a core piece of Aggravate teams.",
    weakness: "Sets up slowly (three skill casts), provides no buffs or utility, and her turret targeting is inefficient against a single boss.",
    controversy: "Yae vs Raiden: Raiden brings team energy and front-loaded burst damage, while Yae brings sustained off-field damage. Aggravate teams prefer Yae; National and Hyperbloom prefer Raiden.",
  },
  cyno: {
    whyItWorks: "His burst extends his Electro stance and refreshes through Endorse, letting him trigger Aggravate and Hyperbloom at the same time during one long field window.",
    keyThreshold: "EM 200-400 (Quickbloom). ATK 1,600+. ER 140-160%. Interrupt resistance is effectively a stat requirement for him.",
    metaStatus: "Strong Quickbloom carry with the longest field-time requirement of any modern DPS.",
    weakness: "Extremely long field time conflicts with every other carry, and without interruption resistance his rotation collapses when hit.",
    controversy: "Cyno vs Clorinde: both are Electro carries, but Clorinde has far shorter field time and better front-loaded damage, which is why she replaced Cyno in most speedrun teams.",
  },
  mavuika: {
    whyItWorks: "Fighting Spirit is charged by nearby Nightsoul consumption, and her burst converts it into one of the largest single-instance Pyro hits in the game — which Melt then multiplies.",
    keyThreshold: "CRIT Rate 60%+ is enough with Obsidian Codex (the set grants up to 40%). CRIT DMG 200%+. ATK 2,000+.",
    metaStatus: "Highest damage ceiling among Pyro carries, and the strongest Melt enabler currently available.",
    weakness: "Needs Natlan teammates to charge Fighting Spirit efficiently, and her best team (with Citlali and Xilonen) is very expensive.",
    controversy: "Mavuika vs Arlecchino: Mavuika has the higher burst ceiling and overworld utility, while Arlecchino is more self-sufficient and does not need specific teammates to function.",
  },
};

const newBuilds = {
  ganyu: "Pick your archetype before you build. For Freeze: Blizzard Strayer 4pc with ATK Sands, Cryo DMG Goblet, CRIT DMG Circlet - you only need 30-45% CRIT Rate because the set and Cryo resonance give the rest. For Melt: Wanderer's Troupe 4pc (or Shimenawa) with EM Sands, Cryo DMG Goblet, CRIT Circlet, plus 200-300 EM. Amos Bow is her best weapon; Prototype Crescent is free and excellent as long as you can hit weak points.",
  xiao: "Stack ATK and CRIT - Xiao has no reaction, so there is nothing else to build. Vermillion Hereafter 4pc is his best set, with 2pc Viridescent Venerer + 2pc ATK as a strong placeholder. Use ATK Sands, Anemo DMG Goblet, CRIT Circlet. Energy Recharge should land around 130-150% unless you run C6 Faruzan, which removes most of his energy problem. Deathmatch and White Tassel R5 are both viable F2P options.",
  tartaglia: "Nymph's Dream 4pc is his best set, with 2pc Heart of Depth + 2pc ATK as a placeholder. Standard carry stats: ATK Sands, Hydro DMG Goblet, CRIT Circlet, with 100-200 EM for Vaporize. Childe does not need Energy Recharge because his ranged burst is cheap - do not waste rolls on it. Polar Star is best-in-slot and Rust R5 is a genuinely competitive 4-star alternative.",
  "arataki-itto": "Itto's build is refreshingly simple: DEF Sands, Geo DMG Goblet, CRIT Circlet, then CRIT and DEF% substats. Husk of Opulent Dreams 4pc is clearly his best set because it stacks DEF and Geo DMG over time in combat. Redhorn Stonethresher is best-in-slot, and Whiteblind (craftable, refined to R5) is an excellent free option because it gives a huge amount of DEF.",
  yoimiya: "Shimenawa's Reminiscence 4pc is her standard set, with Echoes of an Offering 4pc and Crimson Witch 4pc as alternatives. Standard carry stats: ATK Sands, Pyro DMG Goblet, CRIT Circlet, with 100-200 EM in Vaporize teams. Thundering Pulse is best-in-slot; Rust R5 and Slingshot R5 are both strong F2P choices, and Slingshot is a 3-star weapon that performs surprisingly well on her.",
  "yae-miko": "Golden Troupe 4pc is her best set for pure skill damage, with Gilded Dreams 4pc as the alternative in Aggravate teams. Use ATK or EM Sands (EM is better in Aggravate), Electro DMG Goblet, CRIT Circlet. Aim for 130-150% ER if you want her 90-cost burst every rotation - if you are using her purely as an off-field turret, you can ignore ER entirely. Kagura's Verity is best-in-slot and The Widsith is a strong 4-star option.",
  cyno: "Thundering Fury 4pc is his best set in Quickbloom because the cooldown reduction lets him use his Endorse mechanic more often; Gilded Dreams 4pc is the alternative. Use EM or ATK Sands (EM is usually better), Electro DMG Goblet, CRIT Circlet. Target 200-400 EM and 140-160% ER. Staff of the Scarlet Sands is best-in-slot, and White Tassel R5 is a free 3-star weapon that works because it gives CRIT Rate.",
  mavuika: "Obsidian Codex 4pc is her best set and it grants up to 40% CRIT Rate, so build only 60% CRIT Rate from artifacts and put everything else into CRIT DMG and ATK%. Standard ATK Sands, Pyro DMG Goblet, CRIT Circlet. A Thousand Blazing Suns is her signature; Talking Stick (event) and Earth Shaker (craftable) are the realistic F2P options, both of which give the ATK and CRIT she wants.",
};

const newTeams = {
  ganyu: "Ganyu has two completely different best teams. For Melt: Ganyu + Xiangling + Bennett + Zhongli - Bennett buffs and batteries Xiangling, Xiangling's Pyronado provides the Pyro aura, and Zhongli stops your charged shots from being interrupted. For Freeze: Ganyu + Shenhe + Kazuha + Kokomi, where Ganyu's burst is the Cryo aura and Shenhe amplifies it. Melt rotation: Zhongli hold E -> Bennett Q+E -> Xiangling E+Q -> Ganyu charged shots.",
  xiao: "Xiao's premium team is Xiao + Faruzan (C6) + Furina + Xianyun, which gives him Anemo shred, damage bonus, healing, and plunge support all at once. A far more accessible version is Xiao + Faruzan + Bennett + Zhongli. Rotation is always the same: supports cast first, then Xiao uses both skill charges for energy, then burst and plunge spam. Never start with Xiao's burst before your supports have buffed.",
  tartaglia: "The classic is International: Childe + Xiangling + Bennett + Kazuha. Rotation: Childe ranged burst or E to apply Hydro -> Bennett Q+E -> Kazuha E+Q (double swirl) -> Xiangling E+Q -> Childe melee stance for the full Pyronado duration -> swap out and let his cooldown tick. The F2P version replaces Kazuha with Sucrose and works nearly as well.",
  "arataki-itto": "Itto wants mono-Geo: Itto + Gorou + Zhongli + Albedo. Gorou provides DEF and Geo DMG buffs plus particles, Zhongli shreds RES and shields, and Albedo adds off-field damage. The F2P version is Itto + Gorou + Geo MC + Diona. Rotation: Gorou E+Q -> Zhongli hold E -> Albedo E -> Itto E (Ushi) -> Q -> N3C combos. Always use Ushi before the burst so the taunt and energy are already in place.",
  yoimiya: "Vaporize is her standard: Yoimiya + Yelan + Zhongli + Yun Jin, where Yelan provides off-field Hydro and Zhongli prevents interruption. The F2P version is Yoimiya + Xingqiu + Thoma + Sucrose. Overload is her AoE alternative: Yoimiya + Fischl + Beidou + Chevreuse. Rotation is simple: supports cast, then Yoimiya presses E and fires her full normal attack string - never dash-cancel mid-string or you lose the infused hits.",
  "yae-miko": "Her best team is Aggravate: Yae + Fischl + Kazuha + Baizhu. Two Electro off-fielders plus a Dendro enabler means constant Aggravate procs, and Baizhu keeps the team alive while Yae sets up her turrets. Rotation: Baizhu E+Q -> Kazuha E+Q -> Fischl E or Q -> Yae E x3 -> on-field driver -> Yae Q to reset turrets. The F2P version is Yae + Fischl + Sucrose + Yaoyao.",
  cyno: "Quickbloom is his best archetype: Cyno + Nahida + Xingqiu + Baizhu, where he triggers both Aggravate and Hyperbloom during one long field window. Baizhu is important because Cyno needs interrupt resistance more than anything else. Rotation: Nahida E+Q -> Xingqiu Q+E -> Baizhu E+Q -> Cyno E -> Q -> N4D combos and Endorse procs. The F2P version is Cyno + Dendro MC + Barbara + Fischl.",
  mavuika: "Her strongest team is Melt: Mavuika + Citlali + Bennett + Xilonen, where Citlali applies Cryo off-field and shreds Pyro RES while Xilonen and Bennett stack buffs. Rotation: Citlali E+Q -> Xilonen E -> Bennett Q -> Mavuika E (charge Fighting Spirit) -> Q for the Melt burst. The F2P version is Mavuika + Kaeya or Rosaria + Bennett + Sucrose, which still lets her burst Melt even without Natlan teammates.",
};

async function merge(file, exportName, additions) {
  const url = pathToFileURL(base + file).href;
  const mod = await import(url);
  const existing = mod[exportName];
  const merged = { ...existing, ...additions };
  const body = Object.entries(merged)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v, null, 2)}`)
    .join(',\n');
  writeFileSync(base + file, `export const ${exportName} = {\n${body}\n};\n`, 'utf-8');
  console.log(file, Object.keys(existing).length, '->', Object.keys(merged).length);
}

await merge('extended-guides.js', 'extendedGuides', newGuides);
await merge('insights.js', 'coreInsights', newInsights);
await merge('extended-guides-build.js', 'buildExtendedGuides', newBuilds);
await merge('extended-guides-team.js', 'teamExtendedGuides', newTeams);
console.log('content batch merged');
