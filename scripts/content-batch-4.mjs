import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const newGuides = {
  kinich: `Kinich is a Dendro claymore carry built around one mechanic: his skill fires a grappling hook, and while attached he circles the enemy and fires cannon shots. All of his meaningful damage is skill damage, which means his normal attacks barely matter and his entire build should serve that one window.\n\nThe hook also changes how he positions. Instead of standing in front of an enemy, he orbits it — which makes him naturally good against large single targets and awkward against scattered mobs, because re-attaching the hook costs time.\n\nKinich's best archetype is Burning, where a Pyro teammate keeps a burning aura on the enemy and his Dendro shots convert that into consistent bonus damage. Burgeon variants also work, though they require more precise Hydro timing.\n\nWhere he struggles: he needs a Pyro teammate to reach his ceiling, his damage is awkward against groups, and missing the grapple wastes several seconds of his rotation.`,
  xilonen: `Xilonen is the most flexible defensive support released in years, because she compresses three jobs into one slot: she shreds Elemental RES, she heals the whole party, and she enables Natlan carries through Nightsoul synergy.\n\nHer skill works by matching the element of her teammates. The more Pyro, Hydro, Electro, or Cryo characters you bring, the more elements she can shred RES for — which means she scales with team diversity rather than forcing one specific composition. Her healing scales with DEF, and it is strong enough to sustain Furina teams on its own.\n\nBecause her value comes from DEF rather than CRIT or EM, her build is simple and cheap: stack DEF in every main stat and let her kit do the rest. That also makes her unusually easy to gear compared to other 5-star supports.\n\nWhere she struggles: her RES shred depends on your team's element spread, so mono-element teams get less from her than mixed teams do. She also provides no crowd control and very little personal damage.`,
  citlali: `Citlali is the best Melt enabler in the game. She brings three things a Pyro carry wants at once: an off-field Cryo aura to Melt against, Pyro RES shred, and a shield to protect the carry while they attack.\n\nThat combination is why she is best-in-slot for Mavuika and a strong option for Arlecchino and Gaming teams. Before Citlali, Melt teams had to choose between Cryo application (Kaeya, Rosaria) and defensive utility — she removes that tradeoff entirely.\n\nHer kit scales with Elemental Mastery, which is unusual for a shielder: more EM means a stronger shield, better reaction damage, and more value from her supporting artifact set. This makes her one of the few supports where EM is the correct stat in every slot.\n\nWhere she struggles: her shield is weaker than Zhongli's, her Cryo application depends on her burst being ready, and outside Pyro Melt teams much of her value goes unused.`,
  mualani: `Mualani is a Hydro catalyst carry who fights from a shark-mounted stance. Her damage comes from marking enemies while surfing and then biting them for large Hydro hits, with the final bite scaling on her max HP. That makes her a HP-scaling burst carry rather than a sustained one.\n\nHer entire kit is built around Vaporize. Without a Pyro aura to react against, she loses roughly half of her potential damage — so every serious Mualani team needs reliable off-field Pyro (Xiangling is the standard answer, and Mavuika is the premium one).\n\nBecause she wants Obsidian Codex, which grants up to 40% CRIT Rate, her artifact requirements are unusually forgiving: build around 60% CRIT Rate and pour the rest into CRIT DMG and HP%.\n\nWhere she struggles: she has no self-healing, she is interruption-sensitive while surfing, and against scattered enemies her marking and bite pattern loses most of its value.`,
  chasca: `Chasca is an Anemo bow carry who fights from the air and converts her teammates' elements into her own damage. The core rule is simple: the more Pyro, Hydro, Electro, and Cryo characters you bring, the more elemental bullets she loads, and the more damage her shots deal.\n\nThis makes her one of the most team-flexible carries in the game, because she benefits from elemental diversity rather than demanding a specific reaction setup. Flying also means she ignores most ground-based mechanics, which makes her comfortable in content where positioning is awkward.\n\nHer tradeoff is focus. Because her damage is split across several elements, she rarely reaches the peak damage of a carry built around one reaction — she trades ceiling for flexibility and comfort.\n\nWhere she struggles: she wants a team with multiple different elements, which conflicts with mono-element or resonance-based teams, and her damage is spread out rather than concentrated.`,
  venti: `Venti has the strongest crowd control in the game, and when it works nothing else comes close: his burst pulls almost every small enemy into one point and continuously re-groups them while dealing damage. He also refunds energy to the team for the element absorbed by his burst, which lets teammates run much lower Energy Recharge.\n\nThat is also his limitation. Modern endgame content is full of large enemies and bosses that resist pulling, and against those enemies Venti's burst does far less — his crowd control becomes a damage-only ability, and other Anemo supports simply out-buff him.\n\nThe practical way to use Venti is as a content check: if the chamber is full of small pullable enemies, he is the best unit you can bring. If it is a boss chamber, bring Kazuha or Sucrose instead.\n\nWhere he struggles: he contributes almost nothing against bosses that cannot be pulled, and his burst can whiff entirely against enemies that move during the animation.`,
  wanderer: `Wanderer is an Anemo catalyst carry who fights while floating, which lets him ignore most ground hazards and hit enemies that are hard to reach. His damage comes from fast normal attacks during his skill window, and he has one of the smoothest attack animations among catalyst users.\n\nHis entire viability rests on Faruzan. She provides Anemo RES shred, Anemo DMG bonus, and energy, and without her his damage drops dramatically — there is no realistic Wanderer team that skips her.\n\nHis second requirement is interruption resistance. Getting hit while floating ends his damage window and drops him, so a shielder (Zhongli or Layla) is effectively mandatory in difficult content.\n\nWhere he struggles: he is the most interruption-sensitive carry in the game, he is locked to Faruzan, and he provides nothing when he is not on field.`,
  navia: `Navia is a Geo claymore carry built around front-loaded burst damage. Her skill consumes Crystallize shards, and each shard massively increases the damage of her shot — with three shards, a single skill press is one of the largest instant hits in the game.\n\nThis design makes her much more flexible than Itto. Because Crystallize only requires any elemental aura plus Geo, she works in teams with Pyro, Hydro, Electro, or Cryo supports, rather than being locked into mono-Geo.\n\nHer rotation is also short: apply elements, collect shards, fire the skill, swap out. That low field time makes her easy to fit alongside another carry.\n\nWhere she struggles: her damage is concentrated in a few big hits, so missing or mistiming the skill wastes most of her rotation. She also needs teammates that reliably create shards, and her sustained damage is below Itto's.`,
  baizhu: `Baizhu is the best pure defensive support for reaction teams. His burst creates a shield that refreshes periodically while healing the active character, and his skill heals the whole party — which is exactly what Furina teams need to build Fanfare stacks.\n\nHe also provides interruption resistance, which quietly makes him best-in-slot for carries with long attack strings: Cyno, Neuvillette, and Wanderer all perform noticeably better with him.\n\nHis Dendro application is weak compared to Nahida, so he is not a replacement for her — he is the sustain option you add when the team already has enough damage and needs to survive.\n\nWhere he struggles: he contributes almost no damage, his Dendro application is too slow to drive reaction teams on its own, and his burst has a high energy cost that needs real ER investment.`,
  skirk: `Skirk is a Cryo sword carry whose damage comes from her skill stance rather than her burst, which makes her fundamentally different from Ayaka. She does not need enemies to be frozen to deal her damage — she simply enters her stance and attacks.\n\nThat single difference is why she is more reliable in modern content. Ayaka's value collapses against bosses that cannot be frozen; Skirk keeps her full damage output regardless, which makes her usable in far more chambers.\n\nHer teams still favour Hydro and Cryo supports for resonance and reaction value, and Furina remains an ideal partner because Skirk's own HP mechanics help build Fanfare stacks quickly.\n\nWhere she struggles: as a newer unit her optimal rotations are still being refined by the community, and her best-in-slot weapon options are limited, which makes weapon choice more impactful than for older carries.`,
};

