const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// ========== CHARACTER 模板：加 FAQ + FAQPage schema ==========
// 读取当前模板，在 </BaseLayout> 前插入 FAQ 区块，并修改 frontmatter 加 faq
let charTemplate = fs.readFileSync(base + "/src/pages/character/[slug].astro", "utf-8");

// 在 frontmatter 中 jsonld 定义后加 faq 定义
const faqDef = `
const faq = [
  {
    q: "What is the best build for " + c.name + "?",
    a: "The best " + c.name + " build uses " + c.bestWeapon + " with " + c.bestArtifacts + ". Main stats: " + c.mainStats + ". This setup maximizes their damage and keeps their rotation smooth."
  },
  {
    q: "Is " + c.name + " good in the current meta?",
    a: c.rating + " " + c.name + " is a " + c.role + " that works well in " + c.strongTeam + ". They remain a strong pick in current abyss rotations."
  },
  {
    q: "What is the best F2P weapon for " + c.name + "?",
    a: "The best free-to-play weapon for " + c.name + " is " + c.f2pWeapon + ". It provides competitive damage without requiring the weapon banner, making it a great budget option."
  },
  {
    q: "What is the recommended rotation for " + c.name + "?",
    a: "The recommended rotation is: " + c.rotation + ". Practicing this order ensures " + c.name + " snapshots buffs and maximizes their damage window."
  }
];
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
});`;

// 在 jsonld 定义后插入
charTemplate = charTemplate.replace(
  'const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name}});',
  'const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name}});' + faqDef
);

// 在第二个 script 标签后加 FAQ script
charTemplate = charTemplate.replace(
  '<script type="application/ld+json" set:html={jsonld}></script>',
  '<script type="application/ld+json" set:html={jsonld}></script>\n  <script type="application/ld+json" set:html={faqJsonLd}></script>'
);

// 在 </BaseLayout> 前插入 FAQ 区块
const faqSection = `
  <h2>Frequently Asked Questions</h2>
  {faq.map((f) => (
    <div class="card" style="margin: 12px 0; padding: 14px 18px;">
      <h3 style="margin-bottom: 6px; font-size: 1rem; color: var(--text-primary);">{f.q}</h3>
      <p style="margin: 0;">{f.a}</p>
    </div>
  ))}

`;

charTemplate = charTemplate.replace('  <div class="internal-links">', faqSection + '  <div class="internal-links">');

fs.writeFileSync(base + "/src/pages/character/[slug].astro", charTemplate, "utf-8");
console.log("Character 模板已增强: " + charTemplate.length + " bytes");

// ========== COMPARISON 模板：加"如何选择"段落 + FAQ ==========
let compTemplate = fs.readFileSync(base + "/src/pages/comparison/[slug].astro", "utf-8");

// 在 verdict 后加 FAQ
const compFaqSection = `
  <h2>Which One Should You Choose?</h2>
  <div class="card" style="margin: 16px 0;">
    <p>{c.verdict}</p>
    <p style="margin-top: 10px;">Consider your account when deciding. Look at the weapons and artifacts you already own, the teams you already have built, and the content you struggle with most. Both {c.nameA} and {c.nameB} are strong — the right choice depends on which fills a bigger gap in your roster.</p>
  </div>

  <h2>Frequently Asked Questions</h2>
  <div class="card" style="margin: 12px 0; padding: 14px 18px;">
    <h3 style="margin-bottom: 6px; font-size: 1rem; color: var(--text-primary);">Is {c.nameA} or {c.nameB} better?</h3>
    <p style="margin: 0;">There is no universal answer — {c.nameA} wins in {c.categories.map(cat => cat.name).join(" and ").replace(/,([^,]*)$/, " and$1")} scenarios where their kit shines, while {c.nameB} is stronger in others. Use the comparison tables above to match each character's strengths to your specific needs.</p>
  </div>
  <div class="card" style="margin: 12px 0; padding: 14px 18px;">
    <h3 style="margin-bottom: 6px; font-size: 1rem; color: var(--text-primary);">Which one is better for F2P players?</h3>
    <p style="margin: 0;">Both characters are viable at C0 with their F2P weapon options. Check each character's dedicated guide for the best budget builds and teams to see which one fits your account's current roster.</p>
  </div>

`;

// 在 internal-links 前插入
compTemplate = compTemplate.replace('  <div class="internal-links">', compFaqSection + '  <div class="internal-links">');

// 加 FAQPage schema - 在 frontmatter 定义 jsonld
compTemplate = compTemplate.replace(
  'const description = c.seoDesc;',
  `const description = c.seoDesc;
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is " + c.nameA + " or " + c.nameB + " better?",
      acceptedAnswer: { "@type": "Answer", text: c.verdict }
    }
  ]
});`
);

// 在 BaseLayout 后加 FAQ script
compTemplate = compTemplate.replace(
  '<BaseLayout title={title} description={description}>',
  '<BaseLayout title={title} description={description}>\n  <script type="application/ld+json" set:html={faqJsonLd}></script>'
);

fs.writeFileSync(base + "/src/pages/comparison/[slug].astro", compTemplate, "utf-8");
console.log("Comparison 模板已增强: " + compTemplate.length + " bytes");

// ========== GUIDE 模板：加内部链接 + FAQ ==========
let guideTemplate = fs.readFileSync(base + "/src/pages/guide/[slug].astro", "utf-8");

// 在 </BaseLayout> 前加相关攻略链接
const guideSection = `
  <div class="card" style="margin: 20px 0;">
    <h3>Related Character Builds</h3>
    <p style="margin-bottom: 8px;">Put this mechanic to use with our character build guides:</p>
    <ul>
      <li><a href="/character/raiden-shogun/">Raiden Shogun Build Guide</a></li>
      <li><a href="/character/hu-tao/">Hu Tao Build Guide</a></li>
      <li><a href="/character/neuvillette/">Neuvillette Build Guide</a></li>
      <li><a href="/character/nahida/">Nahida Build Guide</a></li>
    </ul>
  </div>
  <div class="internal-links">
    <h3>Explore More Guides</h3>
    <a href="/">🏠 All Character Builds</a>
    <a href="/comparison/raiden-vs-yae/">⚡ Raiden vs Yae Comparison</a>
    <a href="/comparison/hu-tao-vs-yoimiya/">🔥 Hu Tao vs Yoimiya Comparison</a>
  </div>
`;

guideTemplate = guideTemplate.replace('</BaseLayout>', guideSection + '</BaseLayout>');

fs.writeFileSync(base + "/src/pages/guide/[slug].astro", guideTemplate, "utf-8");
console.log("Guide 模板已增强: " + guideTemplate.length + " bytes");
console.log("全部模板增强完成！");