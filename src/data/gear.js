export const weaponGroups = [
  {
    type: "Sword",
    intro:
      "Swords cover the widest range of roles in the game, from CRIT stat sticks to HP and EM supports. The single most important thing to check is whether the weapon's passive matches how the character deals damage.",
    weapons: [
      {
        name: "Mistsplitter Reforged",
        rarity: "5-star",
        bestFor: "Ayaka, Ayato, Keqing, Alhaitham",
        why: "Huge CRIT DMG stat plus up to 28% Elemental DMG Bonus from its passive — the best general-purpose DPS sword.",
      },
      {
        name: "Freedom-Sworn",
        rarity: "5-star",
        bestFor: "Kazuha, Alhaitham, Kuki Shinobu",
        why: "High Elemental Mastery and a team ATK/NA buff — the best support sword for EM-scaling Anemo units.",
      },
      {
        name: "Splendor of Tranquil Waters",
        rarity: "5-star",
        bestFor: "Furina",
        why: "CRIT DMG plus HP scaling and skill damage — purpose-built for Furina's kit.",
      },
      {
        name: "Key of Khaj-Nisut",
        rarity: "5-star",
        bestFor: "Nilou, Layla, Kirara",
        why: "Massive HP% stat and an EM team buff — the only sword that meaningfully scales HP support kits.",
      },
      {
        name: "Sacrificial Sword",
        rarity: "4-star",
        bestFor: "Xingqiu, Layla",
        why: "The skill reset fixes Xingqiu's energy problem entirely — still his best weapon at any rarity.",
      },
      {
        name: "Favonius Sword",
        rarity: "4-star",
        bestFor: "Any support that needs Energy Recharge",
        why: "Particle generation for the whole team — the safest support weapon in the game.",
      },
      {
        name: "Iron Sting",
        rarity: "4-star (craftable)",
        bestFor: "Kazuha, Kuki Shinobu, Alhaitham",
        why: "Free Elemental Mastery with a damage proc — the best craftable option for EM supports.",
      },
      {
        name: "Amenoma Kageuchi",
        rarity: "4-star (craftable)",
        bestFor: "Ayaka, Kaeya, Jean",
        why: "Refunds energy after using the burst, which solves most of Ayaka's ER needs for free.",
      },
    ],
  },
  {
    type: "Claymore",
    intro:
      "Claymores are split between ATK stat sticks, DEF-scaling weapons for Geo carries, and EM options for reaction DPS.",
    weapons: [
      {
        name: "A Thousand Blazing Suns",
        rarity: "5-star",
        bestFor: "Mavuika",
        why: "CRIT Rate plus ATK and Nightsoul synergy — the highest-ceiling claymore for Pyro carries.",
      },
      {
        name: "Redhorn Stonethresher",
        rarity: "5-star",
        bestFor: "Itto, Noelle",
        why: "CRIT DMG plus DEF scaling that converts directly into attack damage for DEF carries.",
      },
      {
        name: "Wolf's Gravestone",
        rarity: "5-star",
        bestFor: "Diluc, Beidou, Eula, Navia",
        why: "Enormous ATK stat and a team ATK buff on hit — the best generic claymore stat stick.",
      },
      {
        name: "Beacon of the Reed Sea",
        rarity: "5-star",
        bestFor: "Dehya, Diluc, Gaming",
        why: "CRIT Rate plus ATK and skill damage bonuses, with extra value when the wielder takes damage.",
      },
      {
        name: "Serpent Spine",
        rarity: "4-star (Battle Pass)",
        bestFor: "Most claymore DPS",
        why: "CRIT Rate passive that stacks in combat — competitive with 5-star options at high refinement.",
      },
      {
        name: "Whiteblind",
        rarity: "4-star (craftable)",
        bestFor: "Itto, Noelle",
        why: "Free DEF% and ATK stacking — the best budget weapon for DEF-scaling Geo carries.",
      },
      {
        name: "Luxurious Sea-Lord",
        rarity: "4-star (event)",
        bestFor: "Beidou, Eula",
        why: "ATK plus burst damage bonus from a free event weapon — excellent value if you own it.",
      },
    ],
  },
  {
    type: "Polearm",
    intro:
      "Polearms hold some of the strongest weapons in the game, including the best free weapon available (The Catch).",
    weapons: [
      {
        name: "Staff of Homa",
        rarity: "5-star",
        bestFor: "Hu Tao, Zhongli, Arlecchino",
        why: "CRIT DMG plus an HP-to-ATK conversion — the single best polearm for HP-scaling carries.",
      },
      {
        name: "Engulfing Lightning",
        rarity: "5-star",
        bestFor: "Raiden Shogun, Xiangling",
        why: "Converts Energy Recharge above 100% into ATK, which is exactly what burst-heavy polearm users want.",
      },
      {
        name: "Crimson Moon's Semblance",
        rarity: "5-star",
        bestFor: "Arlecchino",
        why: "CRIT DMG with Bond of Life synergy — purpose-built for Arlecchino's normal attack scaling.",
      },
      {
        name: "Calamity Queller",
        rarity: "5-star",
        bestFor: "Shenhe, Xiao, Rosaria",
        why: "Highest base ATK among polearms, which directly increases Shenhe's Icy Quill damage.",
      },
      {
        name: "The Catch",
        rarity: "4-star (free, fishing)",
        bestFor: "Raiden Shogun, Xiangling",
        why: "Energy Recharge plus burst DMG and CRIT Rate — the best free weapon in the game, full stop.",
      },
      {
        name: "Dragon's Bane",
        rarity: "4-star",
        bestFor: "Hu Tao",
        why: "Elemental Mastery plus reaction damage — competitive with 5-stars on Hu Tao at R5.",
      },
      {
        name: "Favonius Lance",
        rarity: "4-star",
        bestFor: "Shenhe, Rosaria, Faruzan",
        why: "Team energy generation — the default choice when a polearm support needs to battery the team.",
      },
      {
        name: "White Tassel",
        rarity: "3-star",
        bestFor: "Cyno, Arlecchino",
        why: "CRIT Rate stat stick with a normal attack bonus — a genuinely usable 3-star on normal-attack carries.",
      },
    ],
  },
  {
    type: "Catalyst",
    intro:
      "Catalysts are dominated by HP and EM scaling weapons, with a few strong CRIT options for on-field Dendro and Anemo carries.",
    weapons: [
      {
        name: "A Thousand Floating Dreams",
        rarity: "5-star",
        bestFor: "Nahida, Yae Miko",
        why: "Huge Elemental Mastery plus an EM team buff — the best catalyst for reaction supports.",
      },
      {
        name: "Kagura's Verity",
        rarity: "5-star",
        bestFor: "Yae Miko, Wanderer",
        why: "CRIT DMG with stacking skill damage — ideal for skill-based catalyst DPS.",
      },
      {
        name: "Everlasting Moonglow",
        rarity: "5-star",
        bestFor: "Kokomi",
        why: "HP% plus healing bonus and normal attack damage — the only catalyst built for HP healers.",
      },
      {
        name: "Tulaytullah's Remembrance",
        rarity: "5-star",
        bestFor: "Wanderer, Heizou",
        why: "CRIT DMG and attack speed for normal-attack catalyst carries.",
      },
      {
        name: "Sacrificial Fragments",
        rarity: "4-star",
        bestFor: "Nahida, Sucrose",
        why: "High Elemental Mastery plus a skill reset — the best 4-star for EM supports.",
      },
      {
        name: "Prototype Amber",
        rarity: "4-star (craftable)",
        bestFor: "Kokomi, Neuvillette, Baizhu",
        why: "HP% plus team healing and energy refund — the best free option for HP-scaling catalysts.",
      },
      {
        name: "The Widsith",
        rarity: "4-star",
        bestFor: "Yae Miko, Yanfei, Ningguang",
        why: "Random but very large buffs (ATK, EM, or DMG) — strong burst damage for catalyst carries.",
      },
      {
        name: "Thrilling Tales of Dragon Slayers",
        rarity: "3-star",
        bestFor: "Sucrose, Barbara, Kokomi (support)",
        why: "Grants a large ATK buff to the next character — the best support weapon in the game by value.",
      },
    ],
  },
  {
    type: "Bow",
    intro:
      "Bows split cleanly between charged-attack carries, normal-attack carries, and support users who only care about ER or EM.",
    weapons: [
      {
        name: "Amos' Bow",
        rarity: "5-star",
        bestFor: "Ganyu, Tighnari",
        why: "Massive ATK% and a passive that rewards charged shots travelling distance — purpose-built for Ganyu.",
      },
      {
        name: "Polar Star",
        rarity: "5-star",
        bestFor: "Childe, Fischl, Ganyu",
        why: "CRIT Rate plus stacking ATK from skill and burst hits — the best general DPS bow.",
      },
      {
        name: "Thundering Pulse",
        rarity: "5-star",
        bestFor: "Yoimiya, Childe",
        why: "CRIT DMG plus normal attack damage scaling — the best bow for normal-attack carries.",
      },
      {
        name: "Aqua Simulacra",
        rarity: "5-star",
        bestFor: "Yelan, Ganyu, Tighnari",
        why: "Huge CRIT DMG and a universal damage bonus that works off-field.",
      },
      {
        name: "Elegy for the End",
        rarity: "5-star",
        bestFor: "Venti, Fischl, Faruzan, Ganyu (support)",
        why: "Energy Recharge plus team ATK and EM buffs — the best support bow for sub-DPS units.",
      },
      {
        name: "Rust",
        rarity: "4-star",
        bestFor: "Yoimiya, Childe",
        why: "Normal attack damage bonus at the cost of charged attacks — nearly best-in-slot on Yoimiya at R5.",
      },
      {
        name: "Stringless",
        rarity: "4-star",
        bestFor: "Venti, Fischl, Collei",
        why: "Elemental Mastery plus skill and burst damage — the best 4-star for off-field bow users.",
      },
      {
        name: "Slingshot",
        rarity: "3-star",
        bestFor: "Yoimiya, Tighnari",
        why: "CRIT Rate stat stick that outperforms several 4-stars at R5 on close-range normal attackers.",
      },
    ],
  },
];