const newInsights = {
  kinich: {
    whyItWorks: "His grappling stance fires high-multiplier cannon shots that count as skill damage, and a Burning aura converts every shot into bonus reaction damage.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. A reliable Pyro teammate is effectively part of his build.",
    metaStatus: "Strongest Dendro carry in Burning teams, and the only claymore user who wants Unfinished Reverie.",
    weakness: "Awkward against groups, dependent on a Pyro aura, and missing the grapple wastes real time.",
    controversy: "Kinich vs Alhaitham: Kinich has higher burst windows and works in Burning, while Alhaitham has smoother sustained damage and fits existing Dendro cores more easily.",
  },
  xilonen: {
    whyItWorks: "One slot gives RES shred for multiple teammate elements, full-party healing, and Nightsoul synergy — the most value per team slot of any modern support.",
    keyThreshold: "DEF stacked in all three main stats (aim high, around 3,000+) to maximise both RES shred and healing. ER enough for her burst every rotation.",
    metaStatus: "Top-tier universal support. Especially strong with Natlan carries and Furina teams.",
    weakness: "RES shred depends on your team's elemental diversity, and she brings no crowd control or meaningful personal damage.",
    controversy: "Xilonen vs Kazuha: Kazuha gives a bigger damage buff and grouping in reaction teams, while Xilonen adds healing and works against enemies that cannot be swirled.",
  },
  citlali: {
    whyItWorks: "Shield, off-field Cryo, and Pyro RES shred in one slot — she removes the usual tradeoff between Melt application and defensive utility.",
    keyThreshold: "EM as high as possible (EM Sands, Goblet, Circlet) plus enough ER for her burst. Her shield scales with EM, not HP.",
    metaStatus: "Best-in-slot Melt support and the reason Pyro Melt teams are competitive again.",
    weakness: "Weaker shield than Zhongli, burst-dependent Cryo application, and much of her value is wasted outside Pyro teams.",
    controversy: "Citlali vs Layla: Layla has a stronger shield and is a 4-star, but she provides no RES shred — in Melt teams Citlali is worth far more.",
  },
  mualani: {
    whyItWorks: "Her final bite scales on max HP and reacts with Vaporize, producing some of the largest single Hydro numbers in the game.",
    keyThreshold: "HP 40k+. CRIT Rate around 60% is enough thanks to Obsidian Codex. Requires a Pyro aura to realise her damage.",
    metaStatus: "Top-tier burst Hydro carry, strongest in single-target content.",
    weakness: "No self-healing, interruption-sensitive, and she loses roughly half her damage without a Pyro aura.",
    controversy: "Mualani vs Neuvillette: Neuvillette is self-sufficient and sustained, while Mualani has higher burst windows but needs a Pyro teammate to function at full power.",
  },
  chasca: {
    whyItWorks: "She converts teammates' elements into her own bullets, so a diverse team directly increases her damage without needing a specific reaction setup.",
    keyThreshold: "CRIT Rate around 60% with Obsidian Codex. ATK 2,000+. Bring three different PHEC elements for maximum bullet variety.",
    metaStatus: "Most flexible Anemo carry, and one of the most comfortable units to play in awkward content.",
    weakness: "Damage is split across elements, so her peak is lower than a specialised carry, and she wants a multi-element team.",
    controversy: "Chasca vs Wanderer: Wanderer has higher single-target damage with Faruzan, while Chasca needs no dedicated support and plays more comfortably.",
  },
  venti: {
    whyItWorks: "His burst groups almost every small enemy into one point while refunding energy to the team for the absorbed element.",
    keyThreshold: "ER 160-200% so the burst is ready every rotation. Build EM for Swirl damage or CRIT if you want personal damage.",
    metaStatus: "Unmatched in small-enemy content, weak against bosses that cannot be pulled.",
    weakness: "Contributes very little against large enemies and bosses, and his burst can whiff against mobile targets.",
    controversy: "Venti vs Kazuha: Kazuha is the better general pick because his buff works on everything, while Venti remains the best choice specifically for mob-heavy chambers.",
  },
  wanderer: {
    whyItWorks: "Floating normal attacks let him ignore ground mechanics while dealing fast Anemo damage, and Faruzan multiplies that damage substantially.",
    keyThreshold: "ATK 2,000+. CRIT 70/160+. Faruzan is effectively mandatory, and a shielder is required in difficult content.",
    metaStatus: "Strong Anemo carry with a high ceiling — but only when Faruzan and a shielder are both present.",
    weakness: "Being hit ends his damage window and drops him, and he has zero off-field presence.",
    controversy: "Wanderer vs Xiao: Xiao has higher plunge damage and more AoE, while Wanderer has better ranged comfort and a smoother rotation.",
  },
  navia: {
    whyItWorks: "Each Crystallize shard multiplies her skill damage, so three shards turn one skill press into one of the biggest instant hits in the game.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. Teammates must reliably create Crystallize shards before her skill.",
    metaStatus: "Best front-loaded Geo carry, and far more flexible than Itto because she does not require mono-Geo.",
    weakness: "Damage is concentrated in a few hits, so a missed or mistimed skill wastes most of her rotation.",
    controversy: "Navia vs Itto: Itto has higher sustained damage in mono-Geo, while Navia front-loads damage and fits into far more team types.",
  },
  baizhu: {
    whyItWorks: "His burst provides a refreshing shield plus healing, and that continuous full-party healing is exactly what Furina needs to build Fanfare stacks.",
    keyThreshold: "HP 40k+. ER 180-200% so his burst is ready every rotation — this is his real build constraint.",
    metaStatus: "Best sustain option for reaction teams, and best-in-slot for interruption-sensitive carries like Cyno and Neuvillette.",
    weakness: "Almost no personal damage, slow Dendro application, and a high burst energy cost.",
    controversy: "Baizhu vs Yaoyao: Yaoyao heals well and is a 4-star, but she provides no interruption resistance, which is the main reason Baizhu is preferred in endgame teams.",
  },
  skirk: {
    whyItWorks: "Her damage comes from her skill stance rather than Freeze, so she keeps her full output against bosses that cannot be frozen.",
    keyThreshold: "ATK 2,000+. CRIT 70/160+. Keep Harbinger of Dawn users above 90% HP to preserve its CRIT DMG passive.",
    metaStatus: "The more reliable modern Cryo carry — lower peak AoE than Ayaka, but usable in far more chambers.",
    weakness: "Optimal rotations are still being refined by the community, and weapon choice matters more for her than for older carries.",
    controversy: "Skirk vs Ayaka: Ayaka still wins on AoE burst damage when Freeze works, but Skirk is far more consistent against unfreezable bosses.",
  },
};

