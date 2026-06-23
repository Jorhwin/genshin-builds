# Genshin Builds — 项目战略路线图

> 最后更新：2026-06-23
> 目标：验证程序化 SEO（Human-in-the-loop）在 2024+ Google 环境下的可行性

---

## 一、核心共识（不可动摇）

### 1.1 三层结论

| 问题 | 结论 | 来源 |
|---|---|---|
| 纯模板1000页 SEO？ | ❌ 2024 Google 必杀（HCU + SpamBrain） | DeepSeek 验证派 |
| 程序化SEO死了吗？ | ✅ 没死，但必须是 Human-in-the-loop 模式 | GPT 结构派 + DeepSeek |
| 先部署还是先设计？ | ✅ **先部署验证收录，再迭代设计** | 合并共识 |

### 1.2 项目本质

这个项目的本质不是「内容生成系统」，而是：

> **「游戏知识推理 + SEO 分发系统」**

它不是靠批量生产内容赢，而是靠：

- 结构化页面覆盖搜索意图空间
- 半人工数据增强每一页的「信息增量」
- 持续验证 Google 反馈并迭代

### 1.3 禁止行为（任何时候不能做）

- ❌ 纯模板复制（只换名字）
- ❌ AI 批量生成无差异段落
- ❌ Keyword stuffing
- ❌ 低字数页面（< 250 字）
- ❌ 无来源的虚构数据

---

## 二、技术栈决策

| 项目 | 选择 | 理由 |
|---|---|---|
| 框架 | **Astro 2**（静态 SSG） | 轻量、构建快、crawl 友好 |
| 托管 | **Cloudflare Pages** | 免费、全球 CDN、零运维 |
| 数据层 | 本地 JS 文件 + 人工维护 | 无 API 可用，半结构化复用 |
| 页面路由 | /character/[slug] /build/[slug] /team/[slug] | 扁平、清晰、SEO 友好 |
| SEO | sitemap.xml + robots.txt + canonical + meta | 标准配置，不过度工程 |

---

## 三、执行阶段（Phase 1 → Phase 4）

### 🟢 Phase 1：验证收录（当前阶段）

**目标：** 验证 Google 是否收录程序化生成的基础页面

- 页面量：46 页（15角色 × 3类型 + 首页）
- 结构：Character → Build → Team（不新增类型）
- 持续时间：14 天观察
- **成功标准：**
  - 🟥 失败：收录率 < 10%
  - 🟨 中等：收录率 30-70%
  - 🟩 成功：收录率 > 70%，出现 impressions

**关键动作：**
1. 部署到 Cloudflare Pages
2. 提交 Google Search Console
3. 手动请求 5-10 核心页索引
4. 14 天后判定收录结果

### 🟡 Phase 2：结构升级（收录验证通过后）

**目标：** 新增页面类型，提升搜索覆盖密度

- 新增页面类型：
  - **Comparison 页**：5-10 个高搜索量对比（Raiden vs Yae、Hu Tao vs Yoimiya 等）
  - **Patch Impact 页**（可选）：按版本更新跟踪
- 每页增加「Why this works」Insight 区块
- 页面底部增加版本标注（Last updated: Version 5.x）
- 内链升级：首页加对比入口，角色页加横向对比链接

### 🔥 Phase 3：数据增强（结构稳定后）

**目标：** 提升每页信息密度，进入排名池

- 引入社区数据引用（KQM、Wiki）
- 增加对比分析 + 数据推导模块
- 进入长尾关键词覆盖

### 💰 Phase 4：变现

**目标：** 流量达到一定量级后开启

- AdSense（需收录 + 稳定流量后申请）
- Affiliate
- 工具化（后期）

---

## 四、14 天观察指标

| 指标 | 什么时候看 | 含义 |
|---|---|---|
| Crawl（抓取） | Day 1-3 | Google 是否发现你的站 |
| Indexed（收录） | Day 4-10 | Google 是否收录你的页面 |
| Impression（曝光） | Day 10-14 | 是否有搜索展示 |
| Top query 出现 | Day 10-14 | 是否有长尾词进入 |

---

## 五、决策树

```
部署 → 14天观察
  │
  ├─ 收录率 < 10% → 分析原因（thin content / 结构问题 / 沙盒期）
  │    └─ 调整内容密度或放弃方向
  │
  ├─ 收录率 30-70% → 进入 Phase 2 升级
  │    └─ 加 Comparison / Insight / 版本标注
  │
  └─ 收录率 > 70% → 证明模型成立
       └─ Phase 2 + Phase 3 同步推进
```

---

## 六、域名策略

- ❌ 不要一开始就做多站矩阵
- ✅ **专注一个游戏（Genshin Impact）走通模型**
- ✅ 域名用权威相关名称，不要用 exact-match domain（EMD）
- ⏳ 单个游戏验证通过后，再考虑复制到第二个游戏（LoL / Fortnite 等）

---

## 七、当前项目状态

| 项目 | 状态 |
|---|---|
| 46 页 Astro 项目 | ✅ 已构建通过 |
| 角色数据（15 个） | ✅ 已完成 |
| 页面模板（Character / Build / Team） | ✅ 已完成 |
| sitemap.xml | ✅ 已生成 |
| robots.txt | ✅ 已配置 |
| 界面 UI | 🔄 升级中 |
| Cloudflare Pages 部署 | ⏳ 等待账号 |
| Search Console 提交 | ⏳ Phase 1 |

---

*此文档为项目核心路线图，项目推进中所有决策以此为准。*