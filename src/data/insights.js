export const coreInsights = {
  "raiden-shogun": {
    whyItWorks: "Raiden Shogun's damage scales directly with Energy Recharge through her A4 passive, converting 0.4% of ER above 100% into Electro DMG Bonus. This unique scaling means ER isn't just for burst uptime — it's her damage stat. At 270% ER (achievable with Engulfing Lightning and ER sands), she gains 68% Electro DMG Bonus from this passive alone.",
    metaStatus: "Top-tier in current 5.x meta. Remains one of the most versatile units, fitting into Hypercarry, National, and Hyperbloom teams.",
    keyThreshold: "ER breakpoint: 220% minimum, 270% optimal with Engulfing Lightning. Below 200% ER significantly reduces both damage and team energy refund."
  },
  "hu-tao": {
    whyItWorks: "Hu Tao's damage comes from her HP-to-ATK conversion (E skill) combined with Vaporize reactions. At C0, managing stamina through jump-cancels is essential. Her optimal DPS window is when HP is below 50%, providing a 33% Pyro DMG Bonus. The double Hydro core (Yelan + Xingqiu) ensures 100% Vaporize uptime on her charged attacks.",
    metaStatus: "Still the highest single-target Pyro DPS in 5.x, though Arlecchino offers similar damage with less mechanical complexity.",
    keyThreshold: "HP target: 30,000-35,000 total. EM: 100-200 optimal for Vaporize. CRIT Rate: 70%+ with CRIT DMG circlet."
  },
  "neuvillette": {
    whyItWorks: "Neuvillette's charged attack beam deals continuous Hydro damage that scales purely on HP. Unlike most DPS units, his damage doesn't depend on reaction uptime — he functions at full power even against Hydro-immune enemies. The 3-source reaction passive (A1) boosts his charged attack damage by 110% when three different Hydro reactions occur.",
    metaStatus: "Top 3 DPS in 5.x meta. His self-healing makes him extremely comfortable with Furina teams.",
    keyThreshold: "HP: 40,000+ optimal. ER: 110-120% if solo Hydro, 100% with Furina."
  },
  "nahida": {
    whyItWorks: "Nahida's elemental skill marks enemies and triggers coordinated Dendro damage based on her EM. Her A4 passive gives the on-field character 25% of her EM (up to 250), making her an EM share support. With 1000 EM, she provides 250 EM to the active character and her skill hits deal 200%+ more damage.",
    metaStatus: "Absolute core of all Dendro teams in 5.x. Irreplaceable in Hyperbloom, Spread, and Bloom teams.",
    keyThreshold: "EM breakpoint: 800 EM minimum, 1000 EM ideal. Beyond 1000 EM, the diminishing returns make other stats more valuable."
  },
  "zhongli": {
    whyItWorks: "Zhongli's jade shield (hold E) has the highest shield strength in the game and provides 20% universal RES shred to nearby enemies. His shield is the only ability that can make any team unkillable without requiring specific team compositions. The 20% RES shred is equivalent to a +20% damage multiplier against most enemies.",
    metaStatus: "Always relevant regardless of meta. The universal RES shred makes him valuable in any team.",
    keyThreshold: "HP: 50,000+ for max shield. Mixing ATK/CRIT stats for burst damage is viable but reduces shield strength."
  },
  "kazuha": {
    whyItWorks: "Kazuha's A4 passive converts his Elemental Mastery into Elemental DMG Bonus for the team: 0.04% per EM point. At 1000 EM, this provides 40% Elemental DMG Bonus. Combined with Viridescent Venerer's 40% RES shred, Kazuha provides two independent damage amplification mechanics that stack multiplicatively.",
    metaStatus: "Tier S in 5.x. His value increases with high-investment EM builds. Best with Freedom-Sworn for team ATK buff.",
    keyThreshold: "EM breakpoint: 800-1000 EM optimal. Beyond 1000, diminishing returns on conversion rate."
  },
  "yelan": {
    whyItWorks: "Yelan's burst ramps damage by 3.5% per second up to 50% over 15 seconds, making longer rotations disproportionately beneficial. Her A4 passive increases the active character's damage by 1% per 10 seconds of burst duration (up to 50%). She enables double Hydro cores that transform Hu Tao and other vape teams.",
    metaStatus: "Core unit in 5.x meta. The HP-scaling + ramping damage mechanic gives her increasing value over the course of combat.",
    keyThreshold: "ER breakpoint: 140-160% solo, 110-120% with another Hydro. HP: 35,000+ for optimal damage."
  },
  "alhaitham": {
    whyItWorks: "Alhaitham's damage scales with EM through his A4 passive (0.1% damage per EM point on Projection Attacks) and his mirror stacking mechanic. Three mirrors provide 90% more damage than one mirror. The optimal rotation creates a 4-second window where all three mirrors are active for maximum burst damage.",
    metaStatus: "Best on-field Dendro DPS in 5.x. Works in both Spread and Quickbloom teams equally well.",
    keyThreshold: "EM: 200-400 EM range. ATK: 1,200+ base. Critical to maintain 3-mirror uptime during burst windows."
  }
};