const newBuilds = {
  kinich: "Unfinished Reverie 4pc is his best set because it rewards Burning and Burgeon teams. Use ATK Sands, Dendro DMG Goblet, CRIT Circlet, and ignore Energy Recharge entirely — his damage is all skill-based and his burst is secondary. Earth Shaker (craftable) is genuinely strong on him, and Serpent Spine is excellent if you have it from the Battle Pass.",
  xilonen: "Stack DEF everywhere: DEF Sands, DEF Goblet, DEF Circlet, with DEF% and ER substats. Both her RES shred and her healing scale with DEF, so there is no reason to build anything else. Scroll of the Hero of Cinder City 4pc is her best set and also buffs the team. Peak Patrol Song is her signature; Flute of Ezpitzal (craftable) is a solid free alternative.",
  citlali: "Build full Elemental Mastery — EM Sands, EM Goblet, EM Circlet — because her shield strength, reaction damage, and support value all scale with EM rather than HP. Scroll of the Hero of Cinder City 4pc is her best set. Starcaller's Watch is best-in-slot; Sacrificial Fragments gives EM, and Thrilling Tales works if your team wants the ATK buff instead.",
  mualani: "Obsidian Codex 4pc is her set, and because it grants up to 40% CRIT Rate you only need around 60% CRIT Rate from artifacts — put everything else into CRIT DMG and HP%. Use HP Sands, Hydro DMG Goblet, CRIT Circlet. Surf's Up is her signature, and Prototype Amber (craftable) is a serviceable F2P option because it gives HP and energy.",
  chasca: "Obsidian Codex 4pc gives her up to 40% CRIT Rate, so build around 60% CRIT Rate and stack CRIT DMG plus ATK%. Standard ATK Sands, Anemo DMG Goblet, CRIT Circlet. Astral Vulture's Crimson Plumage is her signature; Hamayumi (craftable) and Favonius Warbow are the practical F2P choices.",
  venti: "Viridescent Venerer 4pc is mandatory. For a Swirl-damage build use full EM (EM Sands, EM Goblet, EM Circlet); for a crit build use ATK or ER Sands, Anemo DMG Goblet, CRIT Circlet. Either way, prioritise Energy Recharge — around 160-200% — so his burst is ready every rotation. Elegy for the End is best-in-slot and Stringless is the best 4-star.",
  wanderer: "Desert Pavilion Chronicle 4pc is his best set, since it boosts the normal attacks that make up all of his damage. Standard ATK Sands, Anemo DMG Goblet, CRIT Circlet. He needs very little Energy Recharge. Tulaytullah's Remembrance is best-in-slot and The Widsith is a strong 4-star alternative.",
  navia: "Nighttime Whispers in the Echoing Woods 4pc is her best set, boosting both her skill and Geo damage. Use ATK Sands, Geo DMG Goblet, CRIT Circlet. She needs only modest Energy Recharge. Verdict is her signature; Tidal Shadow (craftable) and Serpent Spine (Battle Pass) are both strong alternatives.",
  baizhu: "Deepwood Memories 4pc is his default set because it shreds Dendro RES for the team. Build HP Sands, HP Goblet, and either Healing Bonus or HP Circlet, then prioritise ER in substats until his burst is comfortable (180-200%). Jadefall's Splendor is his signature, and Prototype Amber (craftable) is an excellent free option that also refunds energy.",
  skirk: "Fragment of Harmonic Whimsy 4pc is her best set. Standard carry stats: ATK Sands, Cryo DMG Goblet, CRIT Circlet, with CRIT DMG and ATK% substats. She needs only modest Energy Recharge because her damage comes from her skill. Harbinger of Dawn R5 is a remarkable F2P option — it gives a huge CRIT DMG passive as long as you keep her above 90% HP.",
};

