import { characters } from "../src/data/characters.js";
import { comparisons } from "../src/data/comparisons.js";
import { analyses } from "../src/data/analyses.js";
import { guides } from "../src/data/guides.js";
import { writeFileSync } from "fs";

const pages = [{ loc: "/", priority: "1.0" }];
for (const c of characters) {
  pages.push({ loc: `/character/${c.slug}/`, priority: "0.9" });
  pages.push({ loc: `/build/${c.slug}/`, priority: "0.8" });
  pages.push({ loc: `/team/${c.slug}/`, priority: "0.7" });
}
for (const comp of comparisons) {
  pages.push({ loc: `/comparison/${comp.slug}/`, priority: "0.8" });
}
for (const a of analyses) {
  pages.push({ loc: `/analysis/${a.slug}/`, priority: "0.7" });
}
for (const g of guides) {
  pages.push({ loc: `/guide/${g.slug}/`, priority: "0.7" });
}

const site = "https://gameup.lol";
const urls = pages.map(
  (p) => `  <url>\n    <loc>${site}${p.loc}</loc>\n    <priority>${p.priority}</priority>\n  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

writeFileSync("./dist/sitemap.xml", xml, "utf-8");
console.log("sitemap.xml generated with " + pages.length + " URLs - domain: " + site);