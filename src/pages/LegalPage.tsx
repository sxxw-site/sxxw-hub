import { useParams, Link } from 'react-router-dom';
import { getApp, SITE } from '@/config/apps';
import Layout from '@/components/Layout';
import NotFoundPage from './NotFoundPage';

// 每次修订合规内容时更新此日期。
const UPDATED = '2026-08-09';

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

  return (
    <Layout>
      <div className="mod-container mod-page mod-prose">
        <p className="mod-breadcrumb">
          <Link to="/">首页</Link> / <Link to={`/${app.slug}`}>{app.name}</Link>{' '}
          / {DOC_TITLE[key]}
        </p>
        <h1>
          {app.name} {DOC_TITLE[key]}
        </h1>
        <p className="mod-updated">最近更新:{UPDATED}</p>

        {key === 'privacy' ? (
          <Privacy appName={app.name} />
        ) : (
          <Terms appName={app.name} />
        )}

        <h2>联系我们</h2>
        <p>
          如有疑问,请联系:<a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <p>
          {SITE.company} · {SITE.companyEn}
        </p>
      </div>
    </Layout>
  );
}

function Privacy({ appName }: { appName: string }) {
  return (
    <>
      <p>
        {SITE.company}(以下简称“我们”)非常重视您的隐私。本政策说明我们在您使用
        {appName} 时如何收集、使用、存储和保护您的个人信息。
      </p>
      <h2>一、我们收集的信息</h2>
      <p>TODO:列明收集的信息类型(账号信息、设备信息、日志等)及收集场景。</p>
      <h2>二、信息的使用</h2>
      <p>TODO:说明信息用途。</p>
      <h2>三、信息的共享、存储与保护</h2>
      <p>TODO:说明第三方共享、存储期限与安全措施。</p>
      <h2>四、您的权利</h2>
      <p>TODO:访问、更正、删除、注销账号等权利及行使方式。</p>
    </>
  );
}

function Terms({ appName }: { appName: string }) {
  return (
    <>
      <p>
        欢迎使用 {appName}。本协议是您与 {SITE.company}
        之间就使用本产品服务所订立的协议,请您在使用前仔细阅读。
      </p>
      <h2>一、服务内容</h2>
      <p>TODO:描述产品提供的服务范围。</p>
      <h2>二、用户行为规范</h2>
      <p>TODO:列明禁止行为与用户责任。</p>
      <h2>三、知识产权</h2>
      <p>TODO:说明知识产权归属。</p>
      <h2>四、免责与责任限制</h2>
      <p>TODO:说明责任范围与限制。</p>
      <h2>五、协议的变更与终止</h2>
      <p>TODO:说明变更、终止规则。</p>
    </>
  );
}
