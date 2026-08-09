import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

// 路由表:新增页面在此加一条 <Route>。
// 例:各 app 落地页 <Route path="/:app" .../>、合规页 <Route path="/:app/legal/:doc" .../>
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
