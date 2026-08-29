const fs = require("fs");
const base = "D:/GAME/Game web 1000plus AI/genshin-builds";

// ========== BUILD 模板：加厚到 ~900 字 + FAQ ==========
const buildTemplate = `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { characters } from "../../data/characters";
import { buildExtendedGuides } from "../../data/extended-guides-build";

export function getStaticPaths() {
  return characters.map((c) => ({
    params: { slug: c.slug },
    props: { character: c },
  }));
}

const { character: c } = Astro.props;
const title = \`\${c.name} Best Build Guide 2026 — Weapons, Artifacts & Stats\`;
const description = \`Best \${c.name} build guide 2026. Best weapon: \${c.bestWeapon}. F2P option: \${c.f2pWeapon}. Best artifacts: \${c.bestArtifacts}. Stats priority, rotation & FAQ included.\`;

const faq = [
  {
    q: \`What is the best weapon for \${c.name}?\`,
    a: \`The best-in-slot weapon for \${c.name} is \${c.bestWeapon}. It synergizes with their \${c.element} kit by providing the exact stats they need. For players who don't have it, \${c.f2pWeapon} is the strongest free-to-play alternative and performs well even at refinement 1.\`
  },
  {
    q: \`What artifact set should I use on \${c.name}?\`,
    a: \`\${c.bestArtifacts} is the recommended set for \${c.name}. This set maximizes their damage output by working with their kit mechanics. The main stats to prioritize are: \${c.mainStats}. Substats should follow this priority: \${c.subStats}.\`
  },
  {
    q: \`What is the optimal rotation for \${c.name}?\`,
    a: \`The optimal \${c.name} rotation is: \${c.rotation}. Timing is key — make sure supports cast their abilities first so \${c.name} can snapshot buffs and maximize their damage window.\`
  },
  {
    q: \`Is \${c.name} worth building in the current meta?\`,
    a: \`\${c.name} is rated \${c.rating}. As a \${c.role}, they fit into \${c.strongTeam}. Even at moderate investment, they perform well in current abyss rotations and are a solid addition to most accounts.\`
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
});

const articleJsonLd = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name}});
---

<BaseLayout title={title} description={description}>
  <script type="application/ld+json" set:html={articleJsonLd}></script>
  <script type="application/ld+json" set:html={faqJsonLd}></script>
  <p>
    <span class="tag tag-{c.tier}">Tier {c.tier}</span>
    <span class="tag tag-{c.element.toLowerCase()}">{c.element}</span>
    <span style="color: var(--text-muted); font-size: 0.9rem; margin-left: 4px;">{c.role} &middot; {c.weapon}</span>
  </p>

  <h1>{c.name} Best Build Guide</h1>

  <div class="insight-box">
    <h3>⚡ Why This Build Works</h3>
    <p>{c.bestWeapon} synergizes with {c.name}'s kit because it provides the stats they need most. Combined with {c.bestArtifacts}, this build achieves the best balance of damage output and energy efficiency in the current meta. The main stat priority of {c.mainStats} ensures {c.name} hits the right damage breakpoints while keeping their rotation smooth.</p>
  </div>

  {buildExtendedGuides[c.slug] && (
    <div class="card" style="margin:20px 0;border-color:rgba(96,128,255,0.15);">
      <h3>Build Tips & Optimization</h3>
      <div style="white-space:pre-line;line-height:1.8;">{buildExtendedGuides[c.slug]}</div>
    </div>
  )}

  <div class="version-badge">Updated for Version 5.x</div>

  <h2>Best Weapon</h2>
  <p><strong>{c.bestWeapon}</strong> is the best-in-slot weapon for {c.name}. This weapon maximizes their damage output by synergizing with {c.element} damage and their kit mechanics. It provides the optimal stat balance — whether that is ER for burst uptime, CRIT for raw damage, or EM for reaction teams.</p>

  <h3>F2P Weapon Option</h3>
  <p>{c.f2pWeapon} is a strong alternative that performs well without spending primogems on the weapon banner. It provides competitive damage especially at refinement 5. For budget players, this weapon lets {c.name} clear most content without sacrificing too much damage — the gap between {c.f2pWeapon} and {c.bestWeapon} is usually manageable in endgame content.</p>

  <h2>Best Artifact Set</h2>
  <p>{c.bestArtifacts} is the recommended set. This set provides the best balance of damage and utility for {c.name} in most team compositions. The 4-piece set bonus works directly with their kit to amplify damage, while the 2-piece bonus covers their stat requirements early on.</p>

  <h2>Stats Priority</h2>
  <ul>
    <li><strong>Substats:</strong> {c.subStats}</li>
    <li><strong>Main Stats:</strong> {c.mainStats}</li>
  </ul>
  <p>Getting the right main stats is the most important step — a correct main stat with bad substats will always outperform the wrong main stat. Once your main stats are correct, focus on improving substat rolls to optimize {c.name}'s damage further.</p>

  <h2>Rotation Guide</h2>
  <p>{c.rotation}</p>
  <p>Practicing this rotation is essential. {c.name} relies on proper ability ordering to snapshot buffs, maintain uptime, and maximize their damage window. Watch your energy gauge and swap back to supports before {c.name}'s buff window expires.</p>

  <h2>Common Mistakes When Building This Character</h2>
  <ul>
    <li>Using wrong main stat on artifacts — stat priority beats set bonus in most cases.</li>
    <li>Ignoring Energy Recharge requirements — not enough ER breaks the rotation.</li>
    <li>Copying whale builds — most guides assume 5-star weapons and high constellations.</li>
    <li>Over-investing in ATK when the character scales with HP, DEF, or EM instead.</li>
    <li>Not leveling the right talents first — some talent upgrades are trap investments.</li>
    <li>Neglecting the team — {c.name} performs best in {c.strongTeam}, so build around their support needs.</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
  {faq.map((f) => (
    <div class="card" style="margin: 12px 0; padding: 14px 18px;">
      <h3 style="margin-bottom: 6px; font-size: 1rem; color: var(--text-primary);">{f.q}</h3>
      <p style="margin: 0;">{f.a}</p>
    </div>
  ))}

  <div class="internal-links">
    <h3>📂 More {c.name} Guides</h3>
    <a href={\`/character/\${c.slug}/\`}>📋 {c.name} Overview →</a>
    <a href={\`/team/\${c.slug}/\`}>👥 {c.name} Best Team Guide →</a>
  </div>
</BaseLayout>
`;

