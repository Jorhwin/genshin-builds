const fs=require("fs");
const base="D:/GAME/Game web 1000plus AI/genshin-builds";
for(const f of ["character","build","team"]){
  let c=fs.readFileSync(base+"/src/pages/"+f+"/[slug].astro","utf-8");
  c=c.replace('<BaseLayout title={title} description={description}>','<BaseLayout title={title} description={description}>\n  <script type="application/ld+json" set:html={jsonld}></script>');
  fs.writeFileSync(base+"/src/pages/"+f+"/[slug].astro",c,"utf-8");
  console.log(f+": script added");
}