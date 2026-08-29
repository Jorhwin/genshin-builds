import { characters } from "../src/data/characters.js";
import { comparisons } from "../src/data/comparisons.js";
import { analyses } from "../src/data/analyses.js";
import { guides } from "../src/data/guides.js";
import { bestLists } from "../src/data/best-lists.js";
import { weaponGroups } from "../src/data/gear.js";
import { artifactSets } from "../src/data/gear.js";
import { elements } from "../src/data/elements.js";
import { extendedGuides } from "../src/data/extended-guides.js";
import { writeFileSync, mkdirSync } from "fs";

const site = "https://gameup.lol";
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/characters/", priority: "0.9", changefreq: "weekly" },
  { loc: "/builds/", priority: "0.9", changefreq: "weekly" },
  { loc: "/teams/", priority: "0.9", changefreq: "weekly" },
  { loc: "/comparisons/", priority: "0.9", changefreq: "weekly" },
  { loc: "/guides/", priority: "0.8", changefreq: "weekly" },
  { loc: "/best/", priority: "0.9", changefreq: "weekly" },
  { loc: "/weapons/", priority: "0.8", changefreq: "monthly" },
  { loc: "/artifacts/", priority: "0.8", changefreq: "monthly" },
  { loc: "/element/", priority: "0.8", changefreq: "monthly" },
  { loc: "/changelog/", priority: "0.6", changefreq: "monthly" },
];

for (const c of characters) {
  if (!c || !c.slug) continue;
  // Thin pages (no in-depth content yet) are excluded from the sitemap and set to noindex
  const hasDepth = !!(extendedGuides && extendedGuides[c.slug]);
  pages.push({ loc: `/character/${c.slug}/`, priority: "0.8", changefreq: "weekly" });
  if (hasDepth) {
    pages.push({ loc: `/build/${c.slug}/`, priority: "0.8", changefreq: "weekly" });
    pages.push({ loc: `/team/${c.slug}/`, priority: "0.7", changefreq: "weekly" });
  }
}
for (const comp of comparisons) {
  if (!comp || !comp.slug) continue;
  pages.push({ loc: `/comparison/${comp.slug}/`, priority: "0.8", changefreq: "monthly" });
}
for (const a of analyses) {
  if (!a || !a.slug) continue;
  pages.push({ loc: `/analysis/${a.slug}/`, priority: "0.7", changefreq: "monthly" });
}
for (const g of guides) {
  if (!g || !g.slug) continue;
  pages.push({ loc: `/guide/${g.slug}/`, priority: "0.7", changefreq: "monthly" });
}
for (const b of bestLists) {
  if (!b || !b.slug) continue;
  pages.push({ loc: `/best/${b.slug}/`, priority: "0.9", changefreq: "weekly" });
}
const slugifyWeapon = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
for (const g of weaponGroups) {
  for (const w of g.weapons) {
    pages.push({ loc: `/weapon/${slugifyWeapon(w.name)}/`, priority: "0.7", changefreq: "monthly" });
  }
}
for (const a of artifactSets) {
  pages.push({ loc: `/artifact/${slugifyWeapon(a.name)}/`, priority: "0.7", changefreq: "monthly" });
}
for (const e of elements) {
  pages.push({ loc: `/element/${e.slug}/`, priority: "0.8", changefreq: "monthly" });
}

const urls = pages
  .map(
    (p) =>
      `  <url>\n    <loc>${site}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync("./public/sitemap.xml", xml, "utf-8");
try {
  mkdirSync("./dist", { recursive: true });
  writeFileSync("./dist/sitemap.xml", xml, "utf-8");
} catch (e) {
  // dist may not exist yet; public/sitemap.xml is enough
}
console.log("sitemap.xml generated with " + pages.length + " URLs - domain: " + site);
