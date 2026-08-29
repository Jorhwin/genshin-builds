#!/usr/bin/env node
/**
 * Dry-run every generated title/description and report length distribution.
 * Run before touching templates so truncation problems surface here, not in the SERP.
 *
 *   node scripts/check-meta.mjs [--sample 12] [--verbose]
 */
import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (f) => new URL(`file:///${resolve(root, f).replace(/\\/g, "/")}`).href;

const { characters } = await import(p("src/data/characters.js"));
const { weaponGroups, artifactSets } = await import(p("src/data/gear.js"));
const { elements } = await import(p("src/data/elements.js"));
const seo = await import(p("src/lib/seo.mjs"));

const allWeapons = weaponGroups.flatMap((g) => g.weapons.map((w) => ({ ...w, type: g.type })));

const rows = [];
const add = (type, url, title, description) => rows.push({ type, url, title, description });

for (const c of characters) {
  add("character", `/character/${c.slug}/`, seo.characterTitle(c), seo.characterDescription(c));
  add("build", `/build/${c.slug}/`, seo.buildTitle(c), seo.buildDescription(c));
  add("team", `/team/${c.slug}/`, seo.teamTitle(c), seo.teamDescription(c));
}
for (const w of allWeapons) {
  add("weapon", `/weapon/${seo.cap(w.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), 999)}/`, seo.weaponTitle(w), seo.weaponDescription(w));
}
for (const a of artifactSets) {
  add("artifact", `/artifact/x/`, seo.artifactTitle(a), seo.artifactDescription(a));
}
for (const e of elements) {
  add("element", `/element/${e.slug}/`, seo.elementTitle(e), seo.elementDescription(e));
}

const over = rows.filter((r) => r.title.length > seo.TITLE_MAX || r.description.length > seo.DESC_MAX);
const lens = (k) => rows.map((r) => r[k].length).sort((a, b) => a - b);
const pct = (arr, q) => arr[Math.floor(arr.length * q)];

console.log(`\n生成 ${rows.length} 条 meta`);
for (const k of ["title", "description"]) {
  const L = lens(k);
  console.log(`  ${k.padEnd(12)} min ${L[0]}  p50 ${pct(L, 0.5)}  p90 ${pct(L, 0.9)}  max ${L[L.length - 1]}  (cap ${k === "title" ? seo.TITLE_MAX : seo.DESC_MAX})`);
}
console.log(`  超限: ${over.length}`);

// Flag cookie-cutter output: if many pages share an identical title structure
// after stripping the entity name, the template is still too rigid.
const shape = new Map();
for (const r of rows) {
  const key = r.type;
  shape.set(key, (shape.get(key) || 0) + 1);
}
console.log(`\n按类型: ${[...shape].map(([k, v]) => `${k}=${v}`).join("  ")}`);

if (process.argv.includes("--verbose")) {
  const sample = Number(process.argv[process.argv.indexOf("--sample") + 1]) || 12;
  console.log("\n--- 抽样 ---");
  const step = Math.max(1, Math.floor(rows.length / sample));
  for (let i = 0; i < rows.length; i += step) {
    const r = rows[i];
    console.log(`\n[${r.type}] ${r.url}`);
    console.log(`  T(${r.title.length}): ${r.title}`);
    console.log(`  D(${r.description.length}): ${r.description}`);
  }
}

if (over.length) {
  console.log("\n超限条目:");
  over.slice(0, 20).forEach((r) => console.log(`  [${r.type}] ${r.url} T=${r.title.length} D=${r.description.length}`));
  process.exit(1);
}
