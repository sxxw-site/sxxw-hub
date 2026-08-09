import { useParams } from 'react-router-dom';
import { getApp } from '@/config/apps';
import DocPage from '@/components/DocPage';
import NotFoundPage from './NotFoundPage';

export default function SupportPage() {
  const { app: slug } = useParams();
  const app = slug ? getApp(slug) : undefined;
  if (!app) return <NotFoundPage />;

  return <DocPage app={app} title="技术支持" md={app.support?.md ?? ''} />;
}
