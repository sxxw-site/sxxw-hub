import { useParams } from 'react-router-dom';
import { getApp, localize } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import DocPage from '@/components/DocPage';
import NotFoundPage from './NotFoundPage';

export default function SupportPage() {
  const { app: slug } = useParams();
  const { lang } = useLang();
  const t = useT();
  const app = slug ? getApp(slug) : undefined;
  if (!app) return <NotFoundPage />;

  return (
    <DocPage
      app={app}
      title={t('support')}
      md={localize(app, lang).support.md}
    />
  );
}
