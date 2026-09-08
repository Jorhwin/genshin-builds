// Resolve free-text weapon / artifact recommendations into internal links.
//
// Character data stores gear as human-written prose, e.g.
//   bestWeapon:     "Engulfing Lightning / Staff of Homa"
//   f2pWeapon:      "The Catch (R5, fishable)"
//   bestArtifacts:  "Emblem of Severed Fate (4pc) / 2pc HoD + 2pc Noblesse"
//
// Only 39 weapons and 18 artifact sets have dedicated pages, so every segment
// is matched against those and rendered as a link when a page exists, or left
// as plain text when it does not. This turns build pages into inbound-link
// sources for /weapon/ and /artifact/ pages, which previously had none.

import { weaponGroups, artifactSets } from "../data/gear.js";

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Aggressive normalisation so prose variants collapse onto the canonical name:
// drops punctuation, a leading article, and trailing possessive/plural "s" per
// word. "Wolf's Gravestone" / "Wolf Gravestone" -> "wolfgravestone".
const STOPWORDS = new Set(["the", "a", "an", "of", "for"]);

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-\s]+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w && !STOPWORDS.has(w))
    .map((w) => w.replace(/s$/, ""))
    .join("");

// Short forms and abbreviations used in the character data that normalisation
// alone cannot recover.
const ALIASES = {
  // artifact sets
  vv: "Viridescent Venerer",
  emblem: "Emblem of Severed Fate",
  eosf: "Emblem of Severed Fate",
  noblesse: "Noblesse Oblige",
  tenacity: "Tenacity of the Millelith",
  tenacitymillelith: "Tenacity of the Millelith",
  crimsonwitch: "Crimson Witch of Flames",
  cwof: "Crimson Witch of Flames",
  gilded: "Gilded Dreams",
  deepwood: "Deepwood Memories",
  blizzard: "Blizzard Strayer",
  husk: "Husk of Opulent Dreams",
  marechaussee: "Marechaussee Hunter",
  goldentroupe: "Golden Troupe",
  thunderingfury: "Thundering Fury",
  shimenawa: "Shimenawa's Reminiscence",
  vermillion: "Vermillion Hereafter",
  obsidian: "Obsidian Codex",
  fragment: "Fragment of Harmonic Whimsy",
  oceanhued: "Ocean-Hued Clam",
  flowerofparadise: "Flower of Paradise Lost",
  // weapons
  mistsplitter: "Mistsplitter Reforged",
  widsith: "The Widsith",
  homa: "Staff of Homa",
  catch: "The Catch",
  thrillingtale: "Thrilling Tales of Dragon Slayers",
  wolfgravestone: "Wolf's Gravestone",
  kagura: "Kagura's Verity",
  tulaytullah: "Tulaytullah's Remembrance",
  amo: "Amos' Bow",
  amosbow: "Amos' Bow",
  luxuriousealord: "Luxurious Sea-Lord",
  stringles: "Stringless",
  redhorn: "Redhorn Stonethresher",
  athousandfloatingdream: "A Thousand Floating Dreams",
  athousandblazingsun: "A Thousand Blazing Suns",
  keyofkhajnisut: "Key of Khaj-Nisut",
  splendor: "Splendor of Tranquil Waters",
  calamity: "Calamity Queller",
  everlasting: "Everlasting Moonglow",
  crimsonmoon: "Crimson Moon's Semblance",
  beacon: "Beacon of the Reed Sea",
  engulfing: "Engulfing Lightning",
  dragonbane: "Dragon's Bane",
  polarstar: "Polar Star",
  thunderingpulse: "Thundering Pulse",
  aquasimulacra: "Aqua Simulacra",
  elegy: "Elegy for the End",
  freedomsworn: "Freedom-Sworn",
};

const buildIndex = (names) => {
  const map = new Map();
  for (const name of names) {
    map.set(normalize(name), { name, slug: slugify(name) });
  }
  return map;
};

// Alias keys are normalised with the same function as the data, so hand-written
// short forms stay in sync with the matching algorithm.
const ALIAS_INDEX = new Map(
  Object.entries(ALIASES).map(([key, canonical]) => [normalize(key), canonical])
);

const WEAPON_NAMES = weaponGroups.flatMap((g) => g.weapons.map((w) => w.name));
const ARTIFACT_NAMES = artifactSets.map((a) => a.name);

const WEAPON_INDEX = buildIndex(WEAPON_NAMES);
const ARTIFACT_INDEX = buildIndex(ARTIFACT_NAMES);

// Strip parenthetical notes ("(R5)", "(craftable)", "(4pc)") and piece-count
// prefixes ("2pc VV") so the remainder can be matched.
const cleanSegment = (raw) =>
  raw
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d\s*pc\b/gi, " ")
    .replace(/\bR\d\b/g, " ")
    .replace(/\b(craftable|fishable|BP|battle\s*pass|pure\s*shield|if\s+hybrid|support|high\s+base\s+ATK|EM)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const resolve = (index, raw) => {
  const cleaned = cleanSegment(raw);
  if (!cleaned) return null;
  const key = normalize(cleaned);
  if (!key) return null;

  if (index.has(key)) return index.get(key);

  const aliased = ALIAS_INDEX.get(key);
  if (aliased) {
    const aliasKey = normalize(aliased);
    if (index.has(aliasKey)) return index.get(aliasKey);
  }

  // Prefix match, e.g. "Thrilling Tales" -> "Thrilling Tales of Dragon Slayers".
  // Both sides are length-guarded so short tokens cannot mis-target.
  if (key.length >= 6) {
    for (const [candidateKey, value] of index) {
      if (candidateKey.startsWith(key)) return value;
      if (candidateKey.length >= 6 && key.startsWith(candidateKey)) return value;
    }
  }
  return null;
};

// Split prose into display segments on "/", "+" and " or ".
// Commas are NOT separators: they occur inside parenthetical notes such as
// "The Catch (R5, fishable)" and splitting on them shreds the segment.
// A lookahead additionally splits run-on piece counts like "2pc VV 2pc ATK",
// while the lookbehind keeps parenthetical counts such as "(4pc)" intact.
const splitSegments = (text) =>
  String(text || "")
    .split(/\s*\/\s*|\s*\+(?!\))\s*|\s+or\s+|(?<!\()(?=\d\s*pc\b)/i)
    .map((s) => s.trim().replace(/^[,;]\s*/, ""))
    .filter(Boolean);

const linkify = (index, text) =>
  splitSegments(text).map((segment) => {
    const hit = resolve(index, segment);
    return { text: segment, slug: hit ? hit.slug : null, canonical: hit ? hit.name : null };
  });

/** Resolve a weapon recommendation string into [{ text, slug, canonical }]. */
export const linkWeapons = (text) => linkify(WEAPON_INDEX, text);

/** Resolve an artifact recommendation string into [{ text, slug, canonical }]. */
export const linkArtifacts = (text) => linkify(ARTIFACT_INDEX, text);

/** Base path for each kind, used by templates when building hrefs. */
export const WEAPON_BASE = "/weapon/";
export const ARTIFACT_BASE = "/artifact/";
