#!/usr/bin/env node
/**
 * GSC CSV -> prioritized optimization report
 *
 * Usage:
 *   node scripts/gsc-import.mjs <path-to-gsc-export.csv> [--days 28] [--json-only]
 *
 * Accepts either the "Pages" export or the "Queries" export from Google Search Console.
 * Columns are auto-detected from the header row, so locale / column-order differences
 * are tolerated. The file usually starts with a title line ("Top pages") plus blank
 * lines before the real header -- those are skipped automatically.
 *
 * Outputs:
 *   data/gsc-pages.json        normalized records (consumed by other scripts)
 *   reports/gsc-<date>.md      prioritized, human-readable action list
 *   stdout                     short summary
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
if (!args.length || args[0].startsWith("--")) {
  console.error("Usage: node scripts/gsc-import.mjs <gsc-export.csv> [--days 28]");
  process.exit(1);
}
const csvPath = resolve(args[0]);
const daysIdx = args.indexOf("--days");
const WINDOW_DAYS = daysIdx > -1 ? Number(args[daysIdx + 1]) || 28 : 28;

if (!existsSync(csvPath)) {
  console.error("File not found: " + csvPath);
  process.exit(1);
}

/* ------------------------------------------------------------------ parse */

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = false;
      } else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

const raw = readFileSync(csvPath, "utf8").replace(/^﻿/, "");
const lines = raw.split(/\r?\n/);

// Find the header row: the first line that mentions both clicks and impressions.
let headerIdx = -1;
for (let i = 0; i < Math.min(lines.length, 25); i++) {
  const low = lines[i].toLowerCase();
  if (low.includes("click") && low.includes("impress")) { headerIdx = i; break; }
}
if (headerIdx === -1) {
  console.error("Could not locate a header row containing clicks + impressions.");
  process.exit(1);
}

const header = parseCsvLine(lines[headerIdx]).map((h) => h.toLowerCase());
const colOf = (...needles) => header.findIndex((h) => needles.every((n) => h.includes(n)));

const I_KEY = header.findIndex((h) => h.includes("page") || h.includes("query") || h.includes("网页") || h.includes("查询"));
const I_CLICK = colOf("click");
const I_IMPR = colOf("impress");
const I_CTR = colOf("ctr") > -1 ? colOf("ctr") : colOf("点击率");
const I_POS = colOf("position") > -1 ? colOf("position") : colOf("排名");

if (I_KEY === -1 || I_CLICK === -1 || I_IMPR === -1) {
  console.error("Missing required columns. Detected header: " + JSON.stringify(header));
  process.exit(1);
}

const num = (s) => {
  if (s == null) return 0;
  const v = String(s).replace(/[%\s, ]/g, "").replace(/,/g, "");
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
};

const rows = [];
for (let i = headerIdx + 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  const cells = parseCsvLine(lines[i]);
  const key = cells[I_KEY];
  if (!key || key === "-" || /^total/i.test(key)) continue;
  const impressions = Math.round(num(cells[I_IMPR]));
  const clicks = Math.round(num(cells[I_CLICK]));
  rows.push({
    key,
    clicks,
    impressions,
    ctr: I_CTR > -1 && String(cells[I_CTR]).includes("%") ? num(cells[I_CTR]) : (impressions ? (clicks / impressions) * 100 : 0),
    position: I_POS > -1 ? num(cells[I_POS]) : 0,
  });
}

rows.sort((a, b) => b.impressions - a.impressions);

/* --------------------------------------------------------------- classify */

// Expected CTR by average position (desktop+mobile blended, conservative).
function expectedCtr(pos) {
  if (!pos) return 0;
  if (pos <= 3) return 28;
  if (pos <= 5) return 12;
  if (pos <= 8) return 5;
  if (pos <= 10) return 2.8;
  if (pos <= 15) return 1.4;
  if (pos <= 20) return 0.8;
  if (pos <= 30) return 0.4;
  if (pos <= 50) return 0.2;
  return 0.1;
}

