import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const newGuides = {
  fischl: `Fischl is the best 4-star sub-DPS in the game, and her value comes from two things: Oz applies Electro off-field with the most reliable single-target uptime available, and her A4 passive deals additional Electro damage every time the active character triggers an Electro-related reaction.\n\nThat A4 passive is the reason she appears in Aggravate, Taser, Overload, and Hyperbloom-adjacent teams. It scales with the whole team's reaction activity rather than with Fischl's own field time, so she contributes damage while doing almost nothing.\n\nHer kit is also unusual in that her burst refreshes Oz rather than being a separate damage source. At C6, Oz stays on field for the full duration and attacks alongside the active character, which is one of the strongest 4-star constellations in the game.\n\nWhere she struggles: her damage is strictly single-target, so in large mob pulls she contributes far less than Beidou or Yae Miko. Oz can also target the wrong enemy when several are grouped together.`,
  sucrose: `Sucrose is the best 4-star Anemo support, and she does three things that matter: she holds Viridescent Venerer for 40% RES shred, she shares a large portion of her Elemental Mastery with the team, and she can hold Thrilling Tales of Dragon Slayers to hand a big ATK buff to your carry.\n\nThat combination makes her a genuine budget replacement for Kazuha. In reaction-heavy teams — Vaporize, Melt, Hyperbloom — a C6 Sucrose can actually match or exceed Kazuha's contribution, because EM share is worth more than Elemental DMG Bonus when reactions are doing the damage.\n\nShe also generates a good number of particles and has access to Sacrificial Fragments, which lets her cast her skill twice per rotation for more energy and more swirls.\n\nWhere she struggles: her crowd control is weaker and less reliable than Kazuha's or Venti's, and her buffs require real EM investment before they matter — a low-investment Sucrose contributes very little beyond VV shred.`,
  beidou: `Beidou is the AoE counterpart to Fischl. Her burst creates a lightning arc that jumps between enemies, which makes her one of the strongest sub-DPS units in multi-target content — and one of the weakest in single-target content.\n\nHer skill is a counter mechanic: timing it to absorb an incoming hit deals significantly more damage and generates more particles. Learning the counter timing is the difference between a mediocre Beidou and a strong one, and it is the main reason she feels awkward to new players.\n\nHer burst costs 80 energy, which is the real constraint. She needs roughly 180% Energy Recharge or a second Electro unit to battery her, and Emblem of Severed Fate turns that ER requirement into damage.\n\nWhere she struggles: she is dependent on her burst, punished by high ER requirements, and her value drops sharply against a single boss where the lightning arc has nothing to chain to.`,
  faruzan: `Faruzan is the dedicated Anemo support, and she is the reason Anemo carries are viable at all. Her burst provides Anemo RES shred and an Anemo DMG Bonus, and her skill generates particles while applying a debuff that further reduces Anemo resistance.\n\nThe problem with Faruzan is energy. Her burst is expensive relative to her particle generation, so at C0 she needs around 250% Energy Recharge — which forces her onto Favonius Warbow and ER artifacts and leaves little room for damage.\n\nHer C6 fixes almost all of it: it lets her burst generate additional particles and adds CRIT DMG for Anemo damage. That is why the community treats C6 Faruzan as a different character from C0 Faruzan.\n\nWhere she struggles: outside Anemo hypercarry teams (Xiao, Wanderer, Heizou) she contributes nothing, and before C6 her ER requirements are genuinely uncomfortable to build around.`,
  gorou: `Gorou is the Geo equivalent of Faruzan: a dedicated buffer who only works in one archetype. His skill and burst grant DEF and Geo DMG Bonus to the team, with the size of the buff scaling on how many Geo characters you bring.\n\nThat design makes him mandatory for Itto and valuable for Noelle, but it also means he is almost useless outside mono-Geo teams. There is no reason to put Gorou in a team with two or fewer Geo units.\n\nHis build is simple: Energy Recharge until his burst is comfortable (around 200%), then DEF% and CRIT for the small amount of personal damage he contributes. Favonius Warbow is usually his best weapon because the particles help the whole team.\n\nWhere he struggles: zero flexibility. He provides no healing (unless C4), no shielding beyond crystallize, and his buffs do nothing for non-Geo characters.`,
  layla: `Layla is the strongest 4-star shielder in the game and the cheapest way to give a carry interruption resistance. Her shield scales with HP, has near-100% uptime, and she applies Cryo off-field while it is active — which also makes her useful in Freeze teams.\n\nHer real competition is Diona, and the choice comes down to what your team needs: Layla has a stronger shield and better Cryo application uptime, while Diona brings healing and energy generation. Teams that already have a healer prefer Layla; teams that need sustain prefer Diona.\n\nBecause she wants Tenacity of the Millelith, she also gives the team an ATK buff on top of the shield, which is more value than most defensive units provide.\n\nWhere she struggles: she has no healing at all, her personal damage is negligible, and her shield is still meaningfully weaker than Zhongli's.`,
  tighnari: `Tighnari is a quick-swap Dendro carry built around one trick: after using his skill, his next three charged shots fire almost instantly and home in on enemies. That window lets him unload his damage in about four seconds and then leave the field.\n\nThis makes him fundamentally different from Alhaitham. Where Alhaitham wants long on-field windows, Tighnari wants to come in, fire, and swap — which is much easier to fit around other units' cooldowns.\n\nHis best archetype is Spread, where Quicken adds flat damage to his Dendro hits. Electro supports like Fischl and Yae Miko are therefore part of his core rather than optional additions.\n\nWhere he struggles: he is a single-target-focused unit in an element that has strong AoE options, his burst costs 40 energy but provides little damage, and his damage ceiling is below Alhaitham's in sustained fights.`,
  rosaria: `Rosaria is the most flexible budget Cryo support. Her burst applies Cryo off-field in an AoE, and her passive shares up to 15% of her CRIT Rate with the party — which is a genuinely strong buff for carries that are still building their artifacts.\n\nShe works in three different roles: Cryo applicator for Freeze teams, reverse-Melt enabler with Bennett and Xiangling, and a Physical team support where her CRIT share and Cryo application both matter.\n\nHer build is straightforward — Emblem of Severed Fate or Noblesse Oblige, ATK or ER Sands, Cryo DMG Goblet, CRIT Circlet — and Favonius Lance makes her a useful battery as well.\n\nWhere she struggles: her personal damage is modest, her skill has a long cooldown, and at high investment she is outclassed by Shenhe in Cryo teams (though Shenhe costs a 5-star and Rosaria does not).`,
  chevreuse: `Chevreuse is the enabler who turned Overload from a novelty into a real archetype. Her passive shreds Pyro and Electro RES and buffs ATK — but only while every character in the party is Pyro or Electro. That restriction is severe, and it is also what makes her valuable: within a pure Pyro/Electro team her buffs are among the strongest in the game.\n\nBecause Overload knocks enemies back, her teams work best against enemies that are not easily displaced, or paired with units that can pull them back. Raiden, Clorinde, Arlecchino, and Yoimiya are the usual partners.\n\nHer build is HP-focused, because both her healing and her buff scale with HP. Noblesse Oblige or Song of Days Past are her sets, and The Catch works surprisingly well on her.\n\nWhere she struggles: the team-building restriction is absolute. Adding one Anemo, Geo, Dendro, Hydro, or Cryo unit disables her core passive entirely.`,
  emilie: `Emilie is an off-field Dendro sub-DPS built specifically for Burning teams. Her skill places a scent-collection turret that deals Dendro damage over time, and its damage increases significantly while enemies are affected by Burning.\n\nThat makes her the opposite of a generalist: she is weak in Hyperbloom or Spread teams, and strong in exactly one archetype. If you are running a Burning team (typically with Pyro carries like Arlecchino, Mavuika, or Kinich), she is the best sub-DPS available.\n\nHer build is a normal ATK and CRIT carry build with Unfinished Reverie as her set, and she needs very little field time — cast the skill, maybe the burst, then swap.\n\nWhere she struggles: she has almost no value outside Burning teams, and her damage depends on the Burning aura being maintained, which requires a reliable Pyro teammate.`,
};

