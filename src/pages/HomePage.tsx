import { Link } from 'react-router-dom';
import { APPS, SITE } from '@/config/apps';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import '@/styles/site.css';

export default function HomePage() {
  return (
    <div className="mod">
      <SiteHeader />

      <section className="mod-hero">
        <div className="mod-container">
          <p className="mod-eyebrow">{SITE.company}</p>
          <h1>
            打造下一代
            <br />
            <span className="mod-grad">移动应用体验</span>
          </h1>
          <p className="mod-sub">
            我们是一支专注移动端的产品与工程团队,以克制的设计和扎实的工程,
            持续交付值得信赖的产品。
          </p>
          <div className="mod-cta">
            <a className="mod-btn mod-btn-primary" href="#products">
              浏览产品 →
            </a>
            <a className="mod-btn mod-btn-ghost" href="#contact">
              商务合作
            </a>
          </div>
          <div className="mod-stats">
            <div>
              <strong>{APPS.length}</strong>
              <span>款产品</span>
            </div>
            <div>
              <strong>{APPS.filter((a) => a.live).length}</strong>
              <span>已上线</span>
            </div>
            <div>
              <strong>全球</strong>
              <span>部署</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mod-section" id="products">
        <div className="mod-container">
          <div className="mod-section-head">
            <h2>旗下产品</h2>
            <p>覆盖记录、追踪与数据管理等场景</p>
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
                  <span className="mod-card-icon">{app.icon ?? '▣'}</span>
                  {!app.live && <span className="mod-tag">即将上线</span>}
                </div>
                <h3>{app.name}</h3>
                <p>{app.desc ?? app.tagline}</p>
                <span className="mod-card-arrow">了解更多 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mod-section mod-about" id="about">
        <div className="mod-container">
          <h2>关于 {SITE.brand}</h2>
          <p className="mod-about-text">
            {SITE.company}
            专注于移动应用的设计与研发,追求性能、体验与可靠性的平衡。我们把每一款产品
            当作长期作品来打磨。
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
