# A4 · Naver Search Advisor 提交指引

**网站根地址**：`https://gameup.lol`
**Sitemap**：`https://gameup.lol/sitemap.xml`（已生成，含 361 个 URL）

## 步骤
1. 打开 https://searchadvisor.naver.com 登录（Naver 账号）。
2. 点 **웹마스터 도구** → **사이트 등록**（注册站点），输入 `https://gameup.lol`。
3. **验证所有权**（소유확인，三选一）：
   - ✅ 推荐：**DNS 验证** — 加 TXT 记录，值由 Naver 给出。
   - 或 **HTML tag** — 复制 Naver 给的 `<meta name="naver-site-verification" content="...">` 发我，我注入 `BaseLayout.astro` 的 `<head>` 并部署。
   - 或 **HTML 文件** — 放根目录，Cloudflare Pages 需建公开文件，较麻烦。
4. 验证通过后，左侧 **사이트맵 제출**（提交 Sitemap）→ 添加 `https://gameup.lol/sitemap.xml`。
5. 可选：在 **요청 / 수집** 对核心页请求收录。

## 完成后
把 `seo/directory-submissions.md` 里 A4 状态改为 ✅，并记录提交日期。
