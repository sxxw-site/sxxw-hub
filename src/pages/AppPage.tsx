import { useParams, Link } from 'react-router-dom';
import { getApp, asset, localize } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import { useTitle } from '@/i18n/useTitle';
import Layout from '@/components/Layout';
import NotFoundPage from './NotFoundPage';

export default function AppPage() {
  const { app: slug } = useParams();
  const { lang } = useLang();
  const t = useT();
  const app = slug ? getApp(slug) : undefined;
  useTitle(app ? app.name : t('not_found'));
  if (!app) return <NotFoundPage />;
  const c = localize(app, lang);

  return (
    <Layout>
      <div
        className="mod-container mod-page"
        style={{ ['--accent' as string]: app.accent }}
      >
        <p className="mod-breadcrumb">
          <Link to="/">{t('home')}</Link> / {app.name}
        </p>

        <div className="mod-app-hero">
          <img
            className="mod-app-icon"
            src={asset(app.icon)}
            alt={app.name}
            width={104}
            height={104}
          />
          <div className="mod-app-head">
            <h1>
              {app.name}
              {lang === 'zh' && app.nameZh && (
                <span className="mod-app-zh">{app.nameZh}</span>
              )}
            </h1>
            <p className="mod-lead">{c.tagline}</p>
            <div className="mod-badges">
              {app.platforms.map((p) => (
                <span key={p} className="mod-badge">
                  {p}
                </span>
              ))}
              {!app.live && <span className="mod-tag">{t('coming_soon')}</span>}
            </div>
            <div className="mod-store-grid">
              {app.links.appStore && (
                <a
                  className="mod-store-card mod-store-card-primary"
                  href={app.links.appStore}
                  target="_blank"
                  rel="noopener"
                >
                  <span>App Store</span>
                  <strong>{t('appstore')} →</strong>
                </a>
              )}
              {app.slug === 'memoria' && (
                <Link
                  className="mod-store-card"
                  to={`/${app.slug}/legal/privacy?store=huawei`}
                >
                  <span>华为应用市场</span>
                  <strong>拾忆 · 隐私政策 →</strong>
                </Link>
              )}
            </div>
            <div className="mod-doclinks mod-app-support-link">
              <Link className="mod-btn mod-btn-ghost" to={`/${app.slug}/support`}>
                {t('support')}
              </Link>
            </div>
          </div>
        </div>

        <p className="mod-app-desc">{c.description}</p>

        {c.features.length > 0 && (
          <section className="mod-app-section">
            <h2>{t('features_title')}</h2>
            <div className="mod-feature-grid">
              {c.features.map((f) => (
                <div key={f.title} className="mod-feature">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {app.screenshots.length > 0 && (
          <section className="mod-app-section">
            <h2>{t('screenshots_title')}</h2>
            <div className="mod-shots">
              {app.screenshots.map((s, i) => (
                <img
                  key={s}
                  className="mod-shot"
                  src={asset(s)}
                  alt={`${app.name} ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mod-app-section">
          <h2>{t('legal_title')}</h2>
          <div className="mod-doclinks">
            <Link
              className="mod-btn mod-btn-ghost"
              to={`/${app.slug}/legal/privacy${
                app.slug === 'memoria' ? '?store=app-store' : ''
              }`}
            >
              {t('privacy')}
            </Link>
            <Link
              className="mod-btn mod-btn-ghost"
              to={`/${app.slug}/legal/terms`}
            >
              {t('terms')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
