import { useParams, Link } from 'react-router-dom';
import { getApp } from '@/config/apps';
import Layout from '@/components/Layout';
import Markdown from '@/components/Markdown';
import NotFoundPage from './NotFoundPage';

export default function SupportPage() {
  const { app: slug } = useParams();
  const app = slug ? getApp(slug) : undefined;
  if (!app) return <NotFoundPage />;

  const md = app.support?.md;

  return (
    <Layout>
      <div className="mod-container mod-page mod-prose">
        <p className="mod-breadcrumb">
          <Link to="/">首页</Link> / <Link to={`/${app.slug}`}>{app.name}</Link>{' '}
          / 技术支持
        </p>
        {md ? <Markdown text={md} /> : <p>该文档暂未提供,请稍后查看。</p>}
      </div>
    </Layout>
  );
}
