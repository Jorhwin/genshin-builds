import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const additions = [
  {
    slug: "national-team-guide",
    title: "National Team in Genshin Impact: Full Guide, Variants & Rotation",
    seoDesc:
      "Complete Genshin Impact National team guide: how the energy loop works, the correct rotation order, every variant (Raiden, Childe, Sucrose), and the mistakes that ruin the damage.",
    summary:
      "National is not one team — it is an engine. Bennett batteries Xiangling, Xingqiu enables Vaporize, and a fourth unit either drives the reaction or adds more damage. Understanding the engine is what makes every variant work.",
    sections: [
      {
        title: "Why National Works",
        content:
          "Xiangling's Pyronado deals enormous off-field Pyro damage, but it costs 80 energy. Bennett solves that with a short-cooldown skill that generates a large number of Pyro particles, and his burst simultaneously buffs Xiangling's ATK. Because Pyronado snapshots, Xiangling keeps Bennett's buff for the full 14 seconds even after his burst expires. Add Xingqiu's rainswords and every Pyronado hit Vaporizes.",
      },
      {
        title: "The Standard Rotation",
        content:
          "Bennett Q → Bennett E → Xiangling E → Xiangling Q → Xingqiu Q+E → on-field driver. The order matters more than the stats: Xiangling must cast inside Bennett's circle, and Bennett's E should come after his Q so the particles go to Xiangling rather than being wasted.",
      },
      {
        title: "Common Variants",
        content:
          "Raiden National (Raiden + Xiangling + Xingqiu + Bennett) is the most consistent, because Raiden refunds energy to the whole team. Childe International swaps Raiden for Tartaglia and Sucrose or Kazuha, which trades consistency for a much higher damage ceiling. Sucrose National uses Sucrose as the driver with Thrilling Tales and Viridescent Venerer.",
      },
      {
        title: "Mistakes That Kill the Damage",
        content:
          "Casting Xiangling's burst outside Bennett's circle (loses roughly a third of her damage), using Bennett's E before his Q (wastes the battery window), building ER below 200% on Xiangling, and swapping out of the driver before Pyronado finishes. None of these are stat problems — they are all rotation problems.",
      },
    ],
    verdict:
      "If you can only build one team, build National. Every character except the driver is a 4-star, all of them stay relevant in endgame, and the same core (Bennett + Xingqiu + Xiangling) can be reused with any on-field carry you like.",
  },
  {
    slug: "furina-fanfare-guide",
    title: "Furina Fanfare Stacks: How to Maximise Her Damage Buff",
    seoDesc:
      "How Furina's Fanfare stacks work in Genshin Impact. Which healers stack it fastest, rotation order, and the team-building mistakes that waste her damage buff.",
    summary:
      "Furina's burst converts HP changes into Fanfare stacks, and those stacks become a team-wide damage bonus of up to 75%. The buff is not affected by her artifacts — it is entirely determined by how much your team's HP moves.",
    sections: [
      {
        title: "How Fanfare Is Generated",
        content:
          "Every 1% of the party's max HP that is gained or lost grants one Fanfare stack, up to 300 at C0. Furina's own skill drains party HP continuously, which generates stacks on its own — but the drain alone is not enough to reach the maximum quickly. That is where healing comes in: healing back the drained HP generates stacks far faster than the drain does.",
      },
      {
        title: "Why Team-Wide Healing Matters",
        content:
          "This is why single-target healers underperform with Furina. Bennett only heals the active character, so only one character's HP is moving. Baizhu, Kokomi, Jean, and Charlotte heal the entire party, so four characters' HP bars are moving at once — which roughly quadruples the stacking rate. Neuvillette is the ideal partner because his charged attack heals himself while Furina drains him, cycling HP constantly.",
      },
      {
        title: "Rotation Order",
        content:
          "Use Furina's skill and burst first, before the healer, so the drain starts immediately. Then bring in your buffers (Kazuha, Xilonen), then the healer, then the on-field carry. The carry should enter the field when Fanfare is already high, not at the start of the rotation.",
      },
      {
        title: "Common Mistakes",
        content:
          "Running Furina with a shielder but no healer (the drain never gets reversed, so stacks stay low), healing only the active character, and bursting with Furina after the carry has already started their damage window — which wastes most of the buff.",
      },
    ],
    verdict:
      "Pair Furina with a team-wide healer and burst early in the rotation. With Baizhu or Kokomi, most teams reach maximum Fanfare within one rotation; with only a single-target healer, you are typically leaving 30-40% of her buff on the table.",
  },
  {
    slug: "aggravate-vs-hyperbloom",
    title: "Aggravate vs Hyperbloom: Which Dendro-Electro Reaction Should You Build?",
    seoDesc:
      "Aggravate vs Hyperbloom in Genshin Impact: damage scaling, investment cost, best teams, and which reaction fits your account better.",
    summary:
      "Both use Dendro plus Electro, but they reward completely different investment. Aggravate multiplies your carry's own damage, so it wants a fully built CRIT carry. Hyperbloom deals separate reaction damage that scales only with the trigger's EM and level, so it works with almost no investment.",
    buildA: {
      name: "Aggravate",
      chars: "Nahida + Yae Miko or Fischl + Kazuha + Baizhu (example: Keqing, Clorinde, Cyno on-field)",
      playstyle:
        "Dendro plus Electro creates Quicken, then each Electro hit gains a flat damage bonus that is added before CRIT and DMG multipliers. The on-field Electro carry drives the reaction.",
      pros: [
        "Scales with your carry's CRIT and DMG investment",
        "Damage is immediate — no projectile travel time",
        "Strong single-target sustained damage",
      ],
      cons: [
        "Requires a fully built CRIT carry to be worth it",
        "Needs 200-300 EM on top of normal carry stats",
        "Quicken uptime depends on Dendro application quality",
      ],
      rotation: "Nahida E+Q → Fischl E/Q → Kazuha E+Q → Electro carry full combo",
    },
    buildB: {
      name: "Hyperbloom",
      chars: "Nahida + Xingqiu + Kuki Shinobu + flex",
      playstyle:
        "Dendro plus Hydro creates Dendro Cores, and an Electro trigger converts them into homing projectiles. Damage scales only with the trigger's Elemental Mastery and level.",
      pros: [
        "Works with almost no artifact investment",
        "Only one character needs to be built (level 90, full EM)",
        "Single-target homing damage that never misses",
      ],
      cons: [
        "Damage cap is fixed by EM — no amount of CRIT raises it",
        "Requires the trigger to be level 90 for full damage",
        "AoE is less reliable than Aggravate against spread enemies",
      ],
      rotation: "Nahida E+Q → Xingqiu Q+E → Kuki E → on-field driver generates cores",
    },
    verdict:
      "Build Hyperbloom first — it is the cheapest path to clearing Spiral Abyss and needs only one properly built character. Move to Aggravate once you have a well-invested Electro carry, because that is where the higher ceiling lives.",
  },
  {
    slug: "hyperbloom-vs-burgeon",
    title: "Hyperbloom vs Burgeon: Which Bloom Variant Is Better?",
    seoDesc:
      "Hyperbloom vs Burgeon in Genshin Impact: damage, trigger requirements, team compositions, and which Bloom variant suits your roster.",
    summary:
      "Both convert Dendro Cores into damage, but Hyperbloom fires single-target homing projectiles while Burgeon creates AoE explosions that also damage your own team. That difference decides which one is playable without a dedicated healer.",
    buildA: {
      name: "Hyperbloom",
      chars: "Nahida + Xingqiu + Kuki Shinobu + flex",
      playstyle:
        "An Electro trigger converts Dendro Cores into homing Dendro projectiles. Damage scales with the trigger's EM and level, and it cannot crit.",
      pros: [
        "Homing projectiles never miss",
        "No self-damage, so no healer is strictly required",
        "Kuki triggers it and heals at the same time",
      ],
      cons: [
        "Single-target — weaker against large groups",
        "Trigger must be level 90 and full EM",
      ],
      rotation: "Nahida E+Q → Xingqiu Q+E → Kuki E → on-field driver",
    },
    buildB: {
      name: "Burgeon",
      chars: "Nahida + Xingqiu + Thoma + flex (or Dehya)",
      playstyle:
        "A Pyro trigger detonates Dendro Cores in an AoE explosion. The explosion also damages your own active character, so a healer or shielder is mandatory.",
      pros: [
        "Strong AoE damage against grouped enemies",
        "Scales with the Pyro trigger's EM, same as Hyperbloom",
        "Thoma provides a shield that offsets some self-damage",
      ],
      cons: [
        "Self-damage can kill your own carry without a healer",
        "Pyro can burn the Dendro aura and break the core loop",
        "Less consistent single-target damage than Hyperbloom",
      ],
      rotation: "Nahida E+Q → Xingqiu Q+E → Thoma E+Q → on-field driver",
    },
    verdict:
      "Hyperbloom is the safer and more consistent choice for most accounts, and it needs no healer. Burgeon is the better pick specifically for AoE-heavy content, but it requires careful Pyro timing plus a real healer to survive your own explosions.",
  },
  {
    slug: "freeze-vs-melt",
    title: "Freeze vs Melt: Which Cryo Team Archetype Is Better?",
    seoDesc:
      "Freeze vs Melt in Genshin Impact: Cryo team archetypes compared. Damage ceiling, artifact requirements, and which one works against bosses.",
    summary:
      "Freeze gives your Cryo carry up to 55% free CRIT Rate and removes enemy actions entirely. Melt multiplies individual hits but requires precise Pyro application and a shielder. The deciding factor is whether the enemy can be frozen.",
    buildA: {
      name: "Freeze",
      chars: "Ayaka or Ganyu + Shenhe + Kazuha + Kokomi",
      playstyle:
        "Hydro aura freezes enemies in place, Blizzard Strayer grants up to 40% CRIT Rate, and Cryo resonance adds another 15%. The carry's burst then ticks through frozen enemies.",
      pros: [
        "Up to 55% free CRIT Rate from set and resonance",
        "Frozen enemies cannot act — very safe to play",
        "Cheapest archetype to gear for endgame",
      ],
      cons: [
        "Useless against bosses that cannot be frozen",
        "Requires both a Hydro applier and an Anemo unit",
      ],
      rotation: "Kazuha E+Q → Kokomi E → Shenhe hold E → Q → Ayaka dash → E → N2C ×2 → Q",
    },
    buildB: {
      name: "Melt",
      chars: "Ganyu + Xiangling + Bennett + Zhongli",
      playstyle:
        "Pyro aura is applied first, then Cryo attacks reverse-Melt for a 2x multiplier. Damage is concentrated in large individual hits rather than sustained damage.",
      pros: [
        "2x reaction multiplier on Cryo hits",
        "Works against bosses that cannot be frozen",
        "Ganyu's Frostflake bloom can Melt twice per shot",
      ],
      cons: [
        "Requires precise Pyro aura management",
        "Needs a shielder — interruption cancels charged shots",
        "Harder to play on mobile",
      ],
      rotation: "Zhongli hold E → Bennett Q+E → Xiangling E+Q → Ganyu charged shots",
    },
    verdict:
      "Run Freeze by default, because it is cheaper to gear and far safer to play. Switch to Melt for boss chambers and for any content where Freeze does nothing — Melt is also the higher-ceiling option once your execution is clean.",
  },
  {
    slug: "artifact-main-stat-priority",
    title: "Genshin Impact Artifact Main Stats: Priority Guide for Every Slot",
    seoDesc:
      "Genshin Impact artifact main stat priority for Sands, Goblet, and Circlet. When main stats beat set bonuses, and how to decide between 4-piece and 2+2.",
    summary:
      "Correct main stats with an off-set piece almost always beat a completed set with the wrong main stats. This is the single most common mistake players make when they start farming.",
    sections: [
      {
        title: "The Rule: Main Stat Beats Set Bonus",
        content:
          "A four-piece set bonus is usually worth less than getting the correct main stat. For example, an off-set Elemental DMG Goblet on a carry is almost always better than an on-set ATK Goblet that completes the set. Farm for main stats first, then finish the set bonus last.",
      },
      {
        title: "Sands, Goblet, Circlet Priorities",
        content:
          "Sands is nearly always ATK%, HP%, DEF%, EM, or ER depending on what the character scales with — for most carries it is ATK%, for HP scalers it is HP%, and for burst-heavy supports it is ER. Goblet is almost always the matching Elemental DMG Bonus (or Physical DMG for Physical carries). Circlet is CRIT Rate or CRIT DMG for damage dealers, and Healing Bonus or the scaling stat for supports.",
      },
      {
        title: "When to Use 2+2 Instead of 4-Piece",
        content:
          "Use 2+2 when the four-piece bonus does not fit the character's damage pattern, or when your 4-piece pieces have terrible substats. Common strong 2+2 combinations include 2-piece ATK + 2-piece Elemental DMG, and 2-piece EM + 2-piece EM for reaction triggers.",
      },
      {
        title: "CRIT Ratio Targets",
        content:
          "Aim for roughly a 1:2 ratio between CRIT Rate and CRIT DMG. Most carries want 60-75% CRIT Rate before buffs, and as much CRIT DMG as you can stack on top. Freeze and Obsidian Codex teams are the exception — they get large amounts of CRIT Rate for free, so build far less of it.",
      },
    ],
    verdict:
      "Fix main stats first, substats second, set bonus third. Once your main stats are correct, a 2+2 with good substats will usually outperform a 4-piece with bad ones — and you can finish the set later without losing damage.",
  },
  {
    slug: "spiral-abyss-team-building",
    title: "How to Build Two Spiral Abyss Teams: A Practical Framework",
    seoDesc:
      "A practical framework for building two Genshin Impact Spiral Abyss teams: reaction coverage, shared characters, resource allocation, and common mistakes.",
    summary:
      "Abyss needs two independent teams, and the usual failure is building one great team and one leftover team. The framework below balances both halves instead.",
    sections: [
      {
        title: "Start From the Chambers, Not the Characters",
        content:
          "Read what each half of the floor actually requires before you commit. If one half is full of small enemies, bring crowd control and AoE. If the other half is a single boss, bring single-target damage and skip Freeze entirely. Chamber design decides team composition far more than your favourite characters do.",
      },
      {
        title: "Cover Different Reactions",
        content:
          "Two teams that both rely on the same reaction will compete for the same supports. A common balanced split is one reaction team (Hyperbloom, National, or Vaporize) and one non-reaction or Freeze team, so Bennett, Xingqiu, and Kazuha are not needed on both sides at once.",
      },
      {
        title: "Allocate Your Best Supports First",
        content:
          "Decide which of your two carries is stronger, then give that team the premium supports. The weaker team should be built around self-sufficient characters — for example a Hyperbloom core that only needs one built unit plus a driver.",
      },
      {
        title: "Common Mistakes",
        content:
          "Spreading your best artifacts across eight characters, putting both of your strongest buffers on the same team, and forcing a team into a chamber where its archetype does not work (Freeze against a boss, or a single-target carry into a mob half).",
      },
    ],
    verdict:
      "Build two teams around chamber requirements, not around your favourite units. Keep one team self-sufficient so your best supports can all go to the other, and never use two archetypes that fight over the same supports.",
  },
  {
    slug: "team-rotation-fundamentals",
    title: "Genshin Impact Rotation Basics: Buff Order, Snapshotting & Field Time",
    seoDesc:
      "Genshin Impact rotation fundamentals: buff ordering, which abilities snapshot, field time management, and why rotation mistakes cost more damage than bad artifacts.",
    summary:
      "Two players with identical artifacts can have a 40% damage gap purely from rotation order. Buffs expire, some abilities snapshot, and every second of field time you waste is a second your buffs are not being used.",
    sections: [
      {
        title: "Order Buffs From Longest to Shortest",
        content:
          "Buffs with the longest duration go first, and the shortest go immediately before the carry's damage window. Viridescent Venerer shred lasts 10 seconds, Thrilling Tales lasts 10 seconds, and Bennett's circle lasts 12 — so the carry should enter the field last, right after the shortest buff is applied.",
      },
      {
        title: "Which Abilities Snapshot",
        content:
          "Snapshotting means the ability records your stats at cast time and keeps them for its full duration. Xiangling's Pyronado, Fischl's Oz, and Beidou's Stormbreaker all snapshot, so they should be cast while every buff is active. Most bursts — including Raiden's — do not snapshot and recalculate dynamically.",
      },
      {
        title: "Manage Field Time",
        content:
          "Every character has a target field time. Quick-swap supports want one to two seconds: cast skill, maybe burst, leave. On-field carries want the full duration of their buffs. The most common rotation error is not damage — it is spending four seconds on a support who only needed one.",
      },
      {
        title: "Energy and Rotation Stability",
        content:
          "A rotation that produces big numbers but cannot be repeated every cycle is worse than a slightly weaker rotation that always works. Make sure each character's burst is genuinely ready at the same point in every rotation before you optimise damage further.",
      },
    ],
    verdict:
      "Practise one rotation until it is muscle memory before chasing better artifacts. Correct buff order and tight field time are worth more damage than most artifact upgrades, and they cost nothing but practice.",
  },
];

const url = pathToFileURL(base + 'analyses.js').href;
const mod = await import(url);
const existing = mod.analyses;
const seen = new Set(existing.map((a) => a && a.slug));
const merged = [...existing];
for (const a of additions) {
  if (seen.has(a.slug)) {
    console.log('skip duplicate', a.slug);
    continue;
  }
  seen.add(a.slug);
  merged.push(a);
}
const body = merged.map((a) => JSON.stringify(a, null, 2)).join(',\n');
writeFileSync(base + 'analyses.js', `export const analyses = [\n${body}\n];\n`, 'utf-8');
console.log('analyses', existing.length, '->', merged.length);
