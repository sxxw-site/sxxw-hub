import { useParams } from 'react-router-dom';
import { getApp, localize } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import DocPage from '@/components/DocPage';
import NotFoundPage from './NotFoundPage';

type DocKey = 'privacy' | 'terms';

export default function LegalPage() {
  const { app: slug, doc } = useParams();
  const { lang } = useLang();
  const t = useT();
  const app = slug ? getApp(slug) : undefined;
  const key = doc as DocKey;
  if (!app || (key !== 'privacy' && key !== 'terms')) return <NotFoundPage />;

  const legal = localize(app, lang).legal[key];
  return (
    <DocPage
      app={app}
      title={t(key)}
      meta={legal.updated ? `${t('updated')} ${legal.updated}` : undefined}
      md={legal.md}
    />
  );
}
