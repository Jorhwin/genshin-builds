import { pathToFileURL } from 'url';
import { writeFileSync } from 'fs';

const base = 'D:/GAME/Game web 1000plus AI/genshin-builds/src/data/';

const newGuides = {
  keqing: `Keqing was the first Electro carry in the game and spent years being considered weak — until Dendro arrived. Aggravate changed everything, because it adds flat damage to her very fast Electro hits, and her kit is built around hitting often rather than hitting hard.\n\nHer rotation is the fastest in the game: skill, then a charged attack or a second skill cast to trigger her thunderclap, then swap. Because her field time is short, she fits into quick-swap teams where other carries would waste buff uptime.\n\nHer best team is Aggravate: Keqing + Fischl + Nahida (or Baizhu) + Kazuha/Sucrose. Fischl is the key partner, because her A4 passive triggers additional Electro damage whenever the active character triggers an Electro reaction — which happens constantly with Keqing.\n\nWhere she struggles: her raw multipliers are lower than modern Electro carries, so she depends entirely on Aggravate to compete. She also wants 200-300 EM alongside normal CRIT stats, which makes her harder to build than a pure ATK carry.`,
  diluc: `Diluc is the original Pyro carry, and his kit is still perfectly functional: three sequential skill casts with a short cooldown, a burst that infuses Pyro, and Crimson Witch of Flames as a set that was practically designed for him. He is easy to play, self-sufficient, and needs no constellations.\n\nThe honest problem is numbers. Modern Pyro carries (Hu Tao, Arlecchino, Mavuika, Lyney) simply have higher multipliers and better mechanics, so Diluc needs significantly more investment to reach the same clear times. He is not unusable — he is just outclassed.\n\nHis best team is still the classic Vaporize setup: Diluc + Xingqiu + Bennett + Sucrose (or Kazuha). Because his skill has three charges, he can weave them between Xingqiu's rainsword triggers for consistent Vaporize uptime.\n\nWhere he struggles: his damage ceiling is fixed by old multipliers, and he has no unique mechanic (no Bond of Life, no Nightsoul, no HP scaling) to multiply his output. Players who like him can absolutely clear content; players chasing efficiency will get more from newer carries.`,
  mona: `Mona is a burst amplifier disguised as a Hydro support. Her burst applies the Omen debuff, which increases the damage enemies take for a few seconds — and if the enemy is frozen while Omen is active, the duration is extended. That interaction is why she is a staple of one-shot showcase teams and Freeze compositions.\n\nHer skill provides a taunt that applies Hydro, which is useful for crowd control but applies far less Hydro than Xingqiu or Kokomi. This is the key limitation: Mona is not a Hydro aura bot, she is a damage window enabler.\n\nBecause her value comes from her burst, she wants Emblem of Severed Fate plus enough Energy Recharge (around 200%) to burst every rotation. Thrilling Tales of Dragon Slayers is an excellent weapon on her for the ATK buff it passes to the next character.\n\nWhere she struggles: her Hydro application is too weak to drive reaction teams on her own, and if you mistime her burst the Omen window expires before your carry starts attacking — which wastes her entire contribution.`,
  eula: `Eula is the only serious Physical carry in the game, and her design is built around one big moment: her burst stacks Grimheart stacks as she attacks, then detonates for enormous Physical damage. Everything else in her kit exists to feed that detonation.\n\nPhysical damage has a specific weakness — it is reduced by enemy Physical resistance, which many bosses and elite enemies have. That is why Superconduct (Electro plus Cryo, reducing Physical RES by 40%) is mandatory for her, which in turn means she always needs an Electro teammate. Raiden is the ideal choice because she also solves Eula's energy problem.\n\nHer build is straightforward: Pale Flame 4pc, Physical DMG Goblet, ATK Sands, CRIT Circlet. Energy Recharge matters more on her than on most carries, because her burst costs 80 energy and the entire team exists to set it up.\n\nWhere she struggles: she has the longest setup of any carry, her burst can miss entirely if the enemy moves or phases, and Physical teams cannot take advantage of reaction multipliers the way elemental teams can.`,
  klee: `Klee is a catalyst Pyro carry who throws bombs, and her gameplay is defined by one mechanic: her charged attacks cost stamina but deal far more damage than her normals, so optimal play means animation-canceling every charged attack with a jump or a dash.\n\nThat cancel requirement is the reason she feels bad to many players. At high skill she is competent; without cancels her damage drops sharply, and her short range plus slow animations make her uncomfortable in endgame content with aggressive enemies.\n\nHer best team is Mono-Pyro or Vaporize: Klee + Kazuha + Bennett + Xiangling. Because she applies Pyro extremely quickly, she also works as the driver in Overload and even Burgeon-adjacent compositions.\n\nWhere she struggles: her multipliers are below modern Pyro carries, she requires animation cancels to be competitive, and her attacks scatter small enemies — which then have to be chased down.`,
  jean: `Jean is the most complete healer-support in the game: her burst heals the entire party instantly and creates a field that continuously heals the active character, while her skill provides crowd control and Viridescent Venerer shred. She compresses healing and Anemo support into one slot.\n\nHer most interesting interaction is Sunfire: combining her burst with Bennett's burst applies Pyro to your own active character, which Jean's field then swirls repeatedly for continuous Pyro damage. It is a niche but powerful pattern in specific teams.\n\nBecause her healing scales with ATK, her build is unusual for a support — she wants ATK% rather than HP%. That also means she contributes more personal damage than most healers.\n\nWhere she struggles: her skill launches small enemies upward, which can scatter groups instead of grouping them, and her crowd control is weaker than Kazuha's or Venti's. In teams that need EM or tight grouping, Sucrose is usually the better Anemo support.`,
  albedo: `Albedo is a pure off-field Geo sub-DPS: place his Solar Isotoma, and it deals Geo damage automatically while also creating a platform that lifts your active character. He requires almost no field time and no energy management beyond his modest burst cost.\n\nHis entire kit scales on DEF, which makes him one of the cheapest characters to build well — DEF is a common substat, and his best weapon (Cinnabar Spindle) was a free event weapon. Husk of Opulent Dreams is his set, and it stacks DEF and Geo DMG over time.\n\nThe main weakness of his kit is fragility: the Isotoma flower can be destroyed by bosses, and against enemies that move around it simply stops contributing. His damage is also steady rather than high, so he rarely decides a fight on his own.\n\nWhere he struggles: he has been largely outclassed by Chiori, who does the same job with higher damage and no placement issues. Albedo is still perfectly usable, but he is no longer the best choice for the role.`,
  "kamisato-ayato": `Ayato is the most flexible Hydro carry in the game. His skill enters a stance where his normal attacks become fast Hydro slashes, which means he can drive Vaporize, Electro-Charged, Bloom, or Freeze depending entirely on his teammates. No other Hydro carry covers that many archetypes.\n\nThat flexibility is his selling point and his limitation. He is very good at many things and best-in-slot at none — Neuvillette out-damages him, Childe enables faster Vaporize, and Nilou is stronger in Bloom. What Ayato offers is a comfortable carry who fits into whatever team you already have built.\n\nHis burst is also valuable: it applies Hydro in a large AoE off-field, so even when he leaves the field he keeps enabling reactions. Heart of Depth and Echoes of an Offering are both solid sets for him.\n\nWhere he struggles: his damage ceiling is mid-tier among Hydro carries, and his value depends on having teammates that can use his Hydro application. In a vacuum he is a comfortable, reliable carry rather than a dominant one.`,
};

