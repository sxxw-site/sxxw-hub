import { useParams, Link } from 'react-router-dom';
import { getApp, asset } from '@/config/apps';
import Layout from '@/components/Layout';
import NotFoundPage from './NotFoundPage';

export default function AppPage() {
  const { app: slug } = useParams();
  const app = slug ? getApp(slug) : undefined;
  if (!app) return <NotFoundPage />;

  return (
    <Layout>
      <div
        className="mod-container mod-page"
        style={{ ['--accent' as string]: app.accent }}
      >
        <p className="mod-breadcrumb">
          <Link to="/">首页</Link> / {app.name}
        </p>

        {/* 产品头部 */}
        <div className="mod-app-hero">
          <img
            className="mod-app-icon"
            src={asset(app.icon)}
            alt={`${app.name} 图标`}
            width={104}
            height={104}
          />
          <div className="mod-app-head">
            <h1>
              {app.name}
              {app.nameZh && <span className="mod-app-zh">{app.nameZh}</span>}
            </h1>
            <p className="mod-lead">{app.tagline}</p>
            <div className="mod-badges">
              {app.platforms.map((p) => (
                <span key={p} className="mod-badge">
                  {p}
                </span>
              ))}
              {!app.live && <span className="mod-tag">即将上线</span>}
            </div>
            <div className="mod-doclinks">
              {app.links.appStore && (
                <a
                  className="mod-btn mod-btn-primary"
                  href={app.links.appStore}
                  target="_blank"
                  rel="noopener"
                >
                  App Store 下载 →
                </a>
              )}
              {app.links.support && (
                <a
                  className="mod-btn mod-btn-ghost"
                  href={app.links.support}
                  target="_blank"
                  rel="noopener"
                >
                  技术支持
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mod-app-desc">{app.description}</p>

        {/* 功能亮点 */}
        {app.features.length > 0 && (
          <section className="mod-app-section">
            <h2>功能亮点</h2>
            <div className="mod-feature-grid">
              {app.features.map((f) => (
                <div key={f.title} className="mod-feature">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 截图 */}
        {app.screenshots.length > 0 && (
          <section className="mod-app-section">
            <h2>产品截图</h2>
            <div className="mod-shots">
              {app.screenshots.map((s, i) => (
                <img
                  key={s}
                  className="mod-shot"
                  src={asset(s)}
                  alt={`${app.name} 截图 ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        {/* 法律与合规 */}
        <section className="mod-app-section">
          <h2>法律与合规</h2>
          <div className="mod-doclinks">
            <Link
              className="mod-btn mod-btn-ghost"
              to={`/${app.slug}/legal/privacy`}
            >
              隐私政策
            </Link>
            <Link
              className="mod-btn mod-btn-ghost"
              to={`/${app.slug}/legal/terms`}
            >
              用户协议
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
