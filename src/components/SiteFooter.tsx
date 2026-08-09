import { SITE, companyName } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';

export default function SiteFooter() {
  const { lang } = useLang();
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer className="mod-footer" id="contact">
      <div className="mod-container mod-footer-grid">
        <div>
          <div className="mod-logo">{SITE.brand}</div>
          <p className="mod-footer-company">
            {lang === 'en' ? SITE.companyEn : SITE.company}
          </p>
        </div>
        <div className="mod-footer-contact">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`https://${SITE.domain}`}>{SITE.domain}</a>
        </div>
      </div>
      <div className="mod-container mod-footer-bar">
        <span>
          © {year} {companyName(lang)} · {t('footer_rights')}
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
