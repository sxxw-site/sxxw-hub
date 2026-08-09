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

// 自定义域名 www.sxxw.site 时 base 保持 '/';
// 若临时挂 <user>.github.io/sxxw-hub 子路径,把 base 改成 '/sxxw-hub/'。
export default defineConfig({
  base: '/',
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
