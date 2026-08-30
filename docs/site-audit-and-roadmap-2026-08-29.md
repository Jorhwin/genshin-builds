# Genshin Builds（gameup.lol）现状诊断与优化路线图

> 诊断时间：2026-08-29  
> 数据来源：Google Search Console 截图 + 本地代码审查 + 线上页面抽样  
> 目标市场：北美/英语区 Genshin Impact 攻略用户



---

## 一、核心数据快照（过去 28 天）

| 指标    | 数值                                                            | 解读                               |
| ----- | ------------------------------------------------------------- | -------------------------------- |
| 点击次数  | **13**                                                        | 极低，几乎无自然流量                       |
| 展示次数  | **6,461**                                                     | 页面已被 Google 发现并部分展示，但 ranking 靠后 |
| 点击率   | **~0.20%**                                                    | 远低于行业平均（游戏攻略通常 2-6%）             |
| 点击量环比 | +550%                                                         | 基数太小，增长无实际意义                     |
| 展示环比  | +635%                                                         | 同上，只是 Google 在测试新页面              |
| 主要国家  | 美国 31%、意大利 15%、智利/匈牙利/印尼各 8%                                  | 英语区占比刚过 30%，说明定位/语言信号混乱          |
| 热门页面  | Kokomi Build、Clorinde Team、Nilou Build、Shenhe Team、Kuki Build | 均为“角色名 + build/team 2026”型长尾     |
| 热门查询  | `clorinde best team 2026`、`genshin kokomi build`              | 每月个位数点击，说明内容正好处在排名边缘             |

**结论**：站点已走出“完全不被索引”阶段，但卡在 **低排名 + 低点击** 的 sandbox/内容薄弱区间。问题不是“有没有页面”，而是“页面有没有足够信息增量和信任信号”。

---

## 二、项目当前状态

### 2.1 内容资产

| 类型                | 数量 | 质量评估                                                    |
| ----------------- | -- | ------------------------------------------------------- |
| 角色（characters.js） | 98 | 头部 8 个有 extended guide + core insight；其余多为模板填充，重复数据 2 处 |
| Build 页           | 98 | 与 character 高度重复，差异化不足                                  |
| Team 页            | 98 | 同上，公式化严重                                                |
| Comparison 页      | 16 | 人工编辑痕迹较强，是网站最有竞争力的页面类型                                  |
| Analysis 页        | 4  | 数量太少，未形成专题集群                                            |
| 通用 Guide 页        | 4  | EM/ER/Hyperbloom/Snapshotting，质量较好但数量不足                 |

### 2.2 技术栈

- **框架**：Astro 2.10.15（已过时，建议升级 Astro 4/5）
- **部署目标**：Cloudflare Pages（`output: static`）
- **构建产物**：当前本地 `npm run build` / `astro build` **失败**（`Cannot read properties of undefined (reading 'renderToFinalDestination')`），`dist/` 里只有 SSR 中间产物，没有完整静态 HTML
- **域名**：gameup.lol
- **站点地图**：`public/sitemap_mini.xml` 只放了 2 个 URL；`robots.txt` 的 sitemap 指向 `https://genshin-builds.example.com/sitemap.xml`（错误域名）
- **语言**：`<html lang="zh-CN">`（严重错误，目标市场是英语区）

### 2.3 线上站点抽样

- 首页：出现重复角色（Eula、Barbara 等出现两次）
- 头部导航的 Characters/Builds/Teams 全部指向 `/`，没有真正的列表页/分类页
- 页面没有角色立绘、元素图标、武器/圣遗物图标，视觉吸引力弱
- Kokomi Build 等页面内容非常单薄（rotation 只有 `E >> Q`）

---

## 三、问题分层（根因 → 影响 → 优先级）

### P0 — 必须先修，否则会持续拖累排名

| # | 问题                          | 根因                                       | 影响                           | 修复动作                                |
| - | --------------------------- | ---------------------------------------- | ---------------------------- | ----------------------------------- |
| 1 | **构建失败，无法部署新版**             | Astro 2 + 某组件 render 异常；也可能是重复 slug/数据格式 | 内容迭代停滞，GSC 看到的是旧/损坏版本        | 修复构建错误；必要时升级到 Astro 4/5 并重建         |
| 2 | **HTML lang="zh-CN"**       | BaseLayout 写死                            | 英语搜索用户看到中文语言信号，Google 误判目标市场 | 改为 `lang="en"`                      |
| 3 | **robots.txt sitemap 域名错误** | 配置硬编码 example.com                        | Google 无法正确抓取 sitemap        | 指向 `https://gameup.lol/sitemap.xml` |
| 4 | **sitemap 不完整**             | 只提交 2 个 URL                              | 大部分页面不被主动发现                  | 生成包含全部 ~320 个 URL 的 sitemap.xml     |
| 5 | **首页角色列表重复**                | characters.js 存在重复 slug（eula、barbara）    | 用户体验差，爬虫可能困惑                 | 去重并校验唯一 slug                        |

