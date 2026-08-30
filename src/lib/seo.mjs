/**
 * Centralized meta generation.
 *
 * Why this exists:
 * 1. Titles/descriptions were previously string-concatenated inline in each
 *    template, so every one of the 95 character pages ended up with an
 *    identical sentence structure. Identical structures don't get picked apart
 *    by Google, and they give a human scanning the SERP no reason to click ours.
 * 2. /character/{x}/ and /build/{x}/ were both chasing "{x} build". That is
 *    keyword cannibalization -- two of our own pages splitting the votes for one
 *    query. They now target different intents on purpose:
 *      /character/{x}/  -> "{x} build"          (overview: gear + teams + rotation)
 *      /build/{x}/      -> "{x} best weapon"    (gear ranking deep-dive)
 *      /team/{x}/       -> "{x} best team"      (comps + F2P)
 * 3. Character names range from 6 chars (Hu Tao) to 18 (Tartaglia (Childe)), so a
 *    single title pattern cannot fit all of them. Each generator tries richer
 *    patterns first and falls back to leaner ones -- see firstFit(). Guessing the
 *    pattern from `name.length` was tried first and produced titles truncated
 *    mid-phrase, e.g. "Raiden Shogun Build 2026 ... Best Weapons &".
 *
 * Hard limits: title <= 65 chars, description <= 155 chars. Google truncates
 * around 580px for titles and ~155 chars for descriptions.
 */

const TITLE_MAX = 65;
const DESC_MAX = 155;

// Words that must never be the last thing a reader sees.
const DANGLING = /[\s,;:|&—–\-]+$|(\s(and|or|the|a|an|of|for|with|to|in|&))+$/i;

