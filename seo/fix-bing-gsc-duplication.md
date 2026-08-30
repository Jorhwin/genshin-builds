# 问题：Bing 导入出现两个站点，GSC sitemap 解析失败

## 根因

截图里两个站点：
1. `https://gameup.lol/` ✅ 主域
2. `https://genshin-builds-8y6.pages.dev/` ❌ Cloudflare Pages 默认开发子域

**问题**：`pages.dev` 子域与主域同时存在，导致搜索引擎把同一内容看成两套站点；GSC 里 pages.dev 的 sitemap 提交后访问异常/解析失败，并可能拖累主域的收录信号。

> 注意：Astro 的 `site: "https://gameup.lol"` 已确保所有页面的 `<link rel="canonical">`、hreflang、og:url 都指向主域，所以内容层面已合并到主域。现在要把平台层面的重复站点也清理掉。

---

## 解决方案（按顺序）

### 1. Bing Webmaster Tools 导入时只选主域
在弹出的「从 Google Search Console 导入」窗口：
- ✅ 勾选 `https://gameup.lol/`
- ❌ **不要勾选** `https://genshin-builds-8y6.pages.dev/`
- 点 **进口**

如果已经导入 pages.dev，去 Bing 后台把它删除：
- Bing Webmaster Tools -> 设置 -> 删除站点（或取消验证）

### 2. Google Search Console 删除 pages.dev 属性
- 打开 https://search.google.com/search-console
- 选择 `https://genshin-builds-8y6.pages.dev/` 属性
- 左侧底部 **设置（Settings）** -> **删除属性（Remove property）**
- 只保留 `https://gameup.lol/` 或 `gameup.lol` 域名级属性

> 删除 pages.dev 属性**不会**影响主域收录，只会让信号集中到主域。

### 3. Cloudflare Pages 设置 301：pages.dev -> gameup.lol
Cloudflare Pages 默认子域不能直接一键关闭，但可以用 **Bulk Redirects** 把它 301 到主域（官方推荐做法）。

操作路径：
1. 登录 Cloudflare Dashboard
2. 进入 **Workers & Pages** -> 选择 `genshin-builds` 项目
3. 确认 **Custom domains** 里已有 `gameup.lol`
4. 进入对应 Cloudflare 账户的 **Bulk Redirects**
5. **创建 Bulk Redirect List**：
   | Source URL | Target URL | Status | Parameters |
   |------------|------------|--------|------------|
   | `genshin-builds-8y6.pages.dev/*` | `https://gameup.lol/:splat` | 301 | ✅ Preserve query string<br>✅ Subpath matching<br>✅ Preserve path suffix |
6. **创建 Bulk Redirect Rule**：选择上一步的 list，启用规则
7. 测试：浏览器访问 `https://genshin-builds-8y6.pages.dev/character/mona/` 应自动跳到 `https://gameup.lol/character/mona/`

> `_redirects` 文件**不能**按域名匹配，所以 Bulk Redirects 是唯一可靠方案（官方文档已确认）。

---

## 验证清单

- [ ] Bing 只保留 `https://gameup.lol/`，sitemap 显示 `https://gameup.lol/sitemap.xml`
- [ ] GSC 里已删除 `https://genshin-builds-8y6.pages.dev/`
- [ ] `https://gameup.lol/sitemap.xml` 在 GSC 中状态为「成功」
- [ ] `https://genshin-builds-8y6.pages.dev/任意路径` 返回 301 并跳转到 `https://gameup.lol/对应路径`
- [ ] 浏览器强制刷新后访问 `https://gameup.lol/characters/` 正常，canonical 仍指向 `https://gameup.lol/...`

---

## 关键发现：robots.txt 含 UTF-8 BOM 导致 GSC 无法抓取 sitemap（已修复）

用户按上面步骤操作后（A2–A4 sitemap 提交成功、Bulk Redirect 启用、GSC 删除 pages.dev），GSC 主域 sitemap 仍显示「无法抓取」。

**根因**：`public/robots.txt` 文件以 **UTF-8 BOM**（`EF BB BF`）开头。Googlebot 解析 robots.txt 时，BOM 会让 `User-agent:` 行首字符识别异常，导致整份 robots.txt 规则无法被正确读取，进而使 `Sitemap:` 指令失效，GSC 就报「无法抓取」。

**已修复**：
- 移除 `public/robots.txt` 的 BOM，以纯 `User-agent: *` 开头。
- 重新构建、推送、部署（commit `3711392`）。
- 线上 `https://gameup.lol/robots.txt` 已验证无 BOM，且正确声明 `Sitemap: https://gameup.lol/sitemap.xml`。

**你还需要在 GSC 做的**：
1. 进入 GSC → 站点地图。
2. 删除现有的 `/sitemap.xml` 提交记录。
3. 重新添加 `https://gameup.lol/sitemap.xml`。
4. 等 24–48 小时，状态通常会从「无法抓取」变成「成功」。

---

## 如果 GSC 的 `https://gameup.lol/sitemap.xml` 仍然解析失败

完成上面清理 + BOM 修复后，如果主域 sitemap 还失败，按以下顺序排查：

1. **直接访问**：浏览器打开 `https://gameup.lol/sitemap.xml`，确认能返回 XML 且顶部有 `<?xml version="1.0" encoding="UTF-8"?>`。
2. **检查状态码**：`curl -I https://gameup.lol/sitemap.xml` 应返回 `200`，`Content-Type: application/xml`。
3. **robots.txt 无 BOM**：`curl -s https://gameup.lol/robots.txt | head -c 10 | xxd` 应以 `55 73`（`Us`）开头，而不是 `ef bb bf`。
4. **GSC 重新提交**：在 GSC 里删除旧的 sitemap，重新添加 `https://gameup.lol/sitemap.xml`，等 24–48 小时。
5. **文件大小/条目**：当前 sitemap 361 条，远低于 50,000 条/50 MB 限制，不是规模问题。
6. **URL 检查工具**：在 GSC 顶部搜索框输入 `https://gameup.lol/sitemap.xml`，看是否能被 Google 抓取。

---

## 原因总结
- **Bing 里两个站点**：GSC 之前同时添加了主域和 pages.dev 子域，Bing 从 GSC 导入时一并带过来了。
- **GSC sitemap 解析失败（第一层）**：`pages.dev` 子域的 sitemap 访问异常，且搜索引擎在重复站点间产生混淆。清理重复站点 + 做 301 后仍未解决。
- **GSC sitemap 解析失败（第二层/真正根因）**：`robots.txt` 含 UTF-8 BOM，Googlebot 无法正确解析，导致 `Sitemap:` 指令失效。移除 BOM 后需重新在 GSC 提交并等待。
