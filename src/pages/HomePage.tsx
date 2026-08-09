import { Link } from 'react-router-dom';
import { APPS, SITE, asset, companyName, localize } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import { useTitle } from '@/i18n/useTitle';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import '@/styles/site.css';

export default function HomePage() {
  const { lang } = useLang();
  const t = useT();
  useTitle();
  const brandLabel = lang === 'en' ? SITE.brandEn : SITE.brand;

  return (
    <div className="mod">
      <SiteHeader />

      <section className="mod-hero">
        <div className="mod-container">
          <p className="mod-eyebrow">{companyName(lang)}</p>
          <h1>
            {t('hero_title_1')}
            <br />
            <span className="mod-grad">{t('hero_title_2')}</span>
          </h1>
          <p className="mod-sub">{t('hero_sub')}</p>
          <div className="mod-cta">
            <a className="mod-btn mod-btn-primary" href="#products">
              {t('cta_browse')} →
            </a>
            <a className="mod-btn mod-btn-ghost" href="#contact">
              {t('cta_business')}
            </a>
          </div>
          <div className="mod-stats">
            <div>
              <strong>{APPS.length}</strong>
              <span>{t('stat_products')}</span>
            </div>
            <div>
              <strong>{APPS.filter((a) => a.live).length}</strong>
              <span>{t('stat_live')}</span>
            </div>
            <div>
              <strong>{t('stat_global_value')}</strong>
              <span>{t('stat_global')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mod-section" id="products">
        <div className="mod-container">
          <div className="mod-section-head">
            <h2>{t('products_title')}</h2>
            <p>{t('products_sub')}</p>
          </div>
          <div className="mod-grid">
            {APPS.map((app) => (
              <Link
                key={app.slug}
                className="mod-card"
                to={`/${app.slug}`}
                style={{ ['--accent' as string]: app.accent }}
              >
                <div className="mod-card-top">
                  <img
                    className="mod-card-icon-img"
                    src={asset(app.icon)}
                    alt={`${app.name}`}
                    width={52}
                    height={52}
                    loading="lazy"
                  />
                  {!app.live && (
                    <span className="mod-tag">{t('coming_soon')}</span>
                  )}
                </div>
                <h3>
                  {app.name}
                  {lang === 'zh' && app.nameZh && (
                    <span className="mod-card-zh">{app.nameZh}</span>
                  )}
                </h3>
                <p>{localize(app, lang).tagline}</p>
                <span className="mod-card-arrow">{t('learn_more')} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mod-section mod-about" id="about">
        <div className="mod-container">
          <h2>
            {t('about_title')} {brandLabel}
          </h2>
          <p className="mod-about-text">{t('about_text')}</p>
          <p className="mod-about-company">{companyName(lang)}</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
