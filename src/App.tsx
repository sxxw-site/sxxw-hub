import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AppPage from '@/pages/AppPage';
import SupportPage from '@/pages/SupportPage';
import LegalPage from '@/pages/LegalPage';
import NotFoundPage from '@/pages/NotFoundPage';

// 路由表。app 落地页与合规页由 src/config/apps.ts 的数据驱动,
// 新增 app 只需在配置里加一条,无需改这里。
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:app" element={<AppPage />} />
      <Route path="/:app/support" element={<SupportPage />} />
      <Route path="/:app/legal/:doc" element={<LegalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
