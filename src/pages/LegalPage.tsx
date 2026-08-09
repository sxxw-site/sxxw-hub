import { useParams } from 'react-router-dom';
import { getApp } from '@/config/apps';
import DocPage from '@/components/DocPage';
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

  const legal = app.legal[key];
  return (
    <DocPage
      app={app}
      title={DOC_TITLE[key]}
      meta={legal.updated ? `最后更新 ${legal.updated}` : undefined}
      md={legal.md}
    />
  );
}
