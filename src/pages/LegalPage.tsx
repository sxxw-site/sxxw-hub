import { useParams, Link } from 'react-router-dom';
import { getApp } from '@/config/apps';
import Layout from '@/components/Layout';
import Markdown from '@/components/Markdown';
import NotFoundPage from './NotFoundPage';

type DocKey = 'privacy' | 'terms';
const DOC_TITLE: Record<DocKey, string> = {
  privacy: '隐私政策',
  terms: '用户协议',
};

export default function LegalPage() {
  const { app: slug, doc } = useParams();
  const app = slug ? getApp(slug) : undefined;
  const key = doc as DocKey;
  if (!app || (key !== 'privacy' && key !== 'terms')) return <NotFoundPage />;

  const md = app.legal[key].md;

  return (
    <Layout>
      <div className="mod-container mod-page mod-prose">
        <p className="mod-breadcrumb">
          <Link to="/">首页</Link> / <Link to={`/${app.slug}`}>{app.name}</Link>{' '}
          / {DOC_TITLE[key]}
        </p>
        {md ? <Markdown text={md} /> : <p>该文档暂未提供,请稍后查看。</p>}
      </div>
    </Layout>
  );
}
