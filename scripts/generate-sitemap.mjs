import { characters } from "../src/data/characters.js";
import { writeFileSync } from "fs";

const pages = [{ loc: "/", priority: "1.0" }];
for (const c of characters) {
  pages.push({ loc: `/character/${c.slug}/`, priority: "0.9" });
  pages.push({ loc: `/build/${c.slug}/`, priority: "0.8" });
  pages.push({ loc: `/team/${c.slug}/`, priority: "0.7" });
}

const site = "https://gameup.lol";
const urls = pages.map(
  (p) => `  <url>
    <loc>${site}${p.loc}</loc>
    <priority>${p.priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

writeFileSync("./dist/sitemap.xml", xml, "utf-8");
console.log("sitemap.xml generated with " + pages.length + " URLs");