export const artifactSets = [
  {
    name: "Emblem of Severed Fate",
    bestFor: "Raiden Shogun, Xingqiu, Xiangling, Yelan, Beidou",
    why: "Converts Energy Recharge directly into burst damage. Any character whose damage comes from their burst wants this set.",
    caveat: "Useless on characters whose damage comes from normal attacks or skills instead of their burst.",
  },
  {
    name: "Blizzard Strayer",
    bestFor: "Ayaka, Ganyu, Kaeya, Wriothesley",
    why: "Up to 40% free CRIT Rate against Cryo-affected or frozen enemies, which lets Cryo carries stack CRIT DMG instead.",
    caveat: "The CRIT Rate disappears entirely against enemies that cannot be frozen or Cryo-affected.",
  },
  {
    name: "Viridescent Venerer",
    bestFor: "Kazuha, Sucrose, Venti, Jean, Sayu",
    why: "40% Elemental RES shred for the swirled element — still the strongest four-piece support effect in the game.",
    caveat: "Only shreds the element that is swirled, so it provides nothing for Physical or mono-element teams.",
  },
  {
    name: "Deepwood Memories",
    bestFor: "Nahida, Baizhu, Collei, Kirara",
    why: "30% Dendro RES shred, which multiplies the damage of every Dendro reaction in the team.",
    caveat: "Only one character in the team needs it — stacking it twice does nothing extra.",
  },
  {
    name: "Gilded Dreams",
    bestFor: "Alhaitham, Cyno, Tighnari, Kuki Shinobu",
    why: "Large Elemental Mastery plus ATK depending on team composition — the best set for reaction-based Dendro and Electro DPS.",
    caveat: "Its value depends on your team's element count, so the bonus can drop in mono-element teams.",
  },
  {
    name: "Flower of Paradise Lost",
    bestFor: "Kuki Shinobu, Raiden Shogun (Hyperbloom), Thoma (Burgeon)",
    why: "Directly increases Bloom, Hyperbloom, and Burgeon damage — the only set that boosts transformative reaction damage this much.",
    caveat: "Only useful on the character that actually triggers the reaction, not on the enablers.",
  },
  {
    name: "Golden Troupe",
    bestFor: "Furina, Yae Miko, Fischl, Albedo",
    why: "Up to 70% skill damage bonus for characters who stay off-field — the best set for turret-style sub-DPS.",
    caveat: "The bonus disappears when the character is on field, so it does nothing for on-field carries.",
  },
  {
    name: "Marechaussee Hunter",
    bestFor: "Neuvillette, Hu Tao, Lyney, Wriothesley",
    why: "Up to 36% CRIT Rate when HP changes, which pairs perfectly with carries whose kits drain or restore their own HP.",
    caveat: "Requires frequent HP changes to keep the stacks — teams with a shielder and no HP fluctuation lose most of it.",
  },
  {
    name: "Obsidian Codex",
    bestFor: "Mavuika, Kinich, Chasca, Ororon",
    why: "Up to 40% CRIT Rate for Nightsoul users, which lets Natlan carries stack CRIT DMG almost exclusively.",
    caveat: "Only works while Nightsoul's Blessing is active, so it is worthless on characters outside the Natlan kits.",
  },
  {
    name: "Fragment of Harmonic Whimsy",
    bestFor: "Arlecchino, Clorinde",
    why: "Ties Bond of Life changes directly into damage bonus — the highest ceiling for Bond of Life carries.",
    caveat: "Only functions for characters with Bond of Life mechanics; everyone else gets nothing from it.",
  },
  {
    name: "Husk of Opulent Dreams",
    bestFor: "Itto, Albedo, Noelle, Chiori",
    why: "DEF% plus Geo DMG that stacks while off-field — the best set for DEF-scaling Geo units.",
    caveat: "The stacks decay on field, so on-field DEF carries need time to ramp up each rotation.",
  },
  {
    name: "Tenacity of the Millelith",
    bestFor: "Zhongli, Kokomi, Layla, Dehya",
    why: "HP% plus a team ATK buff and shield strength — the default support set for HP-scaling defenders.",
    caveat: "The team buff requires the wielder's skill to hit an enemy, which can be unreliable against mobile bosses.",
  },
  {
    name: "Noblesse Oblige",
    bestFor: "Bennett, Shenhe, Faruzan, Gorou",
    why: "20% team ATK buff after using a burst — the most universal support effect available.",
    caveat: "Does not stack with another Noblesse user in the same team, so only one character should hold it.",
  },
  {
    name: "Crimson Witch of Flames",
    bestFor: "Hu Tao, Diluc, Yanfei, Arlecchino (alternative)",
    why: "Pyro DMG plus stacking reaction damage — still the strongest Pyro set for Vaporize and Overload carries.",
    caveat: "Largely replaced by Harmonic Whimsy or Marechaussee Hunter on the newest Pyro carries.",
  },
  {
    name: "Shimenawa's Reminiscence",
    bestFor: "Yoimiya, Hu Tao (alternative), Ganyu (Melt)",
    why: "Large normal, charged, and plunging attack bonus at the cost of energy — perfect for carries who do not rely on their burst.",
    caveat: "Drains 15 energy on cast, which can break rotations for burst-dependent characters.",
  },
  {
    name: "Vermillion Hereafter",
    bestFor: "Xiao",
    why: "ATK bonus that ramps during the burst — the only four-piece set tuned specifically for Xiao's plunge playstyle.",
    caveat: "Very few other characters can maintain the stacks, so it is effectively a Xiao-only set.",
  },
  {
    name: "Thundering Fury",
    bestFor: "Cyno, Keqing, Raiden (Aggravate), Fischl",
    why: "Electro DMG plus reaction cooldown reduction, which lets Electro carries weave more skills per rotation.",
    caveat: "The cooldown reduction only matters for characters who actively trigger Electro reactions.",
  },
  {
    name: "Ocean-Hued Clam",
    bestFor: "Kokomi, Qiqi, Barbara",
    why: "Converts healing into a physical damage bubble — turns pure healers into secondary damage dealers.",
    caveat: "Capped by healing output, so it falls off in teams that take little damage.",
  },
];
