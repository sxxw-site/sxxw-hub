# sxxw-hub

上海树下小屋网络科技有限公司(树下小屋)的**统一页面中台** —— 公司官网、旗下各 app 的落地页与合规页(隐私政策 / 用户协议)、运营 H5,全部集中在这一个仓库管理。

- 站点:https://www.sxxw.site
- 组织:https://github.com/sxxw-site
- 前端:**React + [Vite](https://vitejs.dev)**(静态产物)+ GitHub Actions 自动部署到 GitHub Pages
- 服务端:**Go(标准库)**,部署在 HK 轻量服务器,反代到 `api.sxxw.site`

## 架构

```
        GitHub 仓库 (sxxw-hub) —— 唯一代码源
                 │  push main
                 ▼
        GitHub Actions 构建一次静态产物 (dist/)
                 │
       ┌─────────┴──────────┐
       ▼                    ▼
  GitHub Pages          腾讯云 CDN/EdgeOne(备案后)
  (海外访问)              (大陆加速,域名 sxxw.site)
                              │
                        HK 轻量服务器  api.sxxw.site
                        Nginx + HTTPS,承载动态轻服务
```

**原则:能静态就静态。** 官网、合规页、H5 都是静态产物,免运维;只有需要写数据/动态返回的(表单收集、短链、配置下发、活动后端)才落到 HK 服务器。

## 目录结构

```
├─ index.html               # Vite 入口
├─ src/
│  ├─ config/apps.ts        # ★ 单一数据源:公司主体信息 + 产品注册表
│  ├─ App.tsx               # 应用根
│  ├─ Home.tsx / Home.css   # 官网首页(极简科技风,深色 + 大字 + 渐变)
│  ├─ main.tsx / index.css
│  └─ (后续)app 落地页、合规页、运营 H5
├─ server/                  # Go 动态服务(独立部署)
└─ .github/workflows/       # 构建并部署到 GitHub Pages
```

## 常见操作

### 新增一个 app

编辑 [`src/config/apps.ts`](src/config/apps.ts),在 `APPS` 里加一条:

```ts
{ slug: 'newapp', name: 'NewApp', tagline: '一句话简介', desc: '稍长描述', accent: '#6d5ef0', icon: '📦', live: true }
```

首页产品列表会自动出现这一条(app 落地页与合规页路由后续补上,同样从此配置驱动)。

### 修改公司信息 / 备案号

编辑 `src/config/apps.ts` 的 `SITE` 对象。备案通过后把 `icp` 填上,页脚全站自动显示备案号并链接到工信部备案系统。

### 本地开发

```bash
npm install
npm run dev          # 本地预览 http://localhost:4321
npm run build        # 产物输出到 dist/(含 SPA 兜底 404.html)
npm run preview      # 预览构建产物
npm run typecheck    # 类型检查
npm run lint         # ESLint 静态检查
npm run format       # Prettier 格式化
```

协作规范(分支、提交约定、PR、提交前自检)见 [CONTRIBUTING.md](CONTRIBUTING.md)。
CI(`.github/workflows/ci.yml`)会在 PR 上自动跑**前端** lint/typecheck/build。
GitHub Actions 只负责 GitHub Pages(见 `deploy.yml`);Go 服务手动部署到自有服务器,不进 CI。

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

### 绑定自定义域名(www.sxxw.site)

1. 备案通过、DNS 可控后,在 `public/` 下建 `CNAME` 文件,内容为 `www.sxxw.site`。
2. DNS 把 `www` 指向 GitHub Pages(或 Cloudflare Pages)。
3. 仓库 Settings → Pages 里确认自定义域名并开启 HTTPS。

> 备案期间可先用 Cloudflare Pages(免备案、全球含大陆勉强可用)发布合规页,满足应用商店审核;备案通过后再切腾讯云 CDN 做大陆加速。

## 动态服务(server/)

需要动态逻辑时,代码放 [`server/`](server/),部署到 HK 轻量服务器(`122.51.21.211`),经 Nginx 反代到 `api.sxxw.site`。前端统一通过 `SITE.api` 前缀调用。

技术栈 Go 标准库(零外部依赖,单二进制),已内置:

| 路由 | 用途 |
|---|---|
| `GET /health` | 健康检查 / 探活 |
| `POST /api/contact` | 表单收集(留资、反馈) |
| `GET /api/app-config/{slug}` | 客户端配置下发 / feature flag |

部署与新增服务的步骤见 [`server/README.md`](server/README.md)。
