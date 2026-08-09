import { Link } from 'react-router-dom';
import { SITE } from '@/config/apps';

// 首页锚点链接:带上 base 前缀,子页面点击也能回到首页对应板块。
const home = import.meta.env.BASE_URL;

export default function SiteHeader() {
  return (
    <header className="mod-header">
      <div className="mod-container mod-nav">
        <Link to="/" className="mod-logo">
          {SITE.brand}
          <span className="mod-logo-en">{SITE.brandEn}</span>
        </Link>
        <nav className="mod-navlinks">
          <a href={`${home}#products`}>产品</a>
          <a href={`${home}#about`}>关于</a>
          <a className="mod-nav-cta" href={`${home}#contact`}>
            联系我们
          </a>
        </nav>
      </div>
    </header>
  );
}
