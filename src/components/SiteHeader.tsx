import { Link } from 'react-router-dom';
import { SITE } from '@/config/apps';
import { useT } from '@/i18n/strings';
import LangSelect from './LangSelect';

// 首页锚点链接:带上 base 前缀,子页面点击也能回到首页对应板块。
const home = import.meta.env.BASE_URL;

export default function SiteHeader() {
  const t = useT();
  return (
    <header className="mod-header">
      <div className="mod-container mod-nav">
        <Link to="/" className="mod-logo">
          {SITE.brand}
          <span className="mod-logo-en">{SITE.brandEn}</span>
        </Link>
        <nav className="mod-navlinks">
          <a href={`${home}#products`}>{t('nav_products')}</a>
          <a href={`${home}#about`}>{t('nav_about')}</a>
          <LangSelect />
          <a className="mod-nav-cta" href={`${home}#contact`}>
            {t('nav_contact')}
          </a>
        </nav>
      </div>
    </header>
  );
}
