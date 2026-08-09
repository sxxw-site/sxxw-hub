# 开发协作规范

## 环境

- Node 22(见 `.nvmrc`,建议 `nvm use`)
- Go 1.22+(仅 `server/` 需要)

首次:

```bash
npm install          # 前端依赖
```

## 分支策略

- `main`:受保护,始终可部署。推到 `main` 会自动构建并发布到 GitHub Pages。
- 功能/修复一律走**特性分支** + Pull Request,禁止直接推 `main`。

分支命名:

| 前缀 | 用途 | 示例 |
|---|---|---|
| `feat/` | 新功能 | `feat/memoria-landing` |
| `fix/` | 修复 | `fix/footer-icp-link` |
| `chore/` | 杂项/工具 | `chore/upgrade-vite` |
| `docs/` | 文档 | `docs/deploy-guide` |

## 提交信息(Conventional Commits)

```
<type>(<scope>): <简述>
```

- `type`:`feat` / `fix` / `docs` / `chore` / `refactor` / `style` / `test`
- `scope`(可选):`web` / `server` / `ci` 等
- 示例:`feat(web): 新增 Memoria 落地页`

## 提交前自检

前端:

```bash
npm run format       # 格式化
npm run lint         # 静态检查
npm run typecheck    # 类型检查
npm run build        # 构建
```

服务端:

```bash
cd server && make check   # gofmt + vet + build
```

以上正是 CI(`.github/workflows/ci.yml`)会跑的检查,PR 需全绿方可合并。

## PR 流程

1. 从最新 `main` 切特性分支。
2. 提交并推送分支,开 PR 到 `main`。
3. 等待 CI 通过 + Review。
4. 合并(建议 Squash),删除分支。
5. 合并到 `main` 后自动部署。

## 目录速览

- 前端页面 → `src/pages/`,路由在 `src/App.tsx`。
- 站点/产品数据 → `src/config/apps.ts`(单一数据源)。
- 动态服务 → `server/`(Go),部署见 `server/README.md`。
