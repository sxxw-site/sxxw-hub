import { Link } from 'react-router-dom';

export default function NotFoundPage() {
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
      <p style={{ color: '#8b93a3', margin: 0 }}>页面走丢了</p>
      <Link to="/" style={{ color: '#6d5ef0', fontWeight: 600 }}>
        返回首页
      </Link>
    </div>
  );
}