const newInsights = {
  fischl: {
    whyItWorks: "Oz applies Electro off-field with the best single-target uptime in the game, and her A4 passive adds Electro damage every time the team triggers an Electro reaction.",
    keyThreshold: "ATK 1,800+. CRIT 60/120+. EM 100-200 in Aggravate. ER is rarely a problem if you refresh Oz with her burst.",
    metaStatus: "Best 4-star sub-DPS. Core of Aggravate, Taser, and Overload teams.",
    weakness: "Strictly single-target, and Oz can target the wrong enemy when several are grouped.",
    controversy: "Fischl vs Yae Miko: Yae has higher raw damage and three turrets, but Fischl needs no field time, costs no resources to build, and her A4 passive scales with the whole team's reactions.",
  },
  sucrose: {
    whyItWorks: "VV shred plus EM share plus Thrilling Tales — three buffs from one 4-star slot that requires no field time.",
    keyThreshold: "EM 700-900 (her share scales with her own EM). ER 160-180% for consistent bursts.",
    metaStatus: "Best 4-star Anemo support, and a legitimate replacement for Kazuha in reaction teams.",
    weakness: "Weaker crowd control than Kazuha, and her buffs need real EM investment before they matter.",
    controversy: "Sucrose vs Kazuha: C6 Sucrose can outperform Kazuha in Vaporize, Melt, and Hyperbloom teams, but Kazuha is better in mono-element teams and much easier to play.",
  },
  beidou: {
    whyItWorks: "Her burst lightning arcs between enemies, so the more targets there are, the more damage she deals.",
    keyThreshold: "ER 180%+ (or 140-160% with a second Electro unit). CRIT 60/120+. ATK 1,800+.",
    metaStatus: "Best AoE Electro sub-DPS; weak against single bosses.",
    weakness: "80-cost burst with strict ER requirements, and her damage falls off hard in single-target content.",
    controversy: "Beidou vs Fischl: they are not really competitors — Beidou wins in AoE (2+ enemies) and Fischl wins against a single boss. Strong Electro teams often run both.",
  },
  faruzan: {
    whyItWorks: "Her burst shreds Anemo RES and grants Anemo DMG Bonus, which is the only way Anemo carries reach competitive damage.",
    keyThreshold: "ER 250%+ at C0 (150-180% at C6). CRIT and ATK only after ER is solved.",
    metaStatus: "Mandatory for Xiao and Wanderer. Worthless outside Anemo hypercarry teams.",
    weakness: "Extreme ER requirements before C6, and zero value in any team without an Anemo carry.",
    controversy: "The community consensus is that Faruzan is a 'C6 or bust' unit — at C0 her ER needs are so punishing that many players prefer building a second buffer instead.",
  },
  gorou: {
    whyItWorks: "Grants DEF and Geo DMG Bonus that scale with the number of Geo teammates, which is exactly what DEF-scaling Geo carries want.",
    keyThreshold: "ER around 200% for consistent bursts. DEF% and CRIT after that.",
    metaStatus: "Best-in-slot Geo buffer and mandatory for Itto. Niche everywhere else.",
    weakness: "Only works in teams with three Geo units, and provides no healing or shielding beyond crystallize.",
    controversy: "Gorou vs Zhongli as the third Geo slot: Zhongli brings universal RES shred and a stronger shield, while Gorou brings DEF buffs that scale Itto's damage higher. Most Itto teams run both.",
  },
  layla: {
    whyItWorks: "Her shield scales with HP, has near-100% uptime, and applies Cryo off-field — giving your carry interruption resistance plus a Cryo aura in one slot.",
    keyThreshold: "HP 35k+. ER 160%+ so her burst is ready each rotation. No CRIT or damage investment needed.",
    metaStatus: "Strongest 4-star shielder, and a good budget alternative to Zhongli in non-RES-shred teams.",
    weakness: "No healing at all, negligible personal damage, and a shield weaker than Zhongli's.",
    controversy: "Layla vs Diona: Diona heals and generates energy for Cryo teams, while Layla has a stronger shield and better Cryo uptime — pick based on whether your team needs sustain or interruption resistance.",
  },
  tighnari: {
    whyItWorks: "After his skill, his next three charged shots fire almost instantly and home in on enemies, letting him unload his damage in about four seconds.",
    keyThreshold: "ATK 1,800+. CRIT 70/140+. EM 200-400 in Spread teams.",
    metaStatus: "Best quick-swap Dendro carry — easier to fit into teams than Alhaitham, but with a lower ceiling.",
    weakness: "Single-target focus in an element with strong AoE options, and his burst contributes very little.",
    controversy: "Tighnari vs Alhaitham: Alhaitham has much higher sustained damage, while Tighnari's four-second windows are far easier to fit around other units' cooldowns.",
  },
  rosaria: {
    whyItWorks: "Her burst applies Cryo off-field in an AoE and her passive shares up to 15% CRIT Rate with the party — a buff that helps carries at every investment level.",
    keyThreshold: "CRIT Rate as high as possible (her share scales with her own CRIT Rate). ER 160-180%.",
    metaStatus: "Most flexible budget Cryo support — works in Freeze, reverse Melt, and Physical teams.",
    weakness: "Modest personal damage and a long skill cooldown.",
    controversy: "Rosaria vs Shenhe: Shenhe gives a much larger buff at high investment, but Rosaria is a 4-star who also shares CRIT Rate — she is the better choice for most accounts that are not fully built.",
  },
  chevreuse: {
    whyItWorks: "She shreds Pyro and Electro RES and buffs ATK, turning Overload from a throwaway reaction into a competitive archetype.",
    keyThreshold: "HP 30k+ (both her buff and healing scale with HP). ER 160-200% for burst uptime.",
    metaStatus: "Core of Overload teams and the only reason that archetype is viable.",
    weakness: "Her passive requires every party member to be Pyro or Electro — one off-element unit disables it completely.",
    controversy: "Chevreuse teams are divisive because the restriction removes Anemo supports entirely, which means no Viridescent Venerer shred — players either accept that trade or avoid her teams.",
  },
  emilie: {
    whyItWorks: "Her skill deals Dendro damage over time and gains a large damage bonus while enemies are affected by Burning.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. Very little ER needed because her burst is secondary.",
    metaStatus: "Best Burning sub-DPS, and the strongest partner for Kinich and Pyro Burning carries.",
    weakness: "Almost no value outside Burning teams, and her damage depends on a Pyro teammate maintaining the Burning aura.",
    controversy: "Emilie vs Nahida: they are not substitutes — Nahida enables reactions, while Emilie deals raw Dendro damage in Burning. Burning teams want Emilie; every other Dendro team wants Nahida.",
  },
};

