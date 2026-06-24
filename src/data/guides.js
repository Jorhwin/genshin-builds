export const guides = [
  {
    slug: "what-is-elemental-mastery",
    title: "What is Elemental Mastery in Genshin Impact? Full Guide",
    seoDesc: "Complete guide to Elemental Mastery in Genshin Impact. How EM affects reactions, breakpoints, best EM builds for each character, and why 1000 EM is the target for reaction supports.",
    summary: "Elemental Mastery (EM) increases the damage of Elemental Reactions. For Transformative Reactions (Vaporize, Melt, Overloaded, Hyperbloom, etc.), EM provides a direct damage multiplier. For Amplifying Reactions, EM increases the base multiplier above 1.5x/2x. Most reaction-based supports should target 800-1000 EM.",
    categories: [
      {
        title: "What is Elemental Mastery?",
        content: "Elemental Mastery is a stat that governs reaction damage. Every 100 EM provides approximately: +35% Vaporize/Melt damage, +30% Overloaded/Shattered damage, +25% Hyperbloom damage. The formula follows diminishing returns — each additional 100 EM provides less benefit than the previous 100."
      },
      {
        title: "EM Breakpoints By Character",
        content: "Nahida: 800-1000 EM (full support), 400-600 EM (hybrid). Kazuha: 800-1000 EM. Sucrose: 600-900 EM. Kuki Shinobu: 800-1000 EM (Hyperbloom). Raiden Shogun: 200-300 EM (National team, not for Hypercarry). Xiangling: 100-200 EM (substat only)."
      },
      {
        title: "EM vs Other Stats",
        content: "For reaction supports like Kazuha and Sucrose: EM is the most valuable stat in all slots. For reaction DPS like Hu Tao: EM is valuable up to 150-200, after which CRIT/DMG stats become more important. For Hyperbloom triggers (Kuki, Raiden): EM is the ONLY stat that matters — ATK and CRIT don't affect Hyperbloom damage at all."
      },
      {
        title: "How to Increase EM",
        content: "Weapons: Sacrificial Fragments (221 EM), A Thousand Floating Dreams (265 EM), Freedom-Sworn (198 EM), Xiphos' Moonlight (165 EM), Iron Sting (165 EM). Artifacts: Sands/Goblet/Circlet main stat can roll EM  (46.6%/46.6%/46.6%). Set bonuses: Wanderer's Troupe (80), Gilded Dreams (150), Flower of Paradise Lost (80). Resonance: Dendro resonance gives 50 EM on reaction triggers."
      }
    ]
  },
  {
    slug: "how-energy-recharge-works",
    title: "How Does Energy Recharge Work in Genshin Impact? Full Guide",
    seoDesc: "Complete guide to Energy Recharge mechanics. ER thresholds for every character, how particle generation works, battery teams, and why 200-300% ER changes how a character performs.",
    summary: "Energy Recharge (ER) determines how much energy a character gains from particles and orbs. 100% ER means 1 particle = 1 energy for the same element. When building ER, consider the team's particle generation, not just the character's own ER needs.",
    categories: [
      {
        title: "How ER Works",
        content: "Energy particles give different amounts based on element match: same element particles = 3 energy at 100% ER, different element = 1.8 energy, neutral particles = 2 energy. Orbs (from boss HP thresholds) give these amounts × 3. This is why mono-element teams have an easier time with energy."
      },
      {
        title: "ER Thresholds By Role",
        content: "Burst-spam characters (Raiden National): Xiangling needs 200-220%, Xingqiu needs 180-200% (or 140-160% with Sac Sword). Solo battery supports: Bennett needs 200-240% ER, Faruzan needs 250-300%. Hypercarries: Xiao 130-150%, Itto 130-140%, Raiden Hypercarry 270%+ (ER = damage)."
      },
      {
        title: "The 1:2 ER:Crit Rule for Raiden",
        content: "Because Raiden's EoSF set converts 25% of ER into Burst DMG, and her A4 converts ER into Electro DMG, ER% substats are worth approximately half as much as CRIT stats for Raiden. The optimal ratio targets 270-300% ER before investing heavily into CRIT. Each ~12% ER substat roll provides roughly 7-8% more burst damage."
      },
      {
        title: "Battery Teams and Energy Cycles",
        content: "Teams that generate 20+ particles per rotation (National variations, taser teams) can build lower ER on all members. Teams with few particle generators (Freeze with Shenhe, Mono Geo) need higher ER on everyone. Raiden National works because Raiden's burst refunds 22.5 energy to the team at C0."
      }
    ]
  },
  {
    slug: "hyperbloom-reaction-explained",
    title: "What is Hyperbloom in Genshin Impact? Reaction Guide",
    seoDesc: "Complete Hyperbloom reaction guide. How Hyperbloom damage scales, best Hyperbloom triggers (Kuki, Raiden), team building, and why it's one of the strongest F2P teams in the game.",
    summary: "Hyperbloom is created when Electro hits a Dendro Core (Dendro + Hydro). The resulting homing projectile deals single-target Dendro damage. Hyperbloom damage scales ONLY with the Electro trigger's EM and character level. It's one of the strongest F2P-friendly team archetypes because it requires minimal investment.",
    categories: [
      {
        title: "How Hyperbloom Works",
        content: "Dendro + Hydro = Dendro Core (Bloom). Electro on Dendro Core = Hyperbloom (homing Dendro missile). Hyperbloom base damage at level 90 with 0 EM: ~7200. At 1000 EM: ~34,000 damage per hit. The damage is transformative (can't crit, ignores DEF)."
      },
      {
        title: "Best Hyperbloom Triggers",
        content: "Kuki Shinobu (4-star, best): her skill follows the active character, reliably triggering cores. Full EM build. Raiden Shogun (5-star): skill triggers cores off-field. Can use full EM build in Hyperbloom teams. Fischl: requires Oz to target cores — less reliable but higher personal damage."
      },
      {
        title: "Best Hyperbloom Team Compositions",
        content: "Core: Dendro (Dendro MC / Nahida) + Hydro (Xingqiu / Yelan) + Electro (Kuki / Raiden). Flex slot: Zhongli (shield), Kazuha (grouping), Albedo (sub-DPS), or another Hydro for more cores. The Nahida + Xingqiu + Kuki core is considered the best F2P team in the game."
      },
      {
        title: "Why Hyperbloom is F2P Friendly",
        content: "The trigger only needs EM (EM/EM/EM artifacts with subpar substats), character level 90, and a weapon with EM substat. The Dendro and Hydro units only need to apply elements — their personal stats don't matter for Hyperbloom damage. A full Hyperbloom team can clear abyss with 4-star characters and 3-star/4-star weapons."
      }
    ]
  },
  {
    slug: "snapshotting-explained-genshin",
    title: "What is Snapshotting in Genshin Impact? Mechanics Guide",
    seoDesc: "Complete guide to snapshotting in Genshin Impact. Which characters and abilities snapshot buffs, how Bennett's snapshot works with Xiangling, and how to optimize rotation order for snapshot skills.",
    summary: "Snapshotting is when a skill's damage is calculated at the moment of casting, not dynamically. This means buffs active at cast time carry through the entire ability duration, even if the buff expires. Mastering snapshotting is essential for optimizing teams like Raiden National.",
    categories: [
      {
        title: "What is Snapshotting?",
        content: "When a character casts a skill that snapshots, the game records the character's stats at that moment. Even if those stats change (buffs expire, enemy debuffs fade), the skill continues dealing damage based on the original calculation. This is why Bennett's burst cast before Xiangling's burst makes Xiangling's pyronado deal massive damage throughout its entire duration."
      },
      {
        title: "Characters That Snapshot",
        content: "Xiangling: Pyronado (snapshot is why she's so good with Bennett). Fischl: Oz's attacks. Beidou: Stormbreaker's lightning. Albedo: Solar Isotoma's attacks. Ganyu: Bloom damage on charged attacks (partially). Xinyan: Shield damage. Most turret-type abilities snapshot. Most burst abilities (like Raiden's) do NOT snapshot."
      },
      {
        title: "Bennett Snapshot Strategy",
        content: "Bennett's burst provides 80-120% ATK buff at talent level 10. To snapshot with Xiangling: Bennett Q → Bennett E (generate particles) → Xiangling E → Xiangling Q. The crucial detail: Xiangling's pyronado snapshots Bennett's ATK buff even if Bennett's burst expires during the pyronado's 14-second duration."
      },
      {
        title: "Why Snapshotting Matters for Your Teams",
        content: "In Raiden National, the rotation order is critical: Raiden E → Xingqiu Q+E → Bennett Q → Xiangling E+Q → Raiden Q. This order ensures Xiangling's pyronado snapshots the highest possible ATK (Bennett's buff + Noblesse Oblige + potential 4VV shred). Getting this wrong reduces Xiangling's damage by 30-40%."
      }
    ]
  }
];