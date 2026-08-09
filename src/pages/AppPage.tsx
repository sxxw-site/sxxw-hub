import { useParams, Link } from 'react-router-dom';
import { getApp } from '@/config/apps';
import Layout from '@/components/Layout';
import NotFoundPage from './NotFoundPage';

export default function AppPage() {
  const { app: slug } = useParams();
  const app = slug ? getApp(slug) : undefined;
  if (!app) return <NotFoundPage />;

  return (
    <Layout>
      <div className="mod-container mod-page">
        <p className="mod-breadcrumb">
          <Link to="/">首页</Link> / {app.name}
        </p>

        <div className="mod-card-top" style={{ maxWidth: 640 }}>
          <span
            className="mod-card-icon"
            style={{ ['--accent' as string]: app.accent }}
          >
            {app.icon ?? '▣'}
          </span>
          {!app.live && <span className="mod-tag">即将上线</span>}
        </div>

        <h1>{app.name}</h1>
        <p className="mod-lead">{app.desc ?? app.tagline}</p>

        <p className="mod-lead">
          这里是 {app.name} 的产品介绍。TODO:补充功能亮点、产品截图与下载入口。
        </p>

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
      </div>
    </Layout>
  );
}