for (const r of rows) {
  const exp = expectedCtr(r.position);
  r.expectedCtr = exp;
  r.ctrGap = +(r.ctr - exp).toFixed(2);          // negative = underperforming
  r.ctrRatio = exp ? +(r.ctr / exp).toFixed(2) : 0;

  // Action buckets, ordered by the size of the win.
  //
  // The important distinction: zero clicks at position 8 means the copy failed,
  // zero clicks at position 45 means the page simply is not ranking. Telling
  // someone to "rewrite the title" in the second case wastes their time.
  if (r.impressions < 30) r.action = "MONITOR";
  else if (r.position > 50 && r.impressions < 150) r.action = "MONITOR";
  else if (r.clicks === 0 && r.position <= 20) r.action = "ZERO_CLICK_REWRITE";
  else if (r.clicks === 0) r.action = "NEEDS_DEPTH";
  else if (r.position >= 4 && r.position <= 15) r.action = "PUSH_TO_TOP3";
  else if (r.ctrRatio < 0.5) r.action = "CTR_UNDERPERFORMER";
  else if (r.position < 4) r.action = "HOLD_AMPLIFY";
  else if (r.position <= 40) r.action = "NEEDS_DEPTH";
  else r.action = "DEEP_POSITION";
}

const ACTION_META = {
  ZERO_CLICK_REWRITE: {
    label: "排名尚可但零点击 — 重写标题/描述",
    why: "排名已进入前 20，Google 认为相关性够；零点击说明标题和描述没给出点击理由。改文案是直接见效的动作。",
  },
  PUSH_TO_TOP3: {
    label: "排名 4-15 — 冲首页前三",
    why: "已经出单且排名接近首页，补内容深度 + 内链 + FAQ，性价比最高。",
  },
  CTR_UNDERPERFORMER: {
    label: "CTR 低于同排名预期一半 — 重写标题/描述",
    why: "排名没问题，是文案没打动人。改 title/description 即可。",
  },
  NEEDS_DEPTH: {
    label: "有展示但排名太深 — 需要内容加深度",
    why: "能进展示池说明主题被收录，但排名 20 名开外基本不会被点到。这类页面的瓶颈是内容质量与内链权重，不是文案——先把它推进前 15，再谈 CTR。",
  },
  DEEP_POSITION: {
    label: "排在第 40 名之外 — 内容或内链严重不足",
    why: "在这个位置改标题几乎没有意义。要么补真实深度内容，要么考虑合并/下线该页，把权重让给同类页面。",
  },
  HOLD_AMPLIFY: {
    label: "表现正常 — 保持并加权内链",
    why: "已经能出单，别乱动。从首页/元素页/榜单页给它更多内链。",
  },
  MONITOR: {
    label: "量太小 — 观察",
    why: "数据不足以判断，先不动。",
  },
};

/* ----------------------------------------------------------------- totals */

const totals = rows.reduce(
  (a, r) => {
    a.clicks += r.clicks; a.impressions += r.impressions; return a;
  },
  { clicks: 0, impressions: 0 }
);
totals.ctr = totals.impressions ? +((totals.clicks / totals.impressions) * 100).toFixed(2) : 0;
totals.pages = rows.length;
totals.windowDays = WINDOW_DAYS;

/* ------------------------------------------------------------------ write */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(resolve(root, "data"), { recursive: true });
mkdirSync(resolve(root, "reports"), { recursive: true });

const stamp = new Date().toISOString().slice(0, 10);
writeFileSync(resolve(root, "data/gsc-pages.json"), JSON.stringify({ generated: stamp, source: basename(csvPath), totals, rows }, null, 2), "utf8");

const byAction = {};
for (const r of rows) (byAction[r.action] ||= []).push(r);
const order = ["ZERO_CLICK_REWRITE", "PUSH_TO_TOP3", "CTR_UNDERPERFORMER", "NEEDS_DEPTH", "DEEP_POSITION", "HOLD_AMPLIFY", "MONITOR"];