### P1 — 30 天内完成，决定能否跑出流量

| #  | 问题                                      | 根因                         | 影响                   | 修复动作                                                                 |
| -- | --------------------------------------- | -------------------------- | -------------------- | -------------------------------------------------------------------- |
| 6  | **头部导航全指向首页**                           | 没建 list 页                  | 站内链接权重分散，爬虫发现页面困难    | 新增 `/characters/`、`/builds/`、`/teams/`、`/comparisons/` 列表页           |
| 7  | **大量 thin content 页面**                  | 程序化生成但缺少人工增量               | 易被 Google 判为低质量/模板站  | 对长尾角色合并为专题页，或对单薄页加 `noindex`                                         |
| 8  | **缺少 Open Graph / Twitter Card**        | BaseLayout 未配置             | 社交/外链分享无卡片，CTR 低     | 添加 og:title/description/image                                        |
| 9  | **缺少结构化数据（BreadcrumbList、Article 缺字段）** | 只有基础 FAQPage/Article       | 富媒体结果少，SERP 表现弱      | 补全 Article（author、datePublished、dateModified）+ BreadcrumbList        |
| 10 | **页面无日期/版本更新信号**                        | 固定 “Version 5.x”           | 用户/爬虫无法判断 freshness  | 改为真实版本号或 `Last updated: YYYY-MM-DD`                                  |
| 11 | **缺少角色/武器/圣遗物视觉素材**                     | 未引入图片                      | 停留时间短，分享率低，E-E-A-T 弱 | 接入官方/community 图标（注意版权合规）                                            |
| 12 | **标题 SEO 结构单一**                         | 全是 “Best Build Guide 2026” | 长尾覆盖不足               | 增加 “Weapons & Artifacts”、“Artifacts & Stats”、“Talent Priority” 等变体标题 |

### P2 — 60-90 天，建立竞争壁垒

| #  | 问题                         | 根因                          | 影响                       | 修复动作                                            |
| -- | -------------------------- | --------------------------- | ------------------------ | ----------------------------------------------- |
| 13 | **没有专题集群（topic clusters）** | 只有角色页，缺武器/圣遗物/机制/深渊攻略       | 话题权威性不足                  | 建立 “武器 → 角色 → 队伍 → 深渊” 集群                       |
| 14 | **内容差异化不够**                | 很多页面结构、措辞雷同                 | 易被 SpamBrain 识别为 AI/模板内容 | 为每个角色定制“决策点/争议/取舍/误区”                           |
| 15 | **缺少用户互动与变现路径**            | 无 CTA、无 affiliate、无 AdSense | 流量无法转化                   | 添加 “Save this build”、affiliate 链接、AdSense 位     |
| 16 | **缺少性能监控与 A/B 实验**         | 无 Core Web Vitals 监控        | 无法量化优化效果                 | 接入 GSC 体验报告 + PageSpeed Insights + 简单 analytics |

---

## 四、优化建议总览

### 4.1 技术/SEO 层

1. **修复构建 + 升级 Astro**
   - 先定位 `renderToFinalDestination` 错误（建议从 `src/pages/index.astro` 的 map/render 表达式入手，或先移除动态表达式做二分）
   - 升级到 Astro 4/5，使用 `astro:assets` 处理图片，启用 `prefetch`
2. **修正语言与地域信号**
   - `<html lang="en">`
   - `hreflang="en"`（若未来做多语言再扩展）
3. **修复 sitemap / robots**
   - `public/robots.txt`：`Sitemap: https://gameup.lol/sitemap.xml`
   - 构建后生成完整 `sitemap.xml`（含 lastmod、priority），并删除 `sitemap_mini.xml`
4. **添加元信息模板**
   - Open Graph、Twitter Card、canonical、description 统一在 `BaseLayout` 中管理
   - 默认 OG 图片（带品牌 logo + 标题）

### 4.2 内容与 UX 层

1. **首页重构**
   - 去重角色数据
   - 增加搜索/过滤（按元素、武器、角色定位、tier）
   - 增加“Popular Comparisons”、“Latest Guides”模块
   - 分页或按字母分组，避免一次性渲染 98 条
2. **新增列表页**
   - `/characters/`：全部角色卡片网格
   - `/builds/`：按角色定位/元素筛选的 build 入口
   - `/teams/`：热门队伍组合
   - `/comparisons/`：所有对比页索引