const newBuilds = {
  fischl: "Golden Troupe 4pc is her best set because it boosts the skill damage that makes up nearly all of her output. Use ATK Sands, Electro DMG Goblet, CRIT Circlet with 100-200 EM in Aggravate teams. Elegy for the End is her best support weapon, Polar Star is the best damage option, and Stringless R5 is an excellent 4-star that gives EM and reaction damage.",
  sucrose: "Viridescent Venerer 4pc is mandatory. Build full EM: EM Sands, EM Goblet, EM Circlet, because her team-wide EM share scales with her own EM. Sacrificial Fragments gives EM and lets her cast her skill twice; Thrilling Tales of Dragon Slayers is better if your carry wants the ATK buff more than the extra swirls. Get 160-180% ER through substats.",
  beidou: "Emblem of Severed Fate 4pc is her best set, because it converts the ER she already needs into burst damage. Use ATK or ER Sands, Electro DMG Goblet, CRIT Circlet, and reach 180% ER (or 140-160% with a second Electro unit). Wolf's Gravestone is best-in-slot; Serpent Spine and Luxurious Sea-Lord are strong alternatives.",
  faruzan: "Energy Recharge is the entire build until C6. Use ER Sands, Anemo DMG Goblet, CRIT Circlet, and aim for 250%+ ER at C0 — Favonius Warbow is effectively mandatory. At C6 her ER needs drop dramatically and you can start building CRIT and ATK. Noblesse Oblige 4pc is her default set for the team ATK buff.",
  gorou: "Prioritise Energy Recharge (around 200%), then DEF% and CRIT. Use ER Sands, DEF or Geo DMG Goblet, CRIT Circlet. Favonius Warbow is his best general weapon because the particles help the team. Husk of Opulent Dreams gives him personal damage, while Noblesse Oblige gives the team an ATK buff — pick based on whether your Geo carry needs the ATK.",
  layla: "Stack HP in every slot: HP Sands, HP Goblet, HP Circlet, with HP% and ER substats. Her shield scales entirely with HP, so CRIT and ATK are wasted. Tenacity of the Millelith 4pc is her best set because the ATK buff helps the team. Favonius Sword solves her energy and helps the team; Sacrificial Sword gives a stronger shield through the skill reset.",
  tighnari: "Wanderer's Troupe 4pc is his best set for charged attacks, with Gilded Dreams 4pc as a strong alternative in Spread teams. Use EM or ATK Sands (EM is usually better in Spread), Dendro DMG Goblet, CRIT Circlet, aiming for 200-400 EM. Hunter's Path is best-in-slot; Slingshot R5 is a remarkable 3-star option because it gives CRIT Rate and works at his range.",
  rosaria: "Emblem of Severed Fate 4pc is her best damage set, and Noblesse Oblige 4pc is the choice if your team needs the ATK buff. Use ATK or ER Sands, Cryo DMG Goblet, CRIT Circlet, and push CRIT Rate as high as possible because her share scales with it. Staff of Homa is best-in-slot; Favonius Lance makes her a strong battery for the whole team.",
  chevreuse: "Build HP: HP Sands, HP Goblet, HP or Healing Bonus Circlet, because both her ATK buff and her healing scale with HP. Noblesse Oblige 4pc gives the team an ATK buff, and Song of Days Past is the alternative if you want more healing. Staff of Homa and Engulfing Lightning are her best weapons; The Catch R5 works well and is completely free.",
  emilie: "Unfinished Reverie 4pc is her set, because it is built for Burning teams. Standard ATK Sands, Dendro DMG Goblet, CRIT Circlet — she does not need Elemental Mastery, because her damage is raw Dendro rather than reaction-based. Lumidouce Elegy is her signature; Deathmatch (Battle Pass) and Dragonspine Spear are the realistic alternatives.",
};

