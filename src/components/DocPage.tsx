import { Link } from 'react-router-dom';
import type { Product } from '@/config/apps';
import { asset } from '@/config/apps';
import Layout from './Layout';
import Markdown from './Markdown';

// 内容页(合规 / 技术支持)统一外壳:与落地页一致的品牌视觉。
// 正文里第一行的 `# 标题` 会被 Hero 取代,避免重复。
export default function DocPage({
  app,
  title,
  meta,
  md,
}: {
  app: Product;
  title: string;
  meta?: string;
  md: string;
}) {
  const body = md.replace(/^#\s+.*(?:\n+|$)/, '');
  return (
    <Layout>
      <div
        className="mod-container mod-page"
        style={{ ['--accent' as string]: app.accent }}
      >
        <header className="mod-doc-hero">
          <p className="mod-breadcrumb">
            <Link to="/">首页</Link> /{' '}
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
                {app.nameZh && ` · ${app.nameZh}`}
              </p>
              <h1>{title}</h1>
              {meta && <span className="mod-doc-pill">{meta}</span>}
            </div>
          </div>
        </header>

        <article className="mod-doc">
          {body.trim() ? <Markdown text={body} /> : <p>该文档暂未提供。</p>}
        </article>
      </div>
    </Layout>
  );
}