let md = `# GSC 优化优先级报告\n\n`;
md += `- 数据源：\`${basename(csvPath)}\`\n`;
md += `- 生成时间：${stamp}\n`;
md += `- 统计窗口：约 ${WINDOW_DAYS} 天\n`;
md += `- 总计：**${totals.pages}** 个条目 / **${totals.impressions.toLocaleString()}** 次展示 / **${totals.clicks.toLocaleString()}** 次点击 / CTR **${totals.ctr}%**\n\n`;

// Diagnose the overall phase before dumping tables -- this is the part that
// decides whether CTR work or ranking work should come first.
md += `## 一、全局诊断\n\n`;
const avgPos = rows.length ? rows.reduce((a, r) => a + r.position * r.impressions, 0) / Math.max(1, totals.impressions) : 0;
if (totals.impressions > 500 && totals.ctr < 0.8 && avgPos > 20) {
  md += `> **主要瓶颈是排名，不是 CTR。** 加权平均排名约 **${avgPos.toFixed(1)}** 位，这个位置 0.x% 的 CTR 属于正常现象。\n`;
  md += `> 改标题能拿到的提升有限，**先把内容深度和内链做上去、把排名推到前 15**，CTR 会自己回来。\n\n`;
} else if (totals.ctr < 1.5) {
  md += `> CTR 偏低（${totals.ctr}%），标题/描述重写是当前最高性价比动作。\n\n`;
} else {
  md += `> CTR 处于健康区间（${totals.ctr}%），重点是扩量而非修文案。\n\n`;
}

md += `## 二、按动作分组（执行顺序即优先级）\n\n`;
for (const a of order) {
  const list = byAction[a];
  if (!list || !list.length) continue;
  const meta = ACTION_META[a];
  const imp = list.reduce((s, r) => s + r.impressions, 0);
  md += `### ${meta.label} — ${list.length} 页 / ${imp.toLocaleString()} 次展示\n\n`;
  md += `${meta.why}\n\n`;
  md += `| # | 页面 | 展示 | 点击 | CTR | 均位 | 同排名预期 CTR |\n`;
  md += `|---|------|------|------|-----|------|----------------|\n`;
  list.slice(0, 40).forEach((r, i) => {
    md += `| ${i + 1} | \`${r.key.replace(/^https?:\/\/[^/]+/, "")}\` | ${r.impressions.toLocaleString()} | ${r.clicks} | ${r.ctr.toFixed(2)}% | ${r.position.toFixed(1)} | ${r.expectedCtr}% |\n`;
  });
  if (list.length > 40) md += `\n_（另有 ${list.length - 40} 条，见 data/gsc-pages.json）_\n`;
  md += `\n`;
}

md += `## 三、全部条目（按展示量降序）\n\n`;
md += `| 页面 | 展示 | 点击 | CTR | 均位 | 动作 |\n`;
md += `|------|------|------|-----|------|------|\n`;
rows.slice(0, 150).forEach((r) => {
  md += `| \`${r.key.replace(/^https?:\/\/[^/]+/, "")}\` | ${r.impressions.toLocaleString()} | ${r.clicks} | ${r.ctr.toFixed(2)}% | ${r.position.toFixed(1)} | ${r.action} |\n`;
});
if (rows.length > 150) md += `\n_（共 ${rows.length} 条，完整数据见 data/gsc-pages.json）_\n`;

writeFileSync(resolve(root, `reports/gsc-${stamp}.md`), md, "utf8");

/* ----------------------------------------------------------------- stdout */

console.log(`\nGSC 导入完成：${rows.length} 条`);
console.log(`展示 ${totals.impressions.toLocaleString()} · 点击 ${totals.clicks.toLocaleString()} · CTR ${totals.ctr}% · 加权均位 ${avgPos.toFixed(1)}`);
console.log("\n分组：");
for (const a of order) {
  if (byAction[a]?.length) {
    console.log(`  ${a.padEnd(22)} ${String(byAction[a].length).padStart(3)} 页 / ${byAction[a].reduce((s, r) => s + r.impressions, 0).toLocaleString()} 展示`);
  }
}
console.log(`\n报告：reports/gsc-${stamp}.md`);
console.log(`数据：data/gsc-pages.json\n`);