const newTeams = {
  fischl: "She fits into almost every Electro team. In Aggravate: Nahida + Fischl + Kazuha + Electro carry, where her A4 passive triggers constantly. In Taser: Beidou + Fischl + Xingqiu + Sucrose, where two Electro units battery each other. Rotation is simple: cast E to summon Oz, then use Q to refresh him before the duration ends — never let Oz expire, because that is all of her damage.",
  sucrose: "Her best teams are reaction-heavy: Hu Tao + Xingqiu + Sucrose + Zhongli, or Sucrose National (Sucrose + Xiangling + Bennett + Xingqiu). Rotation: apply the element you want to shred, then Sucrose E (swirl) → Q → E again if you have Sacrificial Fragments → swap to your carry with the Thrilling Tales buff.",
  beidou: "Her best team is Taser: Beidou + Fischl + Xingqiu + Sucrose, which gives strong AoE Electro-Charged damage with comfortable energy. Rotation: Xingqiu Q+E → Fischl E/Q → Beidou E (counter) → Q → Sucrose on field to drive. Two Electro units are effectively mandatory so Beidou's burst is ready every rotation.",
  faruzan: "She only fits Anemo hypercarry teams: Wanderer + Faruzan + Bennett + Zhongli, or Xiao + Faruzan + Bennett + Zhongli. Rotation: Faruzan Q (shred) → E → charged shot (generate particles) → Bennett Q+E → Zhongli hold E → carry. Use her charged shot — it generates the particles she desperately needs.",
  gorou: "His best team is mono-Geo: Itto + Gorou + Zhongli + Albedo. Rotation: Gorou E+Q (buffs) → Zhongli hold E (shred) → Albedo E → Itto combo. He also enables Noelle in budget Geo teams. Do not use him in teams with fewer than three Geo units — the buff is not worth the slot.",
  layla: "Her best teams are those that need a shielder plus Cryo: Ayaka + Shenhe + Kazuha + Layla in Freeze, or Wanderer + Faruzan + Bennett + Layla for interruption resistance. Rotation: Layla hold E (shield) → Q → swap to your carry. Because her shield lasts through the swap, she takes almost no field time.",
  tighnari: "His best team is Spread: Tighnari + Fischl + Kazuha + Baizhu. Rotation: Baizhu E+Q → Fischl E/Q → Kazuha E+Q → Tighnari E → three rapid charged shots → Q → swap. The point is to fire the three fast shots inside the buff window and leave immediately. The F2P version swaps Kazuha for Sucrose and Baizhu for Yaoyao.",
  rosaria: "Her best teams depend on the archetype: in Freeze, Ayaka + Rosaria + Kazuha + Kokomi; in reverse Melt, Rosaria + Xiangling + Bennett + flex. Rotation: supports first, then Rosaria E → Q so her burst ticks during the carry's damage window. Her CRIT Rate share applies as soon as her burst is cast, so use it before your carry attacks.",
  chevreuse: "Her teams must be Pyro and Electro only: Chevreuse + Raiden or Clorinde + Xiangling + Bennett is the standard core. Rotation: Chevreuse E (hold or press depending on the situation) → Q → Xiangling E+Q → Bennett Q+E → Electro carry. Remember that adding an Anemo, Geo, Dendro, Hydro, or Cryo unit disables her passive entirely.",
  emilie: "Her best team is Burning: Emilie + Bennett + Xiangling + a Pyro or Dendro carry (such as Kinich or Arlecchino). Rotation: Emilie E (place the turret) → Q → Xiangling E+Q → Bennett Q+E → carry, keeping the Burning aura alive so her skill keeps its damage bonus. She has no value in Hyperbloom or Spread teams.",
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
console.log('content batch 7 merged');
