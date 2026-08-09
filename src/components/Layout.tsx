import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import '@/styles/site.css';

// 内容页统一外壳:深色主题(.mod)+ 共享页头页脚。
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mod">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
