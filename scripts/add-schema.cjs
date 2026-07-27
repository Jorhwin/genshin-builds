const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// 1. Add JSON-LD schema to character pages
let char = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");
char = char.replace("const description =", 'const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name},"dateModified":"2026-07-27"});\nconst description =');
char = char.replace("<BaseLayout title={title} description={description}>", "<BaseLayout title={title} description={description}>\n  <script type=\"application/ld+json\" set:html={jsonld}></script>");
fs.writeFileSync(base + "/src/pages/character/[slug].astro", char, "utf-8");
console.log("Character: JSON-LD added");

// 2. Add JSON-LD to build pages
let build = fs.readFileSync(base + "/src/pages/build/[slug].astro", "utf-8");
build = build.replace("const description =", 'const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name},"dateModified":"2026-07-27"});\nconst description =');
build = build.replace("<BaseLayout title={title} description={description}>", "<BaseLayout title={title} description={description}>\n  <script type=\"application/ld+json\" set:html={jsonld}></script>");
fs.writeFileSync(base + "/src/pages/build/[slug].astro", build, "utf-8");
console.log("Build: JSON-LD added");

// 3. Add JSON-LD to team pages
let team = fs.readFileSync(base + "/src/pages/team/[slug].astro", "utf-8");
team = team.replace("const description =", 'const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name},"dateModified":"2026-07-27"});\nconst description =');
team = team.replace("<BaseLayout title={title} description={description}>", "<BaseLayout title={title} description={description}>\n  <script type=\"application/ld+json\" set:html={jsonld}></script>");
fs.writeFileSync(base + "/src/pages/team/[slug].astro", team, "utf-8");
console.log("Team: JSON-LD added");

console.log("All structured data added!");