const newInsights = {
  keqing: {
    whyItWorks: "Her extremely fast Electro hits trigger Aggravate constantly, and Dendro's release turned her from a low-multiplier carry into a competitive quick-swap DPS.",
    keyThreshold: "ATK 1,800+. CRIT 70/140+. EM 200-300 on top of normal carry stats for Aggravate.",
    metaStatus: "Viable Aggravate carry with the shortest field time of any Electro DPS — not top-tier, but genuinely competitive.",
    weakness: "Low raw multipliers mean she depends entirely on Aggravate, and she needs EM as well as CRIT investment.",
    controversy: "Keqing was the community's favourite 'buff me please' character for years. Aggravate finally delivered, but the debate now is whether she is genuinely strong or simply no longer weak.",
  },
  diluc: {
    whyItWorks: "Three sequential skill charges plus a Pyro-infused burst make him the easiest carry to play — no cancels, no HP management, no stance timing.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. EM 100-200 in Vaporize teams.",
    metaStatus: "Outclassed but usable. Clears all content with enough investment, just slower than modern Pyro carries.",
    weakness: "Old multipliers and no unique damage mechanic — he needs significantly more investment than Hu Tao or Arlecchino for the same result.",
    controversy: "Diluc vs Gaming: Gaming has higher multipliers and a similar playstyle, which has pushed Diluc further down the tier lists despite his popularity.",
  },
  mona: {
    whyItWorks: "Her burst applies Omen, which increases enemy damage taken — and freezing enemies while Omen is active extends the debuff significantly.",
    keyThreshold: "ER around 200% so her burst is ready every rotation. ATK and Hydro DMG for whatever personal damage she contributes.",
    metaStatus: "Best burst amplifier for Freeze teams and one-shot showcases; weak as a Hydro aura applier.",
    weakness: "Her Hydro application is too weak to drive reaction teams, and mistiming her burst wastes the entire Omen window.",
    controversy: "Mona vs Kokomi in Freeze: Kokomi provides far better Hydro uptime and healing, while Mona provides a much larger damage window — the choice is comfort versus burst.",
  },
  eula: {
    whyItWorks: "Her burst stacks damage while she attacks and then detonates, producing the single largest Physical hit available in the game.",
    keyThreshold: "ATK 2,000+. CRIT 70/160+. ER 130-160% (80-cost burst). Superconduct is mandatory, which means an Electro teammate is part of her build.",
    metaStatus: "The only viable Physical carry. Strong when Physical resistance is low, weak when it is not.",
    weakness: "Long setup, the detonation can whiff entirely, and Physical damage cannot benefit from reaction multipliers.",
    controversy: "The long-standing community question is whether Physical teams are still viable at all. Eula is the only character keeping the archetype relevant, and newer bosses with high Physical RES have made her less reliable.",
  },
  klee: {
    whyItWorks: "Her charged attacks have high multipliers and she applies Pyro faster than almost any other character, which makes her a strong reaction driver.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. Animation cancels are effectively part of her requirements.",
    metaStatus: "Playable but outclassed — her multipliers and handling are both below modern Pyro carries.",
    weakness: "Requires animation cancels to be competitive, scatters small enemies, and has short range with slow animations.",
    controversy: "Klee is a much-loved character with consistently mediocre meta placement, which makes her one of the most requested buffs in the community.",
  },
  jean: {
    whyItWorks: "One slot provides full-party healing, Viridescent Venerer shred, and crowd control — and her healing scales with ATK, so she still deals damage.",
    keyThreshold: "ATK 2,000+ (healing and damage both scale with ATK). ER 160-200% for burst uptime.",
    metaStatus: "Best healing Anemo support, and a core piece of Sunfire compositions.",
    weakness: "Her skill launches enemies upward, which can scatter groups, and her crowd control is weaker than Kazuha's.",
    controversy: "Jean vs Sucrose: Sucrose provides EM share and better grouping, while Jean provides healing — most reaction teams prefer Sucrose unless the team specifically needs a healer.",
  },
  albedo: {
    whyItWorks: "His skill provides automatic off-field Geo damage with almost no field time, and it scales on DEF, which is cheap to build.",
    keyThreshold: "DEF 2,000+. CRIT 60/120+. ER is a minor concern because his burst is secondary.",
    metaStatus: "Solid off-field Geo sub-DPS, but no longer best-in-role.",
    weakness: "The Isotoma can be destroyed by bosses, and enemies that move away from it stop taking damage entirely.",
    controversy: "Albedo vs Chiori: Chiori deals more damage and has no placement problems, which has made her the default pick for the same role.",
  },
  "kamisato-ayato": {
    whyItWorks: "His skill stance converts normal attacks into fast Hydro slashes, so he can drive Vaporize, Bloom, Electro-Charged, or Freeze with the same build.",
    keyThreshold: "ATK 2,000+. CRIT 70/140+. ER 120-140% so his off-field burst is ready each rotation.",
    metaStatus: "The most flexible Hydro carry — very good at everything, best at nothing.",
    weakness: "Mid-tier damage ceiling compared to Neuvillette or a well-played Childe, and his value depends on teammates using his Hydro.",
    controversy: "Ayato vs Childe: Childe enables faster Vaporize and higher AoE ceilings, while Ayato is far more comfortable and fits more team types.",
  },
};