const newTeams = {
  kinich: "His best team is Burning: Kinich + Bennett + Xiangling + Baizhu, where Xiangling keeps the Burning aura alive and Baizhu prevents interruption during the grapple. Rotation: Bennett Q+E -> Xiangling E+Q -> Baizhu E+Q -> Kinich E (grapple) -> cannon shots -> Q. The F2P version replaces Baizhu with Yaoyao.",
  xilonen: "She fits almost anywhere, but her best team is Xilonen + Neuvillette + Furina + Kazuha, where she shreds Hydro RES and heals the self-damage from Furina's drain. She is also excellent with Mavuika and Kinich. Rotation: teammate buffs first -> Xilonen E (two normal attacks to activate) -> Q -> swap to your carry. Always use her two normal attacks after the skill, or she will not trigger her shred.",
  citlali: "Her best team is Melt: Citlali + Mavuika + Bennett + Xilonen (or any flex support). Rotation: Citlali E+Q -> Bennett Q -> Mavuika E+Q, ensuring the Pyro hits land while the Cryo aura is still applied. She works the same way with Arlecchino and Gaming. The F2P version is Citlali + Gaming + Bennett + Xiangling.",
  mualani: "Her best team is Vaporize: Mualani + Xiangling + Kazuha + Bennett, where Xiangling provides the Pyro aura needed for every bite to Vaporize. Rotation: Bennett Q+E -> Xiangling E+Q -> Kazuha E+Q -> Mualani E (surf) -> mark enemies -> final bite -> Q. The F2P version swaps Kazuha for Sucrose, and Mavuika can replace Xiangling as a premium Pyro option.",
  chasca: "She wants elemental diversity: Chasca + Bennett + Furina + Xiangling gives her Pyro, Hydro, and Pyro resonance value for maximum bullet variety. Rotation: Bennett Q+E -> Furina E+Q -> Xiangling E+Q -> Chasca E (fly) -> charged shots -> Q. The F2P version is Chasca + Bennett + Fischl + Xiangling, which still covers three elements.",
  venti: "His best team is any reaction composition with small enemies: Venti + Ayato + Xiangling + Bennett works well because his burst absorbs and spreads the aura. Rotation: Bennett Q+E -> Xiangling E+Q -> Venti E+Q -> on-field driver. The F2P version is Venti + Xiangling + Bennett + Xingqiu. Against boss chambers, replace him with Kazuha or Sucrose.",
  wanderer: "His best team is Wanderer + Faruzan + Bennett + Zhongli: Faruzan shreds Anemo RES and buffs Anemo DMG, Bennett provides ATK, and Zhongli prevents him from being knocked out of the air. Rotation: Faruzan Q+E -> Bennett Q+E -> Zhongli hold E -> Wanderer E -> N3D spam -> Q. The F2P version replaces Zhongli with Layla.",
  navia: "Her best team is Navia + Furina + Bennett + Zhongli, where the off-element characters generate Crystallize shards while Furina and Bennett multiply her skill damage. Rotation: Zhongli hold E -> Furina E+Q -> Bennett Q+E -> Navia E (with three shards) -> N4 x2 -> E -> Q. The F2P version is Navia + Xiangling + Bennett + Geo MC, which still produces shards reliably.",
  baizhu: "His best team is Neuvillette + Furina + Kazuha + Baizhu, where his continuous party healing builds Furina's Fanfare stacks while giving Neuvillette interruption resistance. Rotation: Furina E+Q -> Kazuha E+Q -> Baizhu E+Q -> Neuvillette E -> Q -> charged attacks. He is equally important in Cyno Quickbloom teams for the same reason.",
  skirk: "Her best team is Skirk + Furina + Kazuha + Xilonen, which stacks RES shred, damage bonus, and healing around her skill stance. Rotation: Furina E+Q -> Kazuha E+Q -> Xilonen E (two normal attacks) -> Q -> Skirk E -> N4D combos -> Q. The F2P version is Skirk + Kaeya + Bennett + Sucrose, which still provides Cryo resonance and shred.",
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
console.log('content batch 4 merged');
