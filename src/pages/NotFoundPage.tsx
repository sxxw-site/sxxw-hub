import { Link } from 'react-router-dom';
import { useT } from '@/i18n/strings';
import { useTitle } from '@/i18n/useTitle';

export default function NotFoundPage() {
  const t = useT();
  useTitle(t('not_found'));
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeContent: 'center',
        textAlign: 'center',
        gap: '12px',
        background: '#0a0c11',
        color: '#eef1f6',
        padding: '24px',
      }}
    >
      <h1 style={{ fontSize: '64px', margin: 0 }}>404</h1>
      <p style={{ color: '#8b93a3', margin: 0 }}>{t('not_found')}</p>
      <Link to="/" style={{ color: '#6d5ef0', fontWeight: 600 }}>
        {t('back_home')}
      </Link>
    </div>
  );
}
