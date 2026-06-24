const fs = require("fs");
const base = "D:\\GAME\\Game web 1000plus AI\\genshin-builds";

// Read the existing character template
let charPage = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");

// Add insights import
charPage = charPage.replace(
  'import { characters } from "../../data/characters";',
  'import { characters } from "../../data/characters";\nimport { coreInsights } from "../../data/insights";'
);

// Replace the old insight area
const oldInsight = '<div class="insight-box">\n    <h3>⚡ Why This Build Works</h3>\n    <p>{c.description}...</p>\n  </div>';

charPage = charPage.replace(
  '<p>{c.description}</p>',
  '<p>{c.description}</p>\n\n  {coreInsights[c.slug] && (\n    <div class="insight-box">\n      <h3>⚡ Why This Build Works</h3>\n      <p>{coreInsights[c.slug].whyItWorks}</p>\n      <h3>Key Stat Threshold</h3>\n      <p>{coreInsights[c.slug].keyThreshold}</p>\n      <h3>Current Meta Status</h3>\n      <p>{coreInsights[c.slug].metaStatus}</p>\n    </div>\n  )}'
);

fs.writeFileSync(base + "/src/pages/character/[slug].astro", charPage, "utf-8");
console.log("1/3 Character template updated");

// Create analysis dir and template
const analysisDir = base + "/src/pages/analysis";
if (!fs.existsSync(analysisDir)) fs.mkdirSync(analysisDir, { recursive: true });

const analysisContent = ---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { analyses } from "../../data/analyses";

export function getStaticPaths() {
  return analyses.map((a) => ({
    params: { slug: a.slug },
    props: { analysis: a },
  }));
}

const { analysis: a } = Astro.props;
const title = a.title;
const desc = a.seoDesc;
---

<BaseLayout title={title} description={desc}>
  <p><span class="tag tag-S" style="background: #6080ff33; color: #6080ff; border: 1px solid rgba(96,128,255,0.2);">Build Analysis</span></p>
  <h1>{a.title}</h1>
  <p class="subtitle">{a.summary}</p>

  {a.sections ? (
    a.sections.map((s) => (
      <>
        <h2>{s.title}</h2>
        <p>{s.content}</p>
      </>
    ))
  ) : (
    <>
      <h2>{a.buildA.name} vs {a.buildB.name}</h2>
      <div class="card">
        <h3>{a.buildA.name}</h3>
        <p><strong>Team:</strong> {a.buildA.chars}</p>
        <p>{a.buildA.playstyle}</p>
        <p><strong>Pros:</strong></p>
        <ul>{a.buildA.pros.map((p) => <li>{p}</li>)}</ul>
        <p><strong>Cons:</strong></p>
        <ul>{a.buildA.cons.map((c) => <li>{c}</li>)}</ul>
        <p><strong>Rotation:</strong> {a.buildA.rotation}</p>
      </div>
      <div class="card" style="margin-top: 12px;">
        <h3>{a.buildB.name}</h3>
        <p><strong>Team:</strong> {a.buildB.chars}</p>
        <p>{a.buildB.playstyle}</p>
        <p><strong>Pros:</strong></p>
        <ul>{a.buildB.pros.map((p) => <li>{p}</li>)}</ul>
        <p><strong>Cons:</strong></p>
        <ul>{a.buildB.cons.map((c) => <li>{c}</li>)}</ul>
        <p><strong>Rotation:</strong> {a.buildB.rotation}</p>
      </div>
    </>
  )}

  {a.mainStats && <p><strong>Main Stats:</strong> {a.mainStats}</p>}
  {a.weapon && <p><strong>Weapon:</strong> {a.weapon}</p>}

  <div class="insight-box" style="margin-top: 28px;">
    <h3>Verdict</h3>
    <p>{a.verdict}</p>
  </div>
</BaseLayout>
;
fs.writeFileSync(analysisDir + "/[slug].astro", analysisContent, "utf-8");
console.log("2/3 Analysis template created");

// Create guide dir and template
const guideDir = base + "/src/pages/guide";
if (!fs.existsSync(guideDir)) fs.mkdirSync(guideDir, { recursive: true });

const guideContent = ---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { guides } from "../../data/guides";

export function getStaticPaths() {
  return guides.map((g) => ({
    params: { slug: g.slug },
    props: { guide: g },
  }));
}

const { guide: g } = Astro.props;
const title = g.title;
const desc = g.seoDesc;
---

<BaseLayout title={title} description={desc}>
  <p><span class="tag tag-S" style="background: #40a06033; color: #40c060; border: 1px solid rgba(64,192,96,0.2);">Game Mechanic Guide</span></p>
  <h1>{g.title}</h1>
  <p class="subtitle">{g.summary}</p>

  {g.categories.map((cat) => (
    <>
      <h2>{cat.title}</h2>
      <p>{cat.content}</p>
    </>
  ))}
</BaseLayout>
;
fs.writeFileSync(guideDir + "/[slug].astro", guideContent, "utf-8");
console.log("3/3 Guide template created");
console.log("All templates done!");