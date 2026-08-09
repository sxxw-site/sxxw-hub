import { SITE } from '@/config/apps';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mod-footer" id="contact">
      <div className="mod-container mod-footer-grid">
        <div>
          <div className="mod-logo">{SITE.brand}</div>
          <p className="mod-footer-company">{SITE.companyEn}</p>
        </div>
        <div className="mod-footer-contact">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`https://${SITE.domain}`}>{SITE.domain}</a>
        </div>
      </div>
      <div className="mod-container mod-footer-bar">
        <span>
          © {year} {SITE.company} 版权所有
        </span>
        {SITE.icp && (
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
            {SITE.icp}
          </a>
        )}
      </div>
    </footer>
  );
}
