# A2 · Bing Webmaster Tools 提交指引

**网站根地址**：`https://gameup.lol`
**Sitemap**：`https://gameup.lol/sitemap.xml`（已生成，含 361 个 URL）

## 步骤
1. 打开 https://www.bing.com/webmasters/ ，用 Microsoft 账号登录。
2. 点 **Add site**（添加站点），输入 `https://gameup.lol`，下一步。
3. **验证站点所有权**（三选一）：
   - ✅ 推荐：**DNS 验证** — 在域名 DNS 加一条 TXT 记录，值由 Bing 页面给出（无需改代码）。
   - 或 **HTML meta tag** — 复制 Bing 给的 `<meta>` 内容发我，我注入 `BaseLayout.astro` 的 `<head>` 并部署。
   - 或 **上传文件到根目录** — Cloudflare Pages 需单独建公开文件，较麻烦，不推荐。
4. 验证通过后，左侧菜单 **Sitemaps** → 提交 `https://gameup.lol/sitemap.xml`。
5. 可选：**Submit URLs** 手动提交核心页（首页、`/characters/`、`/weapon/`、`/artifact/`），注意每日限额。

## 完成后
把 `seo/directory-submissions.md` 里 A2 状态改为 ✅，并记录提交日期。
