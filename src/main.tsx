import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { LangProvider } from '@/i18n/lang';
import '@/index.css';

// 与 Vite 的 base 对齐(项目页在 /sxxw-hub/ 子路径),否则路由匹配不到首页。
// import.meta.env.BASE_URL 形如 '/sxxw-hub/';React Router 的 basename 去掉末尾斜杠。
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
);