3. **页面内容增强（优先级按 GSC 数据）**
   - 对已有 impression/click 的角色（Kokomi、Clorinde、Nilou、Shenhe、Kuki）优先扩写
   - 每个角色页至少包含：build summary、武器排名表、圣遗物主/副词条表、天赋优先级、核心机制、常见错误、2-3 套队伍、rotation 视频/图、FAQ
   - 加入“Not recommended if…”和“Community debate”模块（符合 ROADMAP 的编辑守则）
4. **图片与可视化**
   - 角色头像/元素图标/武器图标（建议使用官方素材或 community wiki 图标，并在页脚声明来源）
   - 队伍组合用图标行展示，build 用表格而非纯文本
   - 为 share/OG 生成静态封面图（角色名 + 主武器 + 圣遗物）
5. **Comparison 页放大**
   - 这是目前最有潜力成为富媒体摘要的页面类型
   - 扩展到 30-50 个高搜索量对比（武器对比、队伍对比、4-star 辅助对比）

### 4.3 运营与增长层

1. **内容发布节奏**
   - 每周：根据 GSC “Top queries” 新增/优化 3-5 页
   - 每两周：新增 1 个 comparison 或 analysis 专题
   - 每月：更新版本号、深渊环境、新角色
2. **数据驱动决策**
   - 每周查看 GSC：哪些 query 有 impression 无 click → 优化 title/description
   - 哪些页有 click 无转化 → 增强内容/CTA
   - 哪些页 0 impression → 合并或 noindex
3. **外链与信任**
   - 在 Reddit / Genshin Impact 社区适度分享 comparison 和 analysis（不要 spam）
   - 与 Keqing Mains / KQM 风格对齐，引用社区共识，增强 E-E-A-T
4. **变现准备**
   - 流量 > 500 UV/日：申请 AdSense
   - 引入 affiliate（官方充值、周边、Amazon）
   - 高级功能：build 收藏、伤害计算器（后期）

---

## 五、30-60-90 天执行计划

### 第 1 个月：止血 + 基建

- [ ] 修复 `astro build` 构建失败
- [ ] 升级 Astro 到 v4/v5（如升级成本可控）
- [ ] 修正 `lang="en"`、robots、sitemap、canonical
- [ ] 去除 characters.js 重复数据
- [ ] 新增 `/characters/`、`/builds/`、`/teams/`、`/comparisons/` 列表页
- [ ] 添加 Open Graph / Twitter Card / 默认 OG 图
- [ ] 重新部署并手动在 GSC 请求索引首页 + sitemap

### 第 2 个月：内容厚度

- [ ] 优先扩写 GSC 中已有 impression 的 20-30 个角色页
- [ ] 为每个角色增加武器排名表、圣遗物表、队伍图标、常见错误
- [ ] 新增 10 个 comparison 页（高搜索量 + 新角色对比）
- [ ] 新增 4-6 个通用 guide（artifact farming、abyss rotation、energy recharge calculator）
- [ ] 引入角色/武器/元素图标

### 第 3 个月：权威性 + 变现

- [ ] 建立 topic clusters：武器 tier list、圣遗物 tier list、深渊攻略
- [ ] 对低质量/零流量页面做 noindex 或合并
- [ ] A/B 测试 title/description 模板，提高 CTR
- [ ] 接入 AdSense 或预留广告位
- [ ] 制定 SOP：新角色上线 24h 内完成 character/build/team 三联页

---

## 六、预期目标

| 阶段 | 时间      | 目标                                            |
| -- | ------- | --------------------------------------------- |
| 短期 | 1 个月    | 构建稳定、所有页面可被索引、首页/列表页无重复、GSC 无结构性错误            |
| 中期 | 3 个月    | 日均点击 50-100、CTR 提升到 1-2%、头部 30 个页面进入前 20 名    |
| 长期 | 6-12 个月 | 日均 UV 500+、comparison/guide 页占据富媒体摘要、具备稳定变现能力 |

---

## 七、作为后续维护方的建议

基于这次诊断，我建议按以下顺序接手：

1. **先修 P0 阻塞项**（构建、语言、sitemap、重复数据）——否则任何内容更新都无法上线。
2. **立即对 GSC 已展示的热门页做人工扩写**（Kokomi、Clorinde、Nilou、Shenhe、Kuki），这是离流量最近的动作。
3. **不要继续批量新增角色页**，先让现有 ~300 页“厚起来”，避免 thin content 触发 Google 质量评估。
4. **把 Comparison 和 Analysis 当作核心差异化资产**，持续扩展，这类页面的搜索意图和商业价值都高于单一角色 build 页。

如果你确认这个方向，我可以直接开始执行 P0 修复 + 首页重构 + 热门页扩写。
