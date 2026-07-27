const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

for (const file of ["character", "build", "team"]) {
  let content = fs.readFileSync(base + "/src/pages/" + file + "/[slug].astro", "utf-8");
  // Add jsonld declaration AFTER the description line
  content = content.replace(
    'const description =',
    'const description ='
  );
  // Actually, find the end of the description line. The line ends with ".includes."
  // Wait, I don't know the exact line. Let me search for a pattern.
  // The description is the SECOND const after title.
  // I'll add jsonld AFTER the first const declaration after title.
  // Find "const description" and the next ";"
  const descIdx = content.indexOf("const description");
  if (descIdx >= 0) {
    const semiIdx = content.indexOf(";", descIdx);
    if (semiIdx >= 0) {
      const afterSemi = content.substring(semiIdx + 1);
      const insert = content.substring(0, semiIdx + 1) + 
        "\nconst jsonld = JSON.stringify({\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":title,\"description\":description,\"about\":{\"@type\":\"Thing\",\"name\":c.name}});" +
        afterSemi;
      fs.writeFileSync(base + "/src/pages/" + file + "/[slug].astro", insert, "utf-8");
      console.log(file + ": jsonld added after description");
    }
  }
}