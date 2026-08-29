import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const additions = [
  {
    slug: "mavuika-vs-arlechino",
    nameA: "Mavuika",
    nameB: "Arlecchino",
    element: "Pyro",
    seoTitle: "Mavuika vs Arlecchino: Best Pyro DPS Comparison 2026",
    seoDesc:
      "Mavuika vs Arlecchino — which Pyro carry is worth your primogems? Damage ceiling, team requirements, F2P weapons, and ease of play compared.",
    summary:
      "Mavuika has the higher burst ceiling and overworld utility, but she wants expensive Natlan teammates. Arlecchino is self-sufficient, easier to build, and works with 4-star weapons and supports.",
    verdict:
      "Pull Arlecchino if you want a Pyro carry that works immediately with what you already own. Pull Mavuika if you are building around Natlan units and want the highest burst damage in the game.",
    categories: [
      {
        name: "Damage",
        items: [
          { a: "Highest single-instance burst damage (huge Melt scaling)", b: "More consistent sustained damage across the full rotation", winner: "A (burst) / B (sustained)" },
          { a: "Front-loaded — missing the setup wastes most of her value", b: "Damage is spread across the rotation, so mistakes cost less", winner: "B (more forgiving)" },
        ],
      },
      {
        name: "Team Requirements",
        items: [
          { a: "Wants Citlali and Xilonen — an expensive core", b: "Works with Xingqiu, Bennett, and Sucrose", winner: "B (cheaper)" },
          { a: "Needs Nightsoul teammates to charge Fighting Spirit", b: "No specific teammate requirement to function", winner: "B" },
        ],
      },
      {
        name: "Ease of Use",
        items: [
          { a: "Mostly burst-focused, plus a traversal skill for overworld", b: "Simple loop: mark, charge attack, spam normals", winner: "A (overworld) / B (combat simplicity)" },
          { a: "Can be interrupted while charging Fighting Spirit", b: "Cannot be healed by teammates, so mistakes are punishing", winner: "Even" },
        ],
      },
    ],
  },
  {
    slug: "arlechino-vs-hu-tao",
    nameA: "Arlecchino",
    nameB: "Hu Tao",
    element: "Pyro",
    seoTitle: "Arlecchino vs Hu Tao: Best Pyro Carry Comparison 2026",
    seoDesc:
      "Arlecchino vs Hu Tao — who is the better Pyro DPS in 2026? Damage, stamina, HP management, constellations, and F2P options compared.",
    summary:
      "Arlecchino removes Hu Tao's two biggest frustrations — stamina management and low-HP upkeep — while matching or beating her damage. Hu Tao still wins on single-target ceiling at C1 with Double Hydro.",
    verdict:
      "Choose Arlecchino for a Pyro carry that is strong at C0 with no execution barrier. Choose Hu Tao if you already have her C1 plus Yelan and Xingqiu, where her Vaporize ceiling is still slightly higher.",
    categories: [
      {
        name: "Damage Output",
        items: [
          { a: "Comparable or higher at C0, with a smoother damage curve", b: "Highest single-target Vaporize ceiling at C1", winner: "B (ceiling) / A (at C0)" },
          { a: "Scales off Bond of Life — no HP threshold to manage", b: "Needs to stay below 50% HP for her Pyro DMG bonus", winner: "A (easier)" },
        ],
      },
      {
        name: "Execution",
        items: [
          { a: "No animation cancels required", b: "Requires jump-cancels (C0) or dash-cancels (C1)", winner: "A" },
          { a: "No stamina management", b: "Stamina limits her charged attacks at C0", winner: "A" },
        ],
      },
      {
        name: "Survivability",
        items: [
          { a: "Cannot be healed by teammates during her stance", b: "Can be healed normally, but wants low HP for damage", winner: "B" },
          { a: "Wants a shielder in endgame content", b: "Wants a shielder for the same reason", winner: "Even" },
        ],
      },
    ],
  },
  {
    slug: "furina-vs-kokomi",
    nameA: "Furina",
    nameB: "Kokomi",
    element: "Hydro",
    seoTitle: "Furina vs Kokomi: Best Hydro Support Comparison 2026",
    seoDesc:
      "Furina vs Kokomi — damage amp or healing? Which Hydro support fits your team better, and when you want both on the same team.",
    summary:
      "They are not really competitors: Furina is a damage amplifier who needs a healer, and Kokomi is the healer that makes Furina work. The real question is which one your team is missing.",
    verdict:
      "If your team lacks damage, add Furina and pair her with any healer. If your team keeps dying, add Kokomi. In many Abyss teams they are used together — Furina's buff plus Kokomi's healing and Hydro aura is one of the strongest support cores available.",
    categories: [
      {
        name: "Role",
        items: [
          { a: "Damage amplification (up to 75%) + off-field damage", b: "Healing + off-field Hydro application", winner: "Different roles" },
          { a: "Drains party HP while her burst is active", b: "Heals the party and applies Hydro at the same time", winner: "B (comfort)" },
        ],
      },
      {
        name: "Hydro Application",
        items: [
          { a: "Consistent off-field Hydro from her summons", b: "Near-permanent jellyfish uptime with burst refresh", winner: "B (uptime)" },
          { a: "Works as the solo Hydro in most teams", b: "Enough application to drive Freeze and Bloom", winner: "Even" },
        ],
      },
      {
        name: "Best Teams",
        items: [
          { a: "Any team with a team-wide healer", b: "Nilou Bloom, Ayaka Freeze, Sukokomon", winner: "A (universal)" },
        ],
      },
    ],
  },
  {
    slug: "yelan-vs-xingqiu",
    nameA: "Yelan",
    nameB: "Xingqiu",
    element: "Hydro",
    seoTitle: "Yelan vs Xingqiu: Best Hydro Sub-DPS Comparison 2026",
    seoDesc:
      "Yelan vs Xingqiu — which Hydro sub-DPS should you build? Hydro application, damage, defensive utility, and ER requirements compared.",
    summary:
      "Xingqiu applies more Hydro and provides defensive utility; Yelan deals more personal damage and buffs the active character. Most endgame teams still prefer Xingqiu for reaction consistency, but Yelan is better in teams that already have a shielder.",
    verdict:
      "Build Xingqiu first — he is free from events, applies more Hydro, and his damage reduction is genuinely valuable. Add Yelan when you need a second Hydro sub-DPS for the other Abyss half, or when your carry already has a shielder and wants her ramping damage buff.",
    categories: [
      {
        name: "Hydro Application",
        items: [
          { a: "Strong but single-target focused", b: "Highest off-field Hydro application rate in the game", winner: "B" },
          { a: "Burst-based with a 15-second duration", b: "Burst-based, 20-second cooldown, extends at C2", winner: "Even" },
        ],
      },
      {
        name: "Damage",
        items: [
          { a: "Higher personal damage plus a ramping team damage buff (up to 50%)", b: "Lower personal damage, no team buff", winner: "A" },
          { a: "Scales on HP", b: "Scales on ATK and Hydro DMG", winner: "A (easier HP stacking with HP supports)" },
        ],
      },
      {
        name: "Defensive Utility",
        items: [
          { a: "None — only a mobility skill", b: "Damage reduction and interruption resistance", winner: "B" },
          { a: "No ER requirement issues with a second Hydro", b: "Needs 180-200% ER as solo Hydro", winner: "A" },
        ],
      },
    ],
  },
  {
    slug: "kazuha-vs-venti",
    nameA: "Kazuha",
    nameB: "Venti",
    element: "Anemo",
    seoTitle: "Kazuha vs Venti: Best Anemo Support Comparison 2026",
    seoDesc:
      "Kazuha vs Venti — which Anemo support is better in 2026? Buffing, crowd control, energy refund, and which one fits modern Abyss content.",
    summary:
      "Venti has the strongest crowd control in the game, but modern Abyss content is full of enemies that cannot be pulled. Kazuha buffs damage and works against everything, which is why he is the default pick now.",
    verdict:
      "Kazuha is the better general pick — his damage amp works on bosses and groups alike. Venti remains unmatched in content with many small pullable enemies, and his energy refund is still excellent for teams built around bursts.",
    categories: [
      {
        name: "Buffing",
        items: [
          { a: "Elemental DMG Bonus scaling with EM + VV shred", b: "Energy refund for the team's element + VV shred", winner: "A (damage) / B (energy)" },
          { a: "Works against any enemy", b: "Buff value drops when enemies cannot be grouped", winner: "A" },
        ],
      },
      {
        name: "Crowd Control",
        items: [
          { a: "Moderate pull on skill and burst", b: "Best crowd control in the game", winner: "B" },
          { a: "Still useful against bosses", b: "Burst often misses enemies that resist pulling", winner: "A" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Any reaction team, mono-element, or Freeze", b: "Best in mob-heavy content with swirlable auras", winner: "A (more universal)" },
        ],
      },
    ],
  },
  {
    slug: "clorinde-vs-cyno",
    nameA: "Clorinde",
    nameB: "Cyno",
    element: "Electro",
    seoTitle: "Clorinde vs Cyno: Best Electro Carry Comparison 2026",
    seoDesc:
      "Clorinde vs Cyno — which Electro DPS should you build? Field time, damage, team flexibility, and interruption resistance compared.",
    summary:
      "Both are Electro carries built around Aggravate and Quickbloom, but Clorinde has much shorter field time and better front-loaded damage, while Cyno has longer sustained windows and stronger Hyperbloom synergy.",
    verdict:
      "Clorinde is the better pick for most accounts — her rotations are shorter, she is easier to slot into teams, and she does not need interrupt resistance as much. Cyno is still strong in Quickbloom with Baizhu, but his long field time makes team building harder.",
    categories: [
      {
        name: "Damage Pattern",
        items: [
          { a: "Front-loaded with short field time", b: "Sustained damage over a very long burst window", winner: "A (flexibility)" },
          { a: "Strong in Aggravate and Overload", b: "Strong in Quickbloom (Aggravate + Hyperbloom)", winner: "Even" },
        ],
      },
      {
        name: "Field Time",
        items: [
          { a: "Around 8-10 seconds", b: "12-18 seconds", winner: "A" },
          { a: "Easier to fit around supports' cooldowns", b: "Conflicts with any other on-field unit", winner: "A" },
        ],
      },
      {
        name: "Requirements",
        items: [
          { a: "Wants a shielder or poise healer", b: "Needs interrupt resistance or his rotation collapses", winner: "A" },
          { a: "Wants a second Electro unit for Aggravate", b: "Wants Nahida and a Hydro unit for Quickbloom", winner: "Even" },
        ],
      },
    ],
  },
  {
    slug: "nahida-vs-baizhu",
    nameA: "Nahida",
    nameB: "Baizhu",
    element: "Dendro",
    seoTitle: "Nahida vs Baizhu: Best Dendro Support Comparison 2026",
    seoDesc:
      "Nahida vs Baizhu — damage and EM share versus healing and interruption resistance. Which Dendro support fits your team?",
    summary:
      "Nahida is the offensive Dendro support — off-field application, EM share, and real personal damage. Baizhu is the defensive one — healing, shielding, and interruption resistance for carries that need it.",
    verdict:
      "Nahida first for almost every account, because she enables the reaction itself. Add Baizhu when your team needs healing and poise — particularly for Cyno, Neuvillette, and Furina teams where interruption or HP drain is a problem.",
    categories: [
      {
        name: "Dendro Application",
        items: [
          { a: "Marks up to 8 enemies, triggers on any reaction", b: "Applies Dendro on a slower interval via skill and burst", winner: "A" },
          { a: "Personal damage on coordinated attacks", b: "Almost no personal damage", winner: "A" },
        ],
      },
      {
        name: "Support Value",
        items: [
          { a: "Shares 25% of her EM to the on-field character", b: "Team-wide healing plus interruption resistance", winner: "Different roles" },
          { a: "Requires no field time", b: "Requires brief field time and ER investment", winner: "A" },
        ],
      },
      {
        name: "Best Teams",
        items: [
          { a: "Hyperbloom, Spread, Aggravate, Bloom", b: "Cyno Quickbloom, Neuvillette + Furina, any team needing a healer", winner: "Both essential" },
        ],
      },
    ],
  },
  {
    slug: "shenhe-vs-rosaria",
    nameA: "Shenhe",
    nameB: "Rosaria",
    element: "Cryo",
    seoTitle: "Shenhe vs Rosaria: Best Cryo Support Comparison 2026",
    seoDesc:
      "Shenhe vs Rosaria — flat Cryo damage buff versus CRIT Rate share and personal damage. Which Cryo support should you build?",
    summary:
      "Shenhe provides a much larger raw Cryo buff through Icy Quills, but only in Cryo teams and only when hits are few and large. Rosaria shares CRIT Rate, deals her own damage, and works in more team types.",
    verdict:
      "At high investment with Ayaka or Ganyu, Shenhe is clearly stronger. At low investment, or if you need CRIT Rate and a battery, Rosaria is the better value — she is also a 4-star, which makes her far cheaper to build.",
    categories: [
      {
        name: "Buffing",
        items: [
          { a: "Flat damage per Cryo instance based on her ATK", b: "Up to 15% CRIT Rate share from her burst", winner: "A (raw damage)" },
          { a: "Quills are consumed faster in AoE", b: "CRIT share applies to the whole party regardless of hit count", winner: "B (AoE)" },
        ],
      },
      {
        name: "Personal Damage",
        items: [
          { a: "Very low — she is a pure amplifier", b: "Meaningful off-field burst damage", winner: "B" },
          { a: "Burst also shreds Cryo RES", b: "Burst applies Cryo off-field for reactions", winner: "Even" },
        ],
      },
      {
        name: "Cost",
        items: [
          { a: "5-star, wants ATK% pieces and 180-220% ER", b: "4-star, easy to constellate, cheap to build", winner: "B" },
        ],
      },
    ],
  },
  {
    slug: "arataki-itto-vs-navia",
    nameA: "Arataki Itto",
    nameB: "Navia",
    element: "Geo",
    seoTitle: "Itto vs Navia: Best Geo DPS Comparison 2026",
    seoDesc:
      "Arataki Itto vs Navia — sustained Geo carry versus front-loaded burst. Damage, teams, field time, and F2P options compared.",
    summary:
      "Itto delivers sustained damage over a long burst window and wants a full mono-Geo team. Navia front-loads enormous skill damage in short windows and fits into more team types, including teams with off-element supports.",
    verdict:
      "Navia is the better pick for most accounts — she needs less field time, works outside mono-Geo, and her damage is easier to convert. Itto still wins on sustained damage if you have Gorou, Zhongli, and Albedo built.",
    categories: [
      {
        name: "Damage Pattern",
        items: [
          { a: "Sustained damage across a long burst window", b: "Huge front-loaded skill damage in short windows", winner: "B (burst) / A (sustained)" },
          { a: "Scales on DEF", b: "Scales on ATK and CRIT", winner: "Even" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Effectively locked to mono-Geo with Gorou", b: "Works with Bennett, Xiangling, Furina, and more", winner: "B (flexibility)" },
          { a: "Very shield-protected and comfortable", b: "Shorter field time means less exposure", winner: "B" },
        ],
      },
      {
        name: "Investment",
        items: [
          { a: "Whiteblind (craftable) is a strong free option", b: "Several strong 4-star and event claymores", winner: "Even" },
        ],
      },
    ],
  },
  {
    slug: "yoimiya-vs-lyney",
    nameA: "Yoimiya",
    nameB: "Lyney",
    element: "Pyro",
    seoTitle: "Yoimiya vs Lyney: Best Pyro DPS Comparison 2026",
    seoDesc:
      "Yoimiya vs Lyney — auto-targeting ranged Pyro versus charged-shot Pyro. Damage, ease of use, teams, and AoE compared.",
    summary:
      "Yoimiya is the simplest ranged carry in the game and never misses. Lyney deals more damage per hit and has built-in taunt and self-healing, but requires charged-shot aiming and careful HP management.",
    verdict:
      "Pick Yoimiya if you want guaranteed, low-effort single-target damage — especially on mobile. Pick Lyney if you are comfortable aiming charged shots and want higher peak damage plus better self-sustain.",
    categories: [
      {
        name: "Ease of Use",
        items: [
          { a: "Auto-targeting normals, no aiming required", b: "Charged shots require aiming and positioning", winner: "A" },
          { a: "Interruption cancels her attack string", b: "Taunt keeps enemies away while he charges", winner: "B" },
        ],
      },
      {
        name: "Damage",
        items: [
          { a: "Consistent, but lower per-hit damage", b: "Higher per-hit damage with Prop Surplus stacks", winner: "B" },
          { a: "Strictly single-target", b: "Some AoE from charged shots and the taunt explosion", winner: "B" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Vaporize or Overload with a shielder", b: "Mono-Pyro with Bennett and Kazuha", winner: "Different teams" },
        ],
      },
    ],
  },
  {
    slug: "chiori-vs-albedo",
    nameA: "Chiori",
    nameB: "Albedo",
    element: "Geo",
    seoTitle: "Chiori vs Albedo: Best Geo Sub-DPS Comparison 2026",
    seoDesc:
      "Chiori vs Albedo — which off-field Geo sub-DPS is better in 2026? Damage uptime, team requirements, and constellations compared.",
    summary:
      "Both provide off-field Geo damage with almost no field time. Chiori deals more damage and has better uptime, while Albedo is a 4-star-friendly option who still works well with a free event weapon.",
    verdict:
      "Chiori is the stronger sub-DPS if you have her, and her damage does not depend on standing inside a small circle. Albedo remains a solid budget alternative, especially with Cinnabar Spindle, but he is outclassed at equal investment.",
    categories: [
      {
        name: "Off-field Damage",
        items: [
          { a: "Higher damage, doll follows the active character", b: "Fixed placement — enemies can leave the field", winner: "A" },
          { a: "Scales on DEF and CRIT", b: "Scales on DEF with a free best-in-slot weapon", winner: "A (damage) / B (cost)" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Wants a Geo construct or another Geo unit for her passive", b: "Fits any team that wants off-field Geo", winner: "B (flexibility)" },
          { a: "Works in mono-Geo and Navia teams", b: "Works in the same teams with lower output", winner: "A" },
        ],
      },
      {
        name: "Cost",
        items: [
          { a: "5-star, benefits from her signature", b: "Cinnabar Spindle (event) makes him very cheap", winner: "B" },
        ],
      },
    ],
  },
  {
    slug: "xilonen-vs-kazuha",
    nameA: "Xilonen",
    nameB: "Kazuha",
    element: "Geo / Anemo",
    seoTitle: "Xilonen vs Kazuha: Best All-Round Support Comparison 2026",
    seoDesc:
      "Xilonen vs Kazuha — RES shred plus healing versus VV shred plus Elemental DMG. Which support is the better pull in 2026?",
    summary:
      "Kazuha shreds RES for swirlable elements and buffs Elemental DMG while grouping enemies. Xilonen shreds RES for her teammates' elements, heals, and works against enemies that cannot be swirled.",
    verdict:
      "Kazuha is still the better general pick for reaction teams and crowd control. Xilonen is stronger in teams that need healing and RES shred at the same time, and she is the better pick when enemies cannot be swirled or grouped.",
    categories: [
      {
        name: "Buffing",
        items: [
          { a: "RES shred for up to three teammate elements + healing", b: "VV shred (40%) + Elemental DMG Bonus from EM", winner: "Different strengths" },
          { a: "Works regardless of swirlable auras", b: "Requires a swirlable element on the enemy", winner: "A" },
        ],
      },
      {
        name: "Utility",
        items: [
          { a: "Heals the party and provides Nightsoul synergy", b: "Best crowd control among buffers", winner: "A (healing) / B (grouping)" },
          { a: "Also enables Natlan carries like Mavuika", b: "Universal — fits any elemental team", winner: "A (Natlan) / B (universal)" },
        ],
      },
      {
        name: "Best Teams",
        items: [
          { a: "Mavuika, Kinich, and Geo or Natlan carries", b: "Ayaka Freeze, Raiden National, Childe International", winner: "Both top tier" },
        ],
      },
    ],
  },
  {
    slug: "mualani-vs-neuvillette",
    nameA: "Mualani",
    nameB: "Neuvillette",
    element: "Hydro",
    seoTitle: "Mualani vs Neuvillette: Best Hydro Carry Comparison 2026",
    seoDesc:
      "Mualani vs Neuvillette — Vaporize nukes versus sustained HP-scaling beam damage. Which Hydro carry should you build?",
    summary:
      "Neuvillette deals sustained damage with self-healing and no reaction dependency. Mualani front-loads large Vaporize hits from a shark-mounted stance, with higher peak damage but more setup requirements.",
    verdict:
      "Neuvillette remains the safer and more comfortable carry — he heals, has no reaction requirement, and works in more teams. Mualani is the better pick if you already have strong Pyro off-field units and want higher burst windows against single targets.",
    categories: [
      {
        name: "Damage",
        items: [
          { a: "Huge front-loaded Vaporize hits", b: "Sustained beam damage with self-healing", winner: "A (burst) / B (sustained)" },
          { a: "Requires Vaporize setup to reach her ceiling", b: "Damage is independent of reactions", winner: "B (consistency)" },
        ],
      },
      {
        name: "Comfort",
        items: [
          { a: "Mobile stance, but needs Pyro aura to be maintained", b: "Needs interruption resistance, otherwise comfortable", winner: "Even" },
          { a: "No self-healing", b: "Heals himself on every charged attack", winner: "B" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Vaporize teams with Xiangling or Mavuika", b: "Furina, Kazuha, and Baizhu core", winner: "Different cores" },
        ],
      },
    ],
  },
  {
    slug: "kinich-vs-alhaitham",
    nameA: "Kinich",
    nameB: "Alhaitham",
    element: "Dendro",
    seoTitle: "Kinich vs Alhaitham: Best Dendro DPS Comparison 2026",
    seoDesc:
      "Kinich vs Alhaitham — grappling-hook Burgeon carry versus mirror-based Spread DPS. Damage, teams, and ease of play compared.",
    summary:
      "Alhaitham delivers sustained Dendro damage with mirror management and works in both Spread and Quickbloom. Kinich front-loads damage through a grappling stance and scales best in Burning and Burgeon teams.",
    verdict:
      "Alhaitham is the safer pick — he is easier to slot into existing Dendro cores and pairs perfectly with Nahida. Kinich is the better choice if you specifically want a Burning or Burgeon carry and have the Pyro supports to enable him.",
    categories: [
      {
        name: "Damage Pattern",
        items: [
          { a: "Front-loaded cannon shots during the grapple stance", b: "Sustained damage with three-mirror uptime", winner: "A (burst) / B (sustained)" },
          { a: "Scales with Burgeon and Burning setups", b: "Scales with Spread and Quickbloom", winner: "Different reactions" },
        ],
      },
      {
        name: "Execution",
        items: [
          { a: "Grapple aiming takes practice", b: "Mirror management is punishing when interrupted", winner: "Even" },
          { a: "Shorter field time per rotation", b: "Wants longer on-field windows", winner: "A" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Burning / Burgeon with Pyro off-fielders", b: "Spread with Nahida and Electro supports", winner: "B (easier to build)" },
        ],
      },
    ],
  },
  {
    slug: "citlali-vs-layla",
    nameA: "Citlali",
    nameB: "Layla",
    element: "Cryo",
    seoTitle: "Citlali vs Layla: Best Cryo Shielder Comparison 2026",
    seoDesc:
      "Citlali vs Layla — which Cryo shielder is better? Shield strength, RES shred, Melt enabling, and team value compared.",
    summary:
      "Both provide shields and off-field Cryo, but Citlali additionally shreds Pyro RES and enables Melt for Pyro carries, while Layla is a 4-star with a very strong, low-maintenance shield.",
    verdict:
      "Use Citlali if you are running a Pyro carry that wants Melt — her Pyro RES shred is the reason she is best-in-slot for Mavuika and Arlecchino teams. Use Layla when you just need a reliable shield and cannot afford a 5-star slot.",
    categories: [
      {
        name: "Shield",
        items: [
          { a: "Strong shield plus Pyro RES shred", b: "Very strong shield with near-100% uptime", winner: "A (utility) / B (shield uptime)" },
          { a: "Also enables Nightsoul synergy", b: "No extra team buffs beyond the shield", winner: "A" },
        ],
      },
      {
        name: "Cryo Application",
        items: [
          { a: "Consistent off-field Cryo for Melt", b: "Solid off-field Cryo for Freeze", winner: "A (Melt) / B (Freeze)" },
        ],
      },
      {
        name: "Cost",
        items: [
          { a: "5-star, wants ER investment", b: "4-star, cheap to build and easy to constellate", winner: "B" },
        ],
      },
    ],
  },
  {
    slug: "chasca-vs-wanderer",
    nameA: "Chasca",
    nameB: "Wanderer",
    element: "Anemo",
    seoTitle: "Chasca vs Wanderer: Best Anemo DPS Comparison 2026",
    seoDesc:
      "Chasca vs Wanderer — flying gunner versus floating catalyst carry. Damage, teams, comfort, and F2P options compared.",
    summary:
      "Both are airborne Anemo DPS units that avoid most ground mechanics. Wanderer needs Faruzan and a shielder to shine, while Chasca converts teammate elements into her own damage and works in more team types.",
    verdict:
      "Wanderer remains strong if you already have Faruzan C6 and a shielder built. Chasca is the more flexible pick — she benefits from having Pyro, Hydro, Electro, and Cryo teammates without needing a dedicated Anemo support.",
    categories: [
      {
        name: "Damage",
        items: [
          { a: "Converts teammate elements into multi-element shots", b: "High sustained Anemo damage with Faruzan", winner: "Even" },
          { a: "Works without Faruzan", b: "Faruzan is effectively mandatory", winner: "A" },
        ],
      },
      {
        name: "Comfort",
        items: [
          { a: "Flying stance with good mobility", b: "Flying stance, but interruption ends his damage", winner: "A" },
          { a: "Wants a shielder for consistency", b: "Wants a shielder for the same reason", winner: "Even" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Flexible teams with multiple elements", b: "Faruzan core with Bennett and Zhongli", winner: "A (flexibility)" },
        ],
      },
    ],
  },
  {
    slug: "skirk-vs-ayaka",
    nameA: "Skirk",
    nameB: "Ayaka",
    element: "Cryo",
    seoTitle: "Skirk vs Ayaka: Best Cryo DPS Comparison 2026",
    seoDesc:
      "Skirk vs Ayaka — which Cryo carry is stronger in 2026? Freeze dependency, damage output, teams, and F2P weapons compared.",
    summary:
      "Ayaka is the classic Freeze carry whose value collapses against unfreezable bosses. Skirk deals high Cryo damage without depending on Freeze, which makes her more reliable across the widest range of content.",
    verdict:
      "Ayaka still has the highest AoE burst damage when Freeze works, and she is cheaper to build thanks to Blizzard Strayer. Skirk is the better all-round pick, because she keeps her damage against bosses that cannot be frozen.",
    categories: [
      {
        name: "Damage",
        items: [
          { a: "Strong sustained Cryo damage, no Freeze requirement", b: "Highest AoE burst damage when enemies are frozen", winner: "B (AoE) / A (consistency)" },
          { a: "Performs against bosses", b: "Loses most of her value against unfreezable enemies", winner: "A" },
        ],
      },
      {
        name: "Teams",
        items: [
          { a: "Works with Hydro and Cryo supports, more flexible", b: "Effectively requires a Freeze core", winner: "A" },
          { a: "Newer kit with fewer established rotations", b: "Well-understood, widely documented rotations", winner: "B" },
        ],
      },
      {
        name: "Investment",
        items: [
          { a: "Wants her signature weapon for best results", b: "Amenoma Kageuchi (craftable) is excellent", winner: "B" },
        ],
      },
    ],
  },
  {
    slug: "venti-vs-sucrose",
    nameA: "Venti",
    nameB: "Sucrose",
    element: "Anemo",
    seoTitle: "Venti vs Sucrose: Best Anemo Support Comparison 2026",
    seoDesc:
      "Venti vs Sucrose — 5-star crowd control versus 4-star EM support. Which Anemo unit is better for your account in 2026?",
    summary:
      "Venti brings unmatched crowd control and energy refund, but only against enemies that can be pulled. Sucrose shares EM, holds Thrilling Tales, and works in every reaction team regardless of enemy type.",
    verdict:
      "Sucrose is the better value for most accounts — she is free to constellate, works against bosses, and her EM share is a real damage increase in reaction teams. Venti is still worth using in content with many small pullable enemies.",
    categories: [
      {
        name: "Crowd Control",
        items: [
          { a: "Best crowd control in the game", b: "Moderate grouping on burst only", winner: "A" },
          { a: "Useless against enemies that resist pulling", b: "Value does not depend on enemy type", winner: "B" },
        ],
      },
      {
        name: "Buffing",
        items: [
          { a: "Energy refund for the swirled element", b: "EM share plus Thrilling Tales ATK buff", winner: "B (damage)" },
          { a: "VV shred", b: "VV shred", winner: "Even" },
        ],
      },
      {
        name: "Cost",
        items: [
          { a: "5-star", b: "4-star, easy to constellate", winner: "B" },
        ],
      },
    ],
  },
];

const url = pathToFileURL(base + 'comparisons.js').href;
const mod = await import(url);
const existing = mod.comparisons;
const seen = new Set(existing.map((c) => c.slug));
const merged = [...existing];
for (const c of additions) {
  if (seen.has(c.slug)) {
    console.log('skip duplicate', c.slug);
    continue;
  }
  seen.add(c.slug);
  merged.push(c);
}
const body = merged.map((c) => JSON.stringify(c, null, 2)).join(',\n');
writeFileSync(base + 'comparisons.js', `export const comparisons = [\n${body}\n];\n`, 'utf-8');
console.log('comparisons', existing.length, '->', merged.length);
