# P1-4 外链建设执行手册 — 聚焦 team 页（2026-09-08）

## 为什么打 team 页，而不是首页

来自 2026-09-08 GSC CSV 的页面类型表现：

| 页面类型 | 页数 | 总展示 | 总点击 | 平均排名 | 有点击页 |
|---|---|---|---|---|---|
| **team** | 27 | 3,113 | **21** | **31.4** | **10** |
| character | 24 | 5,865 | 13 | 44.8 | 5 |
| build | 11 | 1,471 | 7 | 39.2 | 4 |
| weapon | 21 | 104 | 1 | 27.1 | 1 |

结论：**team 页是站内唯一已被 Google 认可的页面类型**（排名 31.4，且 37% 的页面已有点击）。外链应优先打这些「已经快要突破」的页面，而不是首页——首页外链只会稀释权重到 444 个 URL 上。

## 优先落地页（按 GSC 展示量排序）

| 优先 | URL | 展示 | 点击 | 排名 | 为什么选它 |
|---|---|---|---|---|---|
| 1 | `/team/neuvillette/` | 769 | 2 | 25.7 | 展示最大且点击极少，排名一进前 10 收益最高 |
| 2 | `/team/clorinde/` | 591 | 7 | 28.1 | 已验证有点击能力，加权重最容易兑现 |
| 3 | `/team/navia/` | 101 | 1 | 18.3 | 最接近首页，临门一脚 |
| 4 | `/team/arlecchino/` | 60 | 0 | 19.6 | 已在前 20，易冲 |
| 5 | `/tier-list/` | 新 | — | — | 新页，需要外链引爬虫加速收录 |

> 原则：**一条外链只打一个深层页**，锚文本用自然长句而非 "Genshin builds"。

---

## 动作 1 · Reddit r/GenshinImpact（最高优先，但必须先读版规）

⚠️ **先做的事**：r/GenshinImpact 对自我推广极严格，纯链接贴会被秒删且可能封号。发帖前务必确认当前版规是否允许资源分享，以及是否有指定的 megathread / 每周讨论帖。**优先在每周问答帖里回答具体问题并附页面链接**，风险远低于开新帖。

### 方案 A（推荐，低风险）：在每周问答帖回答问题

在 "Weekly Questions Megathread" 中搜索 `team`、`comp`、`who works with` 类问题，针对性回答，回答本身要能独立成立，链接只是补充。

模板：

> For Neuvillette the main thing is that he wants to be *the* on-field carry, so the other three slots are all about keeping his Charged Attack uptime.
>
> The premium comp is Neuvillette + Furina + Kazuha + Baizhu — Furina's fanfare stacks off his self-heal, Kazuha shreds Hydro RES, Baizhu keeps the interruption resistance up during the CA channel.
>
> If you don't have Furina, Zhongli works fine (shield > heal for CA uptime), and Xilonen can replace Kazuha for the shred.
>
> I keep a full variant breakdown here if it helps: https://gameup.lol/team/neuvillette/

要点：
- 先给完整答案，链接放最后一行，语气是「顺便」不是「快来看」。
- 一天最多 1–2 条，不同帖子。
- 不要在多个回答里贴同一个链接。

### 方案 B（中风险）：开一个资源分享贴

仅当版规明确允许 OC/资源分享时使用。

标题（选一个）：
- `I compiled team variants + slot replacements for all 95 characters into one place`
- `Made a per-character "who can replace this slot" reference for team building`

正文：

> I kept running into the same problem: most team guides give you one "best" comp and stop there, so if you're missing one unit you're stuck.
>
> So I put together a per-character breakdown that lists multiple comps (premium / F2P / reaction variants), and for each one, which unit can replace which slot and what you lose by doing it.
>
> A few examples of what's in there:
> - Neuvillette: premium vs F2P Electro-Charged, and why Zhongli can sub for Furina
> - Clorinde: Aggravate vs Quickbloom vs the Chevreuse Overload comp
> - Xiangling: Raiden National, Chevreuse Overload, and Burgeon variants
>
> Start here if you want to poke at it: https://gameup.lol/tier-list/
>
> It's a static site, no ads, no login. Happy to take corrections on any of the comps — some of the newer ones I'm less sure about.

要点：
- **开头是问题，不是产品**。
- 主动请求纠错 → 提高互动、降低"广告"观感。
- 落地页用 `/tier-list/`（可分发到全站）或某个具体 team 页。
- 明确 "no ads, no login" 打消戒心。

---

## 动作 2 · Fandom Genshin Wiki 外部链接（谨慎）

只在**词条内容确实缺少该信息**时添加，且加在 "External links" 区。滥加会被回退并可能被标记 spam。

可尝试的落点：
- 角色词条（如 Neuvillette）的 External links 区，描述写 `Team compositions and slot replacement reference — gameup.lol`
- 一次只加 1 个词条，间隔数天，观察是否被回退。

若首次被回退，**立即停止**该渠道，不要反复添加。

---

## 动作 3 · 游戏媒体客座内容（B2/B3，高价值慢周期）

Pocket Tactics / Game8 这类站点不会接受裸链，但接受**有信息量的投稿或勘误反馈**。

可行路径（成本低、真实）：
1. 找他们已发布的 Genshin 配队文章中**过时的部分**（例如仍推荐旧版本队伍）。
2. 通过页面底部的 contact / tips 邮箱发一封简短勘误信，附上你页面作为参考依据。
3. 不索要链接。约 10–20% 概率他们更新时会顺手引用来源。

邮件模板：

> Subject: Small correction on your Neuvillette team guide
>
> Hi — your Neuvillette teams article still lists [具体过时内容] as the recommended fourth slot, which changed after [版本/角色] released. The current community consensus is [正确内容], mostly because [一句机制原因].
>
> I maintain a per-character comp reference at https://gameup.lol/team/neuvillette/ if you want to cross-check the current variants. No need to credit — just thought you'd want the correction.
>
> Thanks for the guides.

---

## 动作 4 · C 组通用目录（低价值，节流执行）

按 `directory-submissions.md` 的 C1–C7，**每周最多 2 个**。作用只是外链画像多样化 + 引爬虫，不要指望排名。提交时：
- 落地页用首页 `https://gameup.lol/`
- 描述用 `directory-submissions.md` 里的标准短描述
- 分类选 Games / Gaming Guides

---

## 执行节奏建议（4 周）

| 周 | 动作 | 目标 |
|---|---|---|
| 第 1 周 | Reddit 方案 A（问答帖回答 2–3 条）+ C 组 2 个 | 零风险起步，观察流量 |
| 第 2 周 | Fandom 1 个词条 + C 组 2 个 | 测试 Fandom 是否被回退 |
| 第 3 周 | Reddit 方案 B（若版规允许）+ 媒体勘误信 2 封 | 争取 1 条高质量外链 |
| 第 4 周 | 复盘 GSC：team 页排名是否 <20 | 决定是否加大投入 |

## 记录要求

每完成一次提交/发帖，回填下表，便于后续审计外链画像：

| 日期 | 渠道 | 落地页 | 锚文本 | 状态 | 备注 |
|---|---|---|---|---|---|
| | | | | | |

> 注意：外链见效周期通常 2–6 周，且 Reddit/Fandom 链接多为 nofollow——它们的价值在于**真实流量 + 引爬虫 + 品牌搜索**，而非直接传递权重。别因为 1 周没动静就判断无效。
