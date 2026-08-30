# A3 · Yandex Webmaster 提交指引（账号已注册）

**网站根地址**：`https://gameup.lol`
**Sitemap**：`https://gameup.lol/sitemap.xml`（已生成，含 361 个 URL）

## 步骤
1. 打开 https://webmaster.yandex.com 登录（账号已就绪）。
2. 点 **Add site**（Добавить сайт），输入 `https://gameup.lol`。
3. **验证所有权**（三选一）：
   - ✅ 推荐：**DNS 验证** — 加 TXT 记录，值由 Yandex 给出。
   - 或 **HTML tag** — 复制 Yandex 给的 `<meta name="yandex-verification" content="...">` 发我，我注入 `BaseLayout.astro` 的 `<head>` 并部署。
   - 或 **HTML 文件** — 放根目录，Cloudflare Pages 需建公开文件，较麻烦。
4. 验证通过后，左侧 **Sitemaps**（Карты сайта）→ 添加 `https://gameup.lol/sitemap.xml`。
5. 可选：在 **Indexing → Recrawl** 对核心页请求重新抓取。

## 完成后
把 `seo/directory-submissions.md` 里 A3 状态改为 ✅，并记录提交日期。
