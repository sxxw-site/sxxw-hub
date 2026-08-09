import { fileURLToPath, URL } from 'node:url';
import { copyFileSync, existsSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 没有服务端路由,深链(如 /memoria)刷新会 404。
// 把构建出的 index.html 复制一份为 404.html,Pages 便会用它兜底,
// 交给前端 React Router 接管路由。
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dir = 'dist';
      const index = `${dir}/index.html`;
      if (existsSync(index)) copyFileSync(index, `${dir}/404.html`);
    },
  };
}

// base 说明:
// - 当前部署在项目页 https://sxxw-site.github.io/sxxw-hub/(子路径),必须为 '/sxxw-hub/',
//   否则 /assets/... 会 404 导致白屏。
// - 备案完成、绑定自定义域名 www.sxxw.site(根路径)后,改回 '/'。
export default defineConfig({
  base: '/sxxw-hub/',
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
