export const analyses = [
  {
    slug: "raiden-hypercarry-vs-national",
    title: "Raiden Hypercarry vs National: Which Build is Better for You?",
    seoDesc: "Compare Raiden Shogun Hypercarry and Raiden National team builds. Damage difference, investment requirements, and which build suits your account better.",
    summary: "Raiden Hypercarry focuses on maximizing Raiden's personal damage with Bennett, Kazuha, and Sara. Raiden National (Raiden + Xiangling + Xingqiu + Bennett) spreads damage evenly across the team. Hypercarry has a higher damage ceiling but requires more investment. National has lower peak damage but is more consistent and cheaper to build.",
    buildA: {
      name: "Raiden Hypercarry",
      chars: "Raiden Shogun + Bennett + Kazuha + Sara (C6)",
      playstyle: "All buffs funnel into Raiden's burst — Bennett Q, Kazuha swirl, Sara ATK buff. Raiden's initial slash hits 300k-500k at C0.",
      pros: ["Highest Raiden personal damage", "Strong single-target burst", "Satisfying big number gameplay"],
      cons: ["Requires C6 Sara or high constellation Kujou", "Team damage stops when Raiden's burst ends", "Expensive to build optimally"],
      rotation: "Bennett Q → Kazuha E+Q → Sara E → Raiden Q → N3C × 4"
    },
    buildB: {
      name: "Raiden National",
      chars: "Raiden Shogun + Xiangling + Xingqiu + Bennett",
      playstyle: "Energy cycle team — everyone batteries each other. Raiden's burst restores energy for Xiangling and Xingqiu, creating a seamless loop.",
      pros: ["All 4-star teammates except Raiden", "Extremely consistent damage across entire rotation", "No C6 Sara required, easier to build"],
      cons: ["Lower peak Raiden damage", "Requires all four bursts to be ready", "Xiangling needs 200%+ ER"],
      rotation: "Raiden E → Xingqiu Q+E → Bennett Q → Xiangling E+Q → Raiden Q → N3C × 4"
    },
    verdict: "Build Raiden National first (cheaper, consistent). Upgrade to Hypercarry when you have C6 Sara and want to push Raiden's personal damage ceiling. National clears abyss just fine at C0 with 4-star weapons."
  },
  {
    slug: "hu-tao-vape-vs-melt",
    title: "Hu Tao Vaporize vs Melt: Best Reaction Build Guide",
    seoDesc: "Hu Tao Vaporize vs Melt build comparison. Which reaction team deals more damage? Team compositions, rotation differences, and F2P options.",
    summary: "Hu Tao Vaporize (with Xingqiu/Yelan) is the standard and most consistent build. Hu Tao Melt (with Rosaria/Kaeya) can hit higher peak damage but is harder to execute consistently. Vaporize is recommended for most players.",
    buildA: {
      name: "Hu Tao Vaporize (Double Hydro)",
      chars: "Hu Tao + Yelan + Xingqiu + Zhongli",
      playstyle: "Double Hydro ensures full Vaporize uptime. Xingqiu + Yelan provide enough Hydro for every charged attack to vape. Zhongli provides shield + RES shred.",
      pros: ["100% Vaporize uptime", "Extremely consistent damage", "Double Hydro battery for easier ER", "Zhongli provides safety"],
      cons: ["Three 5-star characters in optimal version", "Stamina management at C0"],
      rotation: "Zhongli hold E → Xingqiu Q+E → Yelan Q+E → Hu Tao E → N1C × 8 → Q"
    },
    buildB: {
      name: "Hu Tao Melt (Reverse Melt)",
      chars: "Hu Tao + Rosaria + Kaeya + Zhongli/Diona",
      playstyle: "Cryo supports apply off-field Cryo for Hu Tao to trigger Melt (2x damage). Higher per-hit damage but harder to maintain Cryo uptime.",
      pros: ["Higher per-charge damage (Melt 2x vs Vape 1.5x)", "Stronger burst damage", "Works well with C6 Rosaria"],
      cons: ["Inconsistent Melt uptime", "Requires careful Cryo application timing", "Lower total team damage", "Harder to execute"],
      rotation: "Zhongli hold E → Rosaria Q+E → Kaeya Q+E → Hu Tao E → N1C × 4-6 → Q"
    },
    verdict: "Stick with Vaporize for general use. Melt is a niche option for speedruns or when Xingqiu/Yelan are on the other abyss team. The damage difference is ~10-15% in favor of Melt in peak scenarios, but Vaporize is 3x more consistent."
  },
  {
    slug: "neuvillette-rotation-guide",
    title: "Neuvillette Optimal Rotation Guide: Charged Attack Canceling",
    seoDesc: "Complete Neuvillette rotation guide. Charged attack mechanics, source-stack management, animation cancel tricks, and optimal skill usage.",
    summary: "Neuvillette's rotation revolves around collecting three Sourcewater Droplets (from E and Q) to reduce his charged attack charge time. The optimal rotation alternates between E, Q, and charged attacks to maximize DPS uptime.",
    sections: [
      {
        title: "Core Mechanics",
        content: "Neuvillette's charged attack (Equitable Judgment) fires a beam for 3 seconds. Collecting Sourcewater Droplets (from his skill and burst) reduces the charge time by 1.2-1.5 seconds per droplet. You need 3 droplets for instant charge."
      },
      {
        title: "Standard Rotation",
        content: "E (Skill) → Q (Burst) → CA × 2 → E (droplets) → CA × 2. This rotation collects droplets from E first, then Q, allowing two fully-charged attacks. After the second CA, E is ready again for another cycle."
      },
      {
        title: "Animation Cancel Tips",
        content: "You can cancel Neuvillette's charged attack after the beam deals 3 ticks to save ~0.5 seconds per CA. Press jump or dash to cancel. With Furina, Neuvillette's self-heal from CA triggers Furina's fanfare stacks — don't cancel too early if the team needs healing."
      },
      {
        title: "Team Rotation Examples",
        content: "With Furina: Furina E+Q → Kazuha E+Q → Baizhu E+Q → Neuvillette E → Q → CA × 3. With Zhongli: Zhongli hold E → Kazuha E+Q → Neuvillette E → Q → CA × 2 → E → CA × 2."
      }
    ],
    verdict: "The key to Neuvillette's DPS is minimizing time spent charging. Always collect 3 droplets per charged attack for instant charge. Practice the animation cancel to shave 0.5s off each CA."
  },
  {
    slug: "nahida-em-vs-spread",
    title: "Nahida EM vs Spread Build: Hyperbloom or Spread Team?",
    seoDesc: "Nahida EM stacking vs EM/DMG hybrid build. Hyperbloom team vs Spread team — which team does more damage and which build suits each team better.",
    summary: "Nahida's build depends on her team role. In Hyperbloom teams, full EM build (EM/EM/EM) maximizes her personal Hyperbloom damage and team EM share. In Spread teams, a hybrid build (EM Sands, Dendro Goblet, CRIT Circlet) deals more damage because Spread can crit.",
    buildA: {
      name: "Full EM Build (Hyperbloom)",
      chars: "Nahida + Xingqiu + Kuki Shinobu + flex",
      playstyle: "Nahida applies Dendro, Xingqiu creates Dendro cores, Kuki triggers Hyperbloom. Nahida's full EM build boosts Kuki's Hyperbloom damage through the A4 EM share.",
      pros: ["Highest Hyperbloom team damage", "Simplest to build (EM/EM/EM)", "A4 passive gives 250 EM to Kuki"],
      cons: ["Nahida's personal damage is lower", "Build is less effective outside Hyperbloom"],
      mainStats: "EM Sands, EM Goblet, EM Circlet",
      weapon: "Sacrificial Fragments / A Thousand Floating Dreams"
    },
    buildB: {
      name: "Hybrid EM/DMG Build (Spread)",
      chars: "Nahida + Yelan + Kuki + Zhongli",
      playstyle: "Nahida triggers Spread reactions with her coordinated attacks. Spread can CRIT, so CRIT stats become valuable. This build balances EM (for Spread base damage) with CRIT/DMG stats.",
      pros: ["Higher Nahida personal damage", "Spread damage can crit for big numbers", "More flexible across team types"],
      cons: ["Lower team EM share", "Requires balanced artifact stats"],
      mainStats: "EM Sands, Dendro DMG Goblet, CRIT Circlet",
      weapon: "A Thousand Floating Dreams / Kagura's Verity"
    },
    verdict: "Build full EM (EM/EM/EM) if Nahida is in Hyperbloom teams. Build EM/DMG hybrid (EM/Dendro/CRIT) if she's in Spread teams or you want a generalist build. The hybrid build works well in both team types."
  }
];