const newBuilds = {
  keqing: "Thundering Fury 4pc is her best set in Aggravate because the cooldown reduction lets her use her skill far more often. Standard ATK Sands, Electro DMG Goblet, CRIT Circlet — but make sure you also reach 200-300 EM, because Aggravate damage scales with it. Mistsplitter Reforged is best-in-slot; Lion's Roar is an excellent 4-star choice when the enemy is affected by Electro.",
  diluc: "Crimson Witch of Flames 4pc remains his best set, and his three skill charges stack its passive quickly. Use ATK Sands, Pyro DMG Goblet, CRIT Circlet with 100-200 EM for Vaporize. Wolf's Gravestone is his best weapon; Serpent Spine (Battle Pass) and Prototype Animus (craftable) are the realistic alternatives.",
  mona: "Emblem of Severed Fate 4pc is her set, because her entire value is her burst. Prioritise Energy Recharge (around 200%) first, then Hydro DMG and CRIT. Thrilling Tales of Dragon Slayers is often better than a damage weapon, because the ATK buff she passes to your carry is worth more than her personal damage. The Widsith is the choice if you want her to contribute damage.",
  eula: "Pale Flame 4pc is her set. Use ATK Sands, Physical DMG Goblet, CRIT Circlet — Physical DMG is essential because almost all of her damage is Physical. Aim for 130-160% ER so her 80-cost burst is ready every rotation. Song of Broken Pines is best-in-slot; Snow-Tombed Starsilver (craftable) is a strong free option because it also provides Physical DMG.",
  klee: "Crimson Witch of Flames 4pc is her best set, with Lavawalker 4pc as an alternative in Pyro-affected content. Standard ATK Sands, Pyro DMG Goblet, CRIT Circlet. Lost Prayer is her best weapon; The Widsith and Solar Pearl are both solid 4-star options. Remember that animation cancels matter more than a few extra substat rolls.",
  jean: "Viridescent Venerer 4pc is mandatory. Build ATK Sands, Anemo DMG Goblet, and CRIT or ATK Circlet — her healing scales with ATK, so ATK% pieces do double duty. Get 160-200% ER so her burst is ready when you need the heal. Freedom-Sworn and Favonius Sword are both excellent on her, depending on whether you want damage or team energy.",
  albedo: "Husk of Opulent Dreams 4pc is his best set. Build DEF Sands, Geo DMG Goblet, CRIT Circlet with DEF% substats — his damage scales entirely on DEF. Cinnabar Spindle (event weapon) is his best-in-slot by a wide margin; Harbinger of Dawn and other CRIT swords are the alternatives if you missed it.",
  "kamisato-ayato": "Heart of Depth 4pc and Echoes of an Offering 4pc are both strong — Heart of Depth is more consistent, Echoes has a higher ceiling with good ping. Use ATK Sands, Hydro DMG Goblet, CRIT Circlet, with 120-140% ER so his off-field burst is ready every rotation. Haran Geppaku Futsu is best-in-slot; Amenoma Kageuchi (craftable) is an excellent free option that also solves his energy needs.",
};

