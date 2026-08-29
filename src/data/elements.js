export const elements = [
  {
    slug: "pyro",
    name: "Pyro",
    tagline: "The amplification element — Pyro turns other elements' auras into damage multipliers.",
    overview:
      "Pyro is the strongest offensive element because it drives both amplifying reactions: Vaporize (with Hydro) and Melt (with Cryo). Those two reactions multiply your damage rather than adding to it, which is why nearly every top-tier carry team includes a Pyro unit. Pyro also enables Overload (with Electro) and Burning (with Dendro), and Pyro triggers Burgeon when it detonates a Dendro Core.",
    reactions: [
      { name: "Vaporize", with: "Hydro", effect: "Pyro onto Hydro = 1.5x damage. Hydro onto Pyro = 2x damage. The strongest amplifying reaction for most carries." },
      { name: "Melt", with: "Cryo", effect: "Pyro onto Cryo = 2x damage. Cryo onto Pyro = 1.5x. The highest per-hit multiplier available." },
      { name: "Overload", with: "Electro", effect: "AoE Pyro explosion that cannot crit. Knocks back small enemies, which is useful in some teams and annoying in others." },
      { name: "Burning", with: "Dendro", effect: "Applies a persistent Pyro aura that deals damage over time. The foundation of Burning teams." },
      { name: "Burgeon", with: "Dendro Core", effect: "Pyro detonates a Bloom core for AoE Dendro damage that also damages your own active character." },
    ],
    bestTeams: [
      {
        name: "Vaporize (Hu Tao / Arlecchino)",
        comp: "Carry + Xingqiu or Yelan + Zhongli + flex",
        why: "The most consistent high-damage archetype in the game. Hydro aura guarantees every big hit is multiplied.",
      },
      {
        name: "National / International",
        comp: "Xiangling + Bennett + Xingqiu + driver (Raiden, Childe, or Sucrose)",
        why: "Xiangling's Pyronado Vaporizes every hit while Bennett batteries her — the engine behind most speedrun teams.",
      },
      {
        name: "Melt (Mavuika / Ganyu / Arlecchino)",
        comp: "Pyro carry + Citlali or Rosaria + Bennett + flex",
        why: "Uses the 2x Melt multiplier for the single largest hit numbers in the game.",
      },
      {
        name: "Overload (Chevreuse)",
        comp: "Pyro/Electro carry + Chevreuse + Fischl + Bennett",
        why: "Chevreuse shreds Pyro and Electro RES and buffs ATK, which turns Overload into a real archetype.",
      },
    ],
    faq: [
      {
        q: "Which Pyro reaction is strongest?",
        a: "Vaporize and Melt are the strongest for damage because they multiply instead of adding. Overload is a transformative reaction — it cannot crit and its damage depends on level and Elemental Mastery rather than your carry's stats.",
      },
      {
        q: "Why is Xiangling in so many teams?",
        a: "Her burst (Pyronado) applies Pyro off-field with no ICD issues for aura purposes, and it snapshots buffs. Combined with Bennett's energy and ATK buff, she converts one team slot into sustained AoE Pyro damage.",
      },
      {
        q: "Do I need a Pyro character on every team?",
        a: "Not every team, but most high-damage teams use one. Freeze and Dendro reaction teams are the main archetypes that can function without Pyro.",
      },
    ],
  },
  {
    slug: "hydro",
    name: "Hydro",
    tagline: "The enabling element — Hydro sets up the reactions other elements detonate.",
    overview:
      "Hydro rarely deals the biggest numbers itself, but almost every strong team needs it. Hydro enables Vaporize, Freeze, Bloom, and Electro-Charged, which means Hydro units are the connective tissue of most team compositions. Xingqiu, Yelan, Furina, and Kokomi appear across nearly every archetype for exactly this reason.",
    reactions: [
      { name: "Vaporize", with: "Pyro", effect: "Hydro onto Pyro aura = 2x damage for the Hydro hit. The reverse direction (Pyro onto Hydro) is 1.5x." },
      { name: "Freeze", with: "Cryo", effect: "Freezes enemies in place, removing their actions and enabling Blizzard Strayer's CRIT Rate bonus." },
      { name: "Bloom", with: "Dendro", effect: "Creates Dendro Cores, which then become Hyperbloom or Burgeon when triggered by Electro or Pyro." },
      { name: "Electro-Charged", with: "Electro", effect: "Deals continuous Electro damage over time and can chain between nearby enemies." },
    ],
    bestTeams: [
      {
        name: "Hyperbloom",
        comp: "Nahida or Dendro MC + Xingqiu + Kuki Shinobu + flex",
        why: "Hydro plus Dendro creates cores, and Electro detonates them. The cheapest archetype that clears endgame content.",
      },
      {
        name: "Freeze",
        comp: "Ayaka or Ganyu + Shenhe + Kazuha + Kokomi or Mona",
        why: "Hydro aura keeps enemies frozen so the Cryo carry gets free CRIT Rate and free crowd control.",
      },
      {
        name: "Vaporize carry teams",
        comp: "Hu Tao, Arlecchino, or Yoimiya + Xingqiu or Yelan + Zhongli + flex",
        why: "Hydro application lets every Pyro hit Vaporize, which is the core of the highest single-target damage teams.",
      },
      {
        name: "Furina amplifier teams",
        comp: "Furina + team-wide healer + carry + buffer",
        why: "Furina's damage buff plus off-field Hydro improves almost every team that can run a healer.",
      },
    ],
    faq: [
      {
        q: "Which Hydro character should I build first?",
        a: "Xingqiu. He has the highest off-field Hydro application rate in the game, provides damage reduction and interruption resistance, and he is a 4-star you get from events and the shop.",
      },
      {
        q: "Furina or Yelan?",
        a: "Furina if your team has a healer and you want the biggest damage increase. Yelan if you want plug-and-play Hydro application with a ramping buff and no healing requirement.",
      },
      {
        q: "Can Hydro work as a main DPS?",
        a: "Yes — Neuvillette, Tartaglia, Ayato, and Mualani are all strong Hydro carries. But even in those teams, a second Hydro unit is usually needed for energy and application.",
      },
    ],
  },
  {
    slug: "dendro",
    name: "Dendro",
    tagline: "The reaction engine — Dendro created the strongest low-investment archetypes in the game.",
    overview:
      "Dendro's release reshaped the entire meta. It introduced Bloom (which leads to Hyperbloom and Burgeon) and Quicken (which leads to Spread and Aggravate). Hyperbloom in particular is the cheapest path to endgame content, because its damage scales only with the trigger's Elemental Mastery and level — not with CRIT or artifact quality.",
    reactions: [
      { name: "Bloom", with: "Hydro", effect: "Creates a Dendro Core. The core detonates on its own after a delay, or immediately when triggered." },
      { name: "Hyperbloom", with: "Bloom core + Electro", effect: "Converts the core into a homing projectile. Damage scales only with the Electro trigger's EM and level." },
      { name: "Burgeon", with: "Bloom core + Pyro", effect: "Detonates the core in an AoE explosion that also damages your own active character." },
      { name: "Quicken", with: "Electro", effect: "Creates a Quicken state on the enemy, which enables Spread and Aggravate." },
      { name: "Spread", with: "Quicken + Dendro", effect: "Adds flat damage to Dendro hits. Can crit, so it rewards CRIT investment." },
      { name: "Aggravate", with: "Quicken + Electro", effect: "Adds flat damage to Electro hits. Can crit, so it rewards CRIT investment." },
      { name: "Burning", with: "Pyro", effect: "Applies a persistent Pyro aura on the enemy that deals damage over time." },
    ],
    bestTeams: [
      {
        name: "Hyperbloom",
        comp: "Nahida + Xingqiu + Kuki Shinobu + flex",
        why: "Highest damage per unit of investment in the game. Only the Electro trigger needs real investment.",
      },
      {
        name: "Aggravate",
        comp: "Nahida + Fischl + Kazuha + Electro carry (Clorinde, Keqing, Cyno, Yae)",
        why: "Adds flat damage to every Electro hit, which rewards a fully built CRIT carry.",
      },
      {
        name: "Nilou Bloom",
        comp: "Nilou + Nahida + Kokomi + Collei or Dendro MC",
        why: "Bountiful Cores detonate instantly in a large radius. The strongest AoE archetype, weak against single bosses.",
      },
      {
        name: "Spread",
        comp: "Alhaitham + Nahida + Yae Miko or Fischl + Zhongli",
        why: "Maximises Dendro personal damage through Spread, which scales with both EM and CRIT.",
      },
    ],
    faq: [
      {
        q: "Is Nahida mandatory for Dendro teams?",
        a: "Not mandatory, but she is a large upgrade. Dendro Traveler, Collei, and Yaoyao all work — you just get slower Dendro application and smaller coverage.",
      },
      {
        q: "Hyperbloom or Aggravate?",
        a: "Hyperbloom for cheap, reliable damage that only needs one built character. Aggravate when you already have a well-invested Electro carry and want a higher ceiling.",
      },
      {
        q: "How much Elemental Mastery does a Hyperbloom trigger need?",
        a: "Around 800-1,000 EM, and the trigger must be level 90. Hyperbloom damage scales with level and EM only — ATK, CRIT, and DMG% do nothing for it.",
      },
    ],
  },
  {
    slug: "electro",
    name: "Electro",
    tagline: "The trigger element — Electro converts other elements' setups into damage.",
    overview:
      "Electro reactions do not multiply your damage directly, but Electro units are the trigger for two of the strongest archetypes in the game: Hyperbloom (detonating Dendro Cores) and Aggravate (adding flat damage through Quicken). Electro also provides Superconduct for Physical teams and batteries energy better than any other element.",
    reactions: [
      { name: "Aggravate", with: "Quicken", effect: "Adds flat damage to Electro hits, applied before CRIT and DMG multipliers." },
      { name: "Hyperbloom", with: "Bloom core", effect: "Electro detonates a Bloom core into a homing projectile that scales with EM and level." },
      { name: "Overload", with: "Pyro", effect: "AoE Pyro explosion that cannot crit and knocks back small enemies." },
      { name: "Electro-Charged", with: "Hydro", effect: "Continuous Electro damage over time that can chain between enemies." },
      { name: "Superconduct", with: "Cryo", effect: "Reduces enemy Physical RES by 40% — mandatory for Physical carries like Eula." },
    ],
    bestTeams: [
      {
        name: "Hyperbloom",
        comp: "Nahida + Xingqiu + Kuki Shinobu + flex",
        why: "Kuki triggers cores while healing, which removes the need for a separate sustain slot.",
      },
      {
        name: "Aggravate",
        comp: "Nahida + Fischl + Kazuha + Electro carry",
        why: "Fischl's A4 passive adds Electro damage on every reaction trigger, which is why she is in every Aggravate team.",
      },
      {
        name: "Overload (Chevreuse)",
        comp: "Raiden or Clorinde + Chevreuse + Fischl + Bennett",
        why: "Chevreuse shreds Pyro and Electro RES and buffs ATK, making Overload genuinely competitive.",
      },
      {
        name: "Raiden National",
        comp: "Raiden + Xiangling + Xingqiu + Bennett",
        why: "Raiden refunds energy to the whole team, which solves Xiangling's energy problem entirely.",
      },
    ],
    faq: [
      {
        q: "Which Electro character is the best Hyperbloom trigger?",
        a: "Kuki Shinobu, because her skill follows the active character, applies Electro off-field, and heals — all at once. Raiden Shogun is the best 5-star alternative, but she needs a separate healer.",
      },
      {
        q: "Why is Fischl considered so strong?",
        a: "Oz provides the most reliable single-target Electro application in the game, generates energy, and her A4 passive adds extra Electro damage whenever the active character triggers an Electro reaction.",
      },
      {
        q: "Is Electro a good main DPS element?",
        a: "Less so than Pyro or Hydro, because Electro has no amplifying reaction. Electro carries work through Aggravate or Overload, which requires specific teammates.",
      },
    ],
  },
  {
    slug: "cryo",
    name: "Cryo",
    tagline: "The control element — Cryo removes enemy actions and multiplies Pyro damage.",
    overview:
      "Cryo has the best defensive-to-offensive conversion in the game. Freeze removes enemy actions entirely while granting your carry up to 55% free CRIT Rate through Blizzard Strayer and Cryo resonance. Cryo also enables Melt, which provides the largest per-hit multiplier available for Pyro carries.",
    reactions: [
      { name: "Freeze", with: "Hydro", effect: "Immobilises enemies and enables Blizzard Strayer's CRIT Rate bonus. Enemies that cannot be frozen ignore this entirely." },
      { name: "Melt", with: "Pyro", effect: "Cryo onto Pyro = 1.5x damage. Pyro onto Cryo = 2x for the Pyro hit." },
      { name: "Superconduct", with: "Electro", effect: "Reduces Physical RES by 40%, which is the foundation of Physical teams." },
      { name: "Cryo Resonance", with: "Two Cryo units", effect: "Grants 15% CRIT Rate against Cryo-affected or frozen enemies." },
    ],
    bestTeams: [
      {
        name: "Freeze (Ayaka / Ganyu)",
        comp: "Cryo carry + Shenhe + Kazuha + Kokomi",
        why: "Cheapest archetype to gear for endgame, because CRIT Rate comes from the set and resonance instead of artifacts.",
      },
      {
        name: "Melt (Ganyu)",
        comp: "Ganyu + Xiangling + Bennett + Zhongli",
        why: "Reverse Melt turns Ganyu's charged shots into the largest single Cryo numbers in the game.",
      },
      {
        name: "Melt for Pyro carries",
        comp: "Mavuika or Arlecchino + Citlali + Bennett + flex",
        why: "Cryo aura lets the Pyro carry hit the 2x Melt multiplier on its biggest hits.",
      },
      {
        name: "Physical (Eula)",
        comp: "Eula + Raiden + Mika + Zhongli",
        why: "Superconduct from Raiden reduces Physical RES, which is mandatory for Eula's burst to land at full value.",
      },
    ],
    faq: [
      {
        q: "Freeze or Melt for a Cryo carry?",
        a: "Freeze by default — it is safer, cheaper to gear, and works on more enemies. Switch to Melt for boss chambers where Freeze does nothing, or when you want the higher ceiling.",
      },
      {
        q: "How much CRIT Rate does a Freeze carry need?",
        a: "Very little. Blizzard Strayer 4pc plus Cryo resonance gives up to 55% CRIT Rate, so 30-45% from artifacts is usually enough. Put the rest into CRIT DMG.",
      },
      {
        q: "What is the biggest weakness of Cryo teams?",
        a: "Bosses that cannot be frozen. Against those enemies, Freeze teams lose their CRIT Rate sources, their crowd control, and most of their damage.",
      },
    ],
  },
  {
    slug: "anemo",
    name: "Anemo",
    tagline: "The amplifier element — Anemo does not deal damage itself, it multiplies everyone else's.",
    overview:
      "Anemo units are almost never the damage dealer, but they are in most top teams because of one artifact set: Viridescent Venerer, which shreds 40% Elemental RES for the swirled element. Add crowd control, energy generation, and (for Kazuha) an Elemental DMG Bonus that scales with EM, and Anemo supports routinely contribute more team damage than a second carry would.",
    reactions: [
      { name: "Swirl", with: "Pyro / Hydro / Electro / Cryo", effect: "Spreads the attached element to nearby enemies and deals Anemo damage. Triggers Viridescent Venerer's RES shred." },
      { name: "Viridescent Venerer", with: "Swirled element", effect: "Reduces enemy Elemental RES by 40% for the swirled element — the single strongest support effect available." },
    ],
    bestTeams: [
      {
        name: "Any reaction team",
        comp: "Kazuha or Sucrose + elemental DPS + buffer + sustain",
        why: "VV shred plus (for Kazuha) an Elemental DMG Bonus, in a slot that needs almost no field time.",
      },
      {
        name: "Freeze",
        comp: "Ayaka + Shenhe + Kazuha + Kokomi",
        why: "Kazuha groups enemies so Ayaka's burst hits everything, and shreds Cryo RES at the same time.",
      },
      {
        name: "Anemo hypercarry (Xiao / Wanderer)",
        comp: "Carry + Faruzan + Bennett + Zhongli",
        why: "Faruzan shreds Anemo RES and buffs Anemo DMG, which is what makes Anemo carries viable at all.",
      },
      {
        name: "National variants",
        comp: "Sucrose + Xiangling + Xingqiu + Bennett",
        why: "Sucrose holds Thrilling Tales and shares EM while providing VV shred — a complete budget support package.",
      },
    ],
    faq: [
      {
        q: "Kazuha or Sucrose?",
        a: "Kazuha for damage amp, crowd control, and universal value. Sucrose if you want a 4-star who shares EM and holds Thrilling Tales — at C6 she can match or beat Kazuha in reaction-heavy teams.",
      },
      {
        q: "Why does everyone use Viridescent Venerer?",
        a: "Because 40% Elemental RES shred is a multiplicative damage increase that no other artifact set provides. It is the reason Anemo supports are in most meta teams.",
      },
      {
        q: "Can Anemo work as a main DPS?",
        a: "Yes, but only with Faruzan. Xiao, Wanderer, and Heizou all depend on her Anemo RES shred and DMG bonus to reach competitive damage.",
      },
    ],
  },
  {
    slug: "geo",
    name: "Geo",
    tagline: "The self-sufficient element — Geo trades reactions for raw stats and shields.",
    overview:
      "Geo does not participate in amplifying or most transformative reactions. Instead it produces Crystallize shards, which grant elemental shields. Geo teams trade reaction multipliers for very stable, shield-protected damage, and several Geo characters scale on DEF — a stat that is much easier to build than CRIT.",
    reactions: [
      { name: "Crystallize", with: "Pyro / Hydro / Electro / Cryo", effect: "Creates an elemental shard that grants a shield of that element when picked up. No damage, but strong defensive value." },
      { name: "Geo Resonance", with: "Two Geo units", effect: "Increases shield strength by 15% and boosts damage while protected by a shield." },
    ],
    bestTeams: [
      {
        name: "Mono Geo (Itto)",
        comp: "Itto + Gorou + Zhongli + Albedo",
        why: "Gorou provides DEF and Geo DMG buffs, and three Geo units keep crystallize shields up permanently.",
      },
      {
        name: "Navia teams",
        comp: "Navia + Furina + Bennett + Zhongli",
        why: "Navia consumes crystallize shards for front-loaded damage, so off-element teammates actually help her.",
      },
      {
        name: "Geo sub-DPS slot",
        comp: "Any team + Chiori or Albedo",
        why: "Off-field Geo damage that requires no reactions and almost no field time.",
      },
    ],
    faq: [
      {
        q: "Is Geo viable without reactions?",
        a: "Yes, but with a lower ceiling. Geo teams make up for it with shield uptime, DEF-scaling builds that are easy to gear, and immunity to elemental shields that stop reaction teams.",
      },
      {
        q: "Why does my Geo team struggle against elemental shields?",
        a: "Geo cannot break most elemental shields efficiently, because it does not apply an element that reacts with them. Bring a counter-element unit for those fights.",
      },
      {
        q: "Which Geo character should I build first?",
        a: "Zhongli for universal value, or Navia if you want a Geo carry. Gorou is mandatory if you plan to run Itto.",
      },
    ],
  },
];
