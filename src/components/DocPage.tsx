import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/config/apps';
import { asset } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import Layout from './Layout';
import Markdown from './Markdown';

// 内容页(合规 / 技术支持)统一外壳:与落地页一致的品牌视觉。
// 正文从 src(public 下的 .md)按需 fetch,不打进 JS 主包。
export default function DocPage({
  app,
  title,
  meta,
  src,
}: {
  app: Product;
  title: string;
  meta?: string;
  src: string;
}) {
  const { lang } = useLang();
  const t = useT();
  const [md, setMd] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setMd(null);
    fetch(src)
      .then((r) => (r.ok ? r.text() : ''))
      .then((text) => alive && setMd(text))
      .catch(() => alive && setMd(''));
    return () => {
      alive = false;
    };
  }, [src]);

  // 去掉正文首行的 `# 标题`(由 Hero 展示,避免重复)。
  const body = md ? md.replace(/^#\s+.*(?:\n+|$)/, '') : '';

  return (
    <Layout>
      <div
        className="mod-container mod-page"
        style={{ ['--accent' as string]: app.accent }}
      >
        <header className="mod-doc-hero">
          <p className="mod-breadcrumb">
            <Link to="/">{t('home')}</Link> /{' '}
            <Link to={`/${app.slug}`}>{app.name}</Link> / {title}
          </p>
          <div className="mod-doc-hero-main">
            <img
              className="mod-doc-icon"
              src={asset(app.icon)}
              alt=""
              width={56}
              height={56}
            />
            <div>
              <p className="mod-doc-eyebrow">
                {app.name}
                {lang === 'zh' && app.nameZh && ` · ${app.nameZh}`}
              </p>
              <h1>{title}</h1>
              {meta && <span className="mod-doc-pill">{meta}</span>}
            </div>
          </div>
        </header>

        <article className="mod-doc">
          {md === null ? (
            <p className="mod-doc-loading">…</p>
          ) : body.trim() ? (
            <Markdown text={body} />
          ) : (
            <p>{t('doc_missing')}</p>
          )}
        </article>
      </div>
    </Layout>
  );
}
