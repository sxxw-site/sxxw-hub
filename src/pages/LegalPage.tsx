import { useParams, useSearchParams } from 'react-router-dom';
import { getApp, docUrl, privacyDocUrl } from '@/config/apps';
import { useLang } from '@/i18n/lang';
import { useT } from '@/i18n/strings';
import DocPage from '@/components/DocPage';
import NotFoundPage from './NotFoundPage';

type DocKey = 'privacy' | 'terms';

export default function LegalPage() {
  const { app: slug, doc } = useParams();
  const [searchParams] = useSearchParams();
  const { lang } = useLang();
  const t = useT();
  const app = slug ? getApp(slug) : undefined;
  const key = doc as DocKey;
  if (!app || (key !== 'privacy' && key !== 'terms')) return <NotFoundPage />;

  const updated = app.legal[key].updated;
  const isMemoriaPrivacy = app.slug === 'memoria' && key === 'privacy';
  const store = searchParams.get('store') === 'huawei' ? 'huawei' : 'app-store';
  const tabs = isMemoriaPrivacy
    ? [
        {
          label: 'App Store',
          to: `/${app.slug}/legal/privacy?store=app-store`,
          active: store === 'app-store',
        },
        {
          label: '华为应用市场',
          to: `/${app.slug}/legal/privacy?store=huawei`,
          active: store === 'huawei',
        },
      ]
    : undefined;
  return (
    <DocPage
      app={app}
      title={t(key)}
      meta={updated ? `${t('updated')} ${updated}` : undefined}
      src={
        isMemoriaPrivacy
          ? privacyDocUrl(app.slug, lang, store)
          : docUrl(app.slug, lang, key)
      }
      tabs={tabs}
    />
  );
}