const newTeams = {
  keqing: "Her best team is Aggravate: Keqing + Fischl + Nahida + Kazuha (or Sucrose). Fischl is essential because her A4 passive adds Electro damage every time Keqing triggers an Electro reaction. Rotation: Nahida E+Q → Fischl E/Q → Kazuha E+Q → Keqing E → charged attack → E recast → Q → fast normals. The F2P version is Keqing + Fischl + Sucrose + Yaoyao.",
  diluc: "His best team is classic Vaporize: Diluc + Xingqiu + Bennett + Sucrose (or Kazuha). Rotation: Xingqiu Q+E → Bennett Q+E → Sucrose E → Diluc E ×3 with normals between each → Q → continue attacking. His three skill charges should be spaced out so each one triggers Xingqiu's rainswords. The F2P version is the same team with Sucrose and no 5-star weapons.",
  mona: "Her best team is Freeze: Ayaka + Shenhe + Kazuha + Mona, where Mona's Omen amplifies Ayaka's burst. Rotation: Kazuha E+Q → Mona E+Q (apply Omen) → Shenhe hold E → Q → Ayaka burst inside the Omen window. She is also used in one-shot showcase teams with Bennett and Kazuha. For a budget Freeze team, use Ayaka + Sucrose + Mona + Diona.",
  eula: "Her best team is Eula + Raiden + Mika + Zhongli: Raiden provides Superconduct and energy, Mika buffs Physical DMG, and Zhongli shreds resistance while shielding. Rotation: Raiden E → Zhongli hold E → Mika E+Q → Eula E → N4 → E → N4 → Q (detonation). The F2P version is Eula + Fischl + Diona + Rosaria, which still covers Superconduct and Cryo resonance.",
  klee: "Her best team is Mono-Pyro or Vaporize: Klee + Kazuha + Bennett + Xiangling. Rotation: Bennett Q+E → Kazuha E+Q → Xiangling E+Q → Klee normal/charged attack strings with jump cancels. Klee applies Pyro so quickly that she can also drive Overload with Fischl and Beidou. The F2P version replaces Kazuha with Sucrose.",
  jean: "Her best team is as a healer plus Anemo support: Jean + Faruzan + Bennett + Zhongli works for Anemo carries, while Jean + Xingqiu + Xiangling + Bennett gives you VV shred plus full-party healing. Rotation: Jean E (VV shred) → Q (healing field) → supports → carry. The F2P Sunfire variant pairs Jean with Bennett for continuous Pyro swirls.",
  albedo: "His best team is mono-Geo: Albedo + Gorou + Zhongli + Itto, where Albedo provides off-field damage while Itto drives. Rotation: Albedo E (place Isotoma, ideally where enemies will stand) → Gorou E+Q → Zhongli hold E → Itto combo. He also fits into Navia teams as a Geo sub-DPS. The F2P version is Albedo + Gorou + Geo MC + Diona.",
  "kamisato-ayato": "His best team depends on the archetype. For Vaporize Soup: Ayato + Xiangling + Bennett + Kazuha, where his Hydro application lets Xiangling Vaporize consistently. For Bloom or Hyperbloom he pairs with Nahida and Kuki. Rotation (Soup): Bennett Q+E → Kazuha E+Q → Xiangling E+Q → Ayato E (stance) → N3 spam → Q. The F2P version is Ayato + Xiangling + Bennett + Sucrose.",
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
console.log('content batch 6 merged');
