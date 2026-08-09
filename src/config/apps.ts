// 全线产品注册表 —— 新增一个 app 就在这里加一条,首页会自动列出。
// slug 决定路由前缀:/{slug}/、/{slug}/legal/privacy 等。

export interface AppInfo {
  slug: string;
  name: string;
  tagline: string;
  /** 一句话稍长描述,用于首页产品卡片 */
  desc?: string;
  /** 主题色,用于卡片点缀 */
  accent: string;
  /** emoji 或占位图标 */
  icon?: string;
  /** 是否已上线(未上线仅占位,不在首页高亮) */
  live?: boolean;
}

export const SITE = {
  brand: '树下小屋',
  brandEn: 'sxxw',
  // 公司主体信息(用于官方站、页脚、关于页、合规页)
  company: '上海树下小屋网络科技有限公司',
  companyEn: 'Shanghai Shuxia Xiaowu Network Technology Co., Ltd.',
  domain: 'www.sxxw.site',
  email: 'contact@sxxw.site', // TODO: 换成正式对外邮箱
  // ICP 备案号:备案通过后填写,页脚会自动展示(留空则不显示)
  icp: '',
  // 动态服务入口(HK 轻量服务器),前端调用统一走这个前缀
  api: 'https://api.sxxw.site',
} as const;

export const APPS: AppInfo[] = [
  {
    slug: 'memoria',
    name: 'Memoria',
    tagline: '记录与回忆你的每一刻',
    desc: '轻量的日记与回忆管理,把值得记住的瞬间温柔收好。',
    accent: '#6d5ef0',
    icon: '📖',
    live: true,
  },
  {
    slug: 'timetrails',
    name: 'TimeTrails',
    tagline: '追踪时间,看见轨迹',
    desc: '直观的时间与习惯追踪,让每一分投入都被看见。',
    accent: '#0ea5a4',
    icon: '⏱️',
  },
  {
    slug: 'traceapp',
    name: 'TraceApp',
    tagline: '让数据留下痕迹',
    desc: '为你的数据建立清晰的记录与回溯路径。',
    accent: '#f5793b',
    icon: '🧭',
  },
];

export function getApp(slug: string): AppInfo | undefined {
  return APPS.find((a) => a.slug === slug);
}
