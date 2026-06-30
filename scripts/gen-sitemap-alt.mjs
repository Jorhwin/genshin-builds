import { characters } from "../src/data/characters.js";
import { comparisons } from "../src/data/comparisons.js";
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

const site = "https://gameup.lol";
const urls = pages.map(
  (p) => `  <url>\n    <loc>${site}${p.loc}</loc>\n    <priority>${p.priority}</priority>\n  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

writeFileSync("./dist/sitemap_index.xml", xml, "utf-8");
console.log("sitemap_index.xml generated with " + pages.length + " URLs - domain: " + site);