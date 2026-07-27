const fs=require("fs");
const c=fs.readFileSync("D:/GAME/Game web 1000plus AI/genshin-builds/src/data/characters.js","utf-8");
const nc=JSON.parse(fs.readFileSync("D:/GAME/Game web 1000plus AI/genshin-builds/scripts/new-chars.json","utf-8"));
const idx=c.lastIndexOf("];");
let ins="";
const keys=["slug","name","role","element","weapon","tier","bestWeapon","f2pWeapon","bestArtifacts","mainStats","subStats","talentPriority","teamRole","strongTeam","f2pTeam","description","rotation","rating"];
for(const n of nc){ins+=",\n  {\n";for(let i=0;i<keys.length;i++){ins+="    "+keys[i]+": "+JSON.stringify(n[i])+",\n";}ins+="  }";}
fs.writeFileSync("D:/GAME/Game web 1000plus AI/genshin-builds/src/data/characters.js",c.substring(0,idx)+ins+"\n];","utf-8");
console.log("Done: "+nc.length);