/** Trim on a word boundary without leaving a dangling connector. */
export function cap(s, max) {
  s = String(s || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  let cut = s.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  if (sp > max * 0.6) cut = cut.slice(0, sp);
  cut = cut.replace(DANGLING, "").trim();
  return cut;
}

/** Pick the first candidate that fits without being cut. Last one always wins. */
function firstFit(candidates, max) {
  for (const c of candidates) {
    const s = String(c).replace(/\s+/g, " ").trim();
    if (s.length <= max) return s;
  }
  return cap(candidates[candidates.length - 1], max);
}

/**
 * "Support / Healer" -> "Support"; "Anemo Support" (element already present)
 * -> returned as-is so we never emit "Anemo Anemo Support".
 */
export function roleLabel(c) {
  let role = String(c.role || "").split("/")[0].trim();
  const el = String(c.element || "");
  if (!role) return el;
  if (el && role.toLowerCase().includes(el.toLowerCase())) return role;
  return el ? `${el} ${role}` : role;
}

/** First clean phrase out of a data string: stops at em-dash or parenthesis. */
export function shortPhrase(s, n = 60) {
  return String(s || "").split(/[—(]/)[0].trim().slice(0, n).trim();
}

/**
 * Correct a/an for whatever word FOLLOWS the article.
 *
 * Two different rules, because tiers are single letters and roles are words:
 *   - single letters are spoken by their letter name, so the ones with a vowel
 *     sound (S, A, F, H, I, L, M, N, O, R, X) take "an";
 *   - ordinary words just go by their first letter.
 *
 * Getting this wrong produces "an Tier S" and "a Electro Sub-DPS", both of
 * which read as machine-generated to a native speaker.
 */
export function article(word) {
  const w = String(word || "").trim();
  if (!w) return "a";
  if (w.length === 1) return /^[SAEFHILMNORX]$/i.test(w) ? "an" : "a";
  return /^[aeiou]/i.test(w) ? "an" : "a";
}

/**
 * Ratings are stored as "9.5/10 — one of the best units in the game". The
 * commentary reads fine on a card but breaks mid-sentence in prose, so pull
 * just the score when embedding it in a sentence.
 */
export function score(rating) {
  return String(rating || "").split(/[—–]/)[0].trim();
}

/* ------------------------------------------------------------- characters */

export function characterTitle(c) {
  const r = roleLabel(c);
  return firstFit(
    [
      `${c.name} Build 2026 — ${r}: Weapons, Artifacts & Teams`,
      `${c.name} Build 2026 — ${r}: Weapons & Artifacts`,
      `${c.name} Build 2026 — ${r} Guide`,
      `${c.name} Build 2026 — Best Weapons, Artifacts & Teams`,
      `${c.name} Build 2026 — Best Weapons & Artifacts`,
    ],
    TITLE_MAX
  );
}

export function characterDescription(c) {
  // Labeled fields ("Weapon:", "Artifacts:") so Google can bold the term the
  // searcher actually typed, e.g. "hu tao best weapon".
  return cap(
    `Best ${c.name} build for 2026 — Tier ${c.tier} ${roleLabel(c)}. ` +
      `Weapon: ${c.bestWeapon}. Artifacts: ${c.bestArtifacts}. ` +
      `F2P option, best teams, main stats & rotation.`,
    DESC_MAX
  );
}

/* ------------------------------------------------------------------ builds */
// Deliberately NOT "{x} build" -- see the cannibalization note at the top.

export function buildTitle(c) {
  const r = roleLabel(c);
  return firstFit(
    [
      `${c.name} Best Weapon & Artifacts 2026 — ${r} Ranking`,
      `${c.name} Best Weapon & Artifacts 2026 — Gear Ranking`,
      `${c.name} Best Weapon & Artifacts 2026`,
    ],
    TITLE_MAX
  );
}

export function buildDescription(c) {
  return cap(
    `Best ${c.name} weapon is ${c.bestWeapon}. Best artifacts: ${c.bestArtifacts}. ` +
      `Full gear ranking with F2P options, main stats, substat priority & talent order.`,
    DESC_MAX
  );
}

/* ------------------------------------------------------------------- teams */

export function teamTitle(c) {
  const r = roleLabel(c);
  return firstFit(
    [
      `${c.name} Best Teams 2026 — ${r} Comps & F2P Options`,
      `${c.name} Best Teams 2026 — Top Comps & F2P Options`,
      `${c.name} Best Teams 2026`,
    ],
    TITLE_MAX
  );
}

export function teamDescription(c) {
  const best = shortPhrase(c.strongTeam, 55);
  // The team roster is the most fragile part (it can be a long character list),
  // so it is the first thing dropped when the description runs out of room --
  // better to omit it than to print "Bennett +".
  return firstFit(
    [
      `Best ${c.name} teams for 2026 — ${roleLabel(c)} comps, F2P options, rotations & slot replacements.` +
        (best ? ` Strongest: ${best}.` : ""),
      `Best ${c.name} teams for 2026 — ${roleLabel(c)} comps, F2P options, rotations & slot replacements.`,
      `Best ${c.name} teams for 2026 — top comps, F2P options, rotations & slot replacements.`,
    ],
    DESC_MAX
  );
}

/* ----------------------------------------------------------------- weapons */

export function weaponTitle(w) {
  return firstFit(
    [
      `${w.name} Review 2026 — Best Characters & Worth Pulling?`,
      `${w.name} Review 2026 — Best Characters`,
      `${w.name} — Best Characters (2026)`,
    ],
    TITLE_MAX
  );
}

export function weaponDescription(w) {
  // `why` is the real differentiator (it explains the passive), so it leads and
  // the generic tail is what gets cut when we run long. A "Worth pulling?" hook
  // is appended only when it fits, so we never truncate the "Best on" signal.
  const base = `${w.name} (${w.rarity} ${String(w.type || "").toLowerCase()}): ${w.why} Best on: ${w.bestFor}.`;
  const hook = ` Is ${w.name} worth pulling in 2026?`;
  return cap(base + (base.length + hook.length <= DESC_MAX ? hook : ""), DESC_MAX);
}

/* --------------------------------------------------------------- artifacts */

export function artifactTitle(set) {
  return firstFit(
    [
      `${set.name}: Best Characters & Worth Farming? (2026)`,
      `${set.name}: Best Characters (2026)`,
      `${set.name} — Best Characters`,
    ],
    TITLE_MAX
  );
}

export function artifactDescription(set) {
  // Lead with the caveat -- "when NOT to farm this" is the part competitors
  // omit, and it is the reason someone clicks a farming guide. A "Worth farming?"
  // hook is appended only when it fits, so the "Skip it if" caveat survives.
  const parts = [`${set.name} — ${set.why} Best on: ${set.bestFor}.`];
  if (set.caveat) parts.push(`Skip it if: ${set.caveat}`);
  let base = parts.join(" ");
  const hook = ` Is ${set.name} worth farming in 2026?`;
  return cap(base + (base.length + hook.length <= DESC_MAX ? hook : ""), DESC_MAX);
}

/* ---------------------------------------------------------------- elements */

export function elementTitle(el) {
  return firstFit(
    [
      `Best ${el.name} Characters in Genshin 2026 — Teams & Reactions`,
      `Best ${el.name} Characters 2026 — Teams & Reactions`,
      `Best ${el.name} Characters (2026)`,
    ],
    TITLE_MAX
  );
}

export function elementDescription(el) {
  // reactions is [{ name, with, effect }] -- map to names before joining.
  const rx = (el.reactions || []).map((r) => (typeof r === "string" ? r : r?.name)).filter(Boolean);
  const parts = [`Best ${el.name} characters in Genshin Impact, ranked for 2026.`];
  if (rx.length) parts.push(`Core reactions: ${rx.slice(0, 3).join(", ")}.`);
  parts.push(`Best teams, builds and who is worth your primogems.`);
  return cap(parts.join(" "), DESC_MAX);
}

/* ------------------------------------------------------------ comparisons */

/**
 * Comparison <title> in question form. Questions pull a higher CTR than
 * declarative "X vs Y: Best Z Comparison" lines because they echo the searcher's
 * own mental query. The 2026 suffix keeps the freshness signal.
 */
export function comparisonTitle(c) {
  return firstFit(
    [
      `${c.nameA} vs ${c.nameB}: Which Should You Build? (2026)`,
      `${c.nameA} vs ${c.nameB}: Which Should You Build?`,
    ],
    TITLE_MAX
  );
}

/* ------------------------------------------------------------------- best */

/**
 * Best-list <title> leads with the entry count — "{n} Best X" reads as a
 * concrete, scannable resource and out-CTRs a bare "Best X Tier List".
 */
export function bestTitle(list) {
  const n = (list.items || []).length;
  const base = String(list.title || "").split("—")[0].trim();
  const withCount = base.replace(/^Best\s+(.+)$/i, `Best ${n} $1`);
  const candidate = withCount || base;
  return firstFit([candidate], TITLE_MAX) || cap(candidate, TITLE_MAX);
}

/* --------------------------------------------------------------- utilities */

/**
 * "Updated <Month Year>" evaluated at build time.
 *
 * The old templates hardcoded "Version 5.x", which silently rotted. Deriving it
 * from the build date means every deployment refreshes the freshness signal
 * without anyone remembering to edit a string.
 */
export function updatedLabel() {
  return `Updated ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}`;
}

/** Used by scripts/check-meta.mjs. */
export function auditMeta(list) {
  return list.filter((m) => m.title.length > TITLE_MAX || m.description.length > DESC_MAX);
}

export { TITLE_MAX, DESC_MAX };