fs.writeFileSync(base + "/src/pages/build/[slug].astro", buildTemplate, "utf-8");
console.log("Build 模板已重写: " + buildTemplate.length + " bytes");

// ========== TEAM 模板：加厚到 ~800 字 + FAQ ==========
const teamTemplate = `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { characters } from "../../data/characters";
import { teamExtendedGuides } from "../../data/extended-guides-team";

export function getStaticPaths() {
  return characters.map((c) => ({
    params: { slug: c.slug },
    props: { character: c },
  }));
}

const { character: c } = Astro.props;
const title = \`\${c.name} Best Team Guide 2026 — Comps, Synergy & Rotation\`;
const description = \`Best teams for \${c.name}. Strongest team: \${c.strongTeam}. F2P team: \${c.f2pTeam}. Team synergy, rotation & FAQ included.\`;

const faq = [
  {
    q: \`What is the best team for \${c.name}?\`,
    a: \`The strongest \${c.name} team is \${c.strongTeam}. This composition maximizes \${c.name}'s damage by providing the right reactions, energy support, and buffs that a \${c.role} needs to shine.\`
  },
  {
    q: \`What is a good F2P team for \${c.name}?\`,
    a: \`For players without premium units, \${c.f2pTeam} is an excellent budget option. This team uses mostly 4-star characters while maintaining strong performance, making it accessible for most accounts.\`
  },
  {
    q: \`How should I play the \${c.name} rotation?\`,
    a: \`The key rotation is: \${c.rotation}. The key is keeping energy flowing so every burst is ready when needed, and timing \${c.name}'s field time to line up with support buffs.\`
  },
  {
    q: \`What role does \${c.name} play in a team?\`,
    a: \`\${c.name} functions as a \${c.role}. Their kit is built around \${c.teamRole} — understanding this role is the key to placing them correctly in team compositions.\`
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
});

const articleJsonLd = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":title,"description":description,"about":{"@type":"Thing","name":c.name}});
---

<BaseLayout title={title} description={description}>
  <script type="application/ld+json" set:html={articleJsonLd}></script>
  <script type="application/ld+json" set:html={faqJsonLd}></script>
  <p>
    <span class="tag tag-{c.tier}">Tier {c.tier}</span>
    <span class="tag tag-{c.element.toLowerCase()}">{c.element}</span>
    <span style="color: var(--text-muted); font-size: 0.9rem; margin-left: 4px;">{c.role}</span>
  </p>

  <h1>{c.name} Best Team Guide</h1>

  <p>{c.teamRole}</p>

  <div class="insight-box">
    <h3>⚡ Team Synergy Insight</h3>
    <p>{c.name} functions best as a {c.role}. The recommended team compositions maximize their contribution by providing the right elemental reactions, energy support, and buffs that {c.name} needs to perform at their peak in the current abyss cycle. Building around {c.name}'s strengths while covering their weaknesses is the key to consistent clears.</p>
  </div>

  {teamExtendedGuides[c.slug] && (
    <div class="card" style="margin:20px 0;border-color:rgba(96,128,255,0.15);">
      <h3>Team Strategy Notes</h3>
      <div style="white-space:pre-line;line-height:1.8;">{teamExtendedGuides[c.slug]}</div>
    </div>
  )}

  <div class="version-badge">Updated for Version 5.x</div>

  <h2>Strongest Team</h2>
  <p><strong>{c.strongTeam}</strong></p>
  <p>This composition maximizes {c.name}'s damage potential and provides the best synergy with their kit. Each teammate is chosen to fill a specific role: one provides elemental reactions, one offers energy support, and one supplies buffs or healing. Together they create a loop where every character's ability feeds into the next.</p>

  <h2>F2P Team</h2>
  <p><strong>{c.f2pTeam}</strong></p>
  <p>A budget-friendly alternative that uses mostly 4-star characters while maintaining strong team performance. This version trades some damage or comfort for accessibility, but still completes the core reaction loop that makes {c.name} strong. It's an excellent starting point before upgrading to the premium version.</p>

  <h2>Rotation Guide</h2>
  <p>{c.rotation}</p>
  <p>The rotation matters more than raw stats for this team. Practice the order until it becomes muscle memory — the difference between a smooth rotation and a messy one can be 30-40% of team DPS. Key tips: always snapshot buffs before the main damage window, and don't waste energy by overcapping.</p>

  <h2>Team Building Tips</h2>
  <ul>
    <li><strong>Reaction coverage:</strong> Make sure your team enables {c.name}'s best reactions. For a {c.element} unit, this means having the right off-field aura appliers.</li>
    <li><strong>Energy requirements:</strong> Check every teammate's ER needs. {c.name}'s rotation depends on everyone having their burst ready on time.</li>
    <li><strong>Survivability:</strong> Include a healer or shielder unless {c.name} can sustain themselves. Comfort lets you focus on damage.</li>
    <li><strong>Upgrade path:</strong> Start with the F2P team, then upgrade one slot at a time as you pull better units.</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
  {faq.map((f) => (
    <div class="card" style="margin: 12px 0; padding: 14px 18px;">
      <h3 style="margin-bottom: 6px; font-size: 1rem; color: var(--text-primary);">{f.q}</h3>
      <p style="margin: 0;">{f.a}</p>
    </div>
  ))}

  <div class="internal-links">
    <h3>📂 More {c.name} Guides</h3>
    <a href={\`/character/\${c.slug}/\`}>📋 {c.name} Overview →</a>
    <a href={\`/build/\${c.slug}/\`}>🛠️ {c.name} Best Build Guide →</a>
  </div>
</BaseLayout>
`;

fs.writeFileSync(base + "/src/pages/team/[slug].astro", teamTemplate, "utf-8");
console.log("Team 模板已重写: " + teamTemplate.length + " bytes");