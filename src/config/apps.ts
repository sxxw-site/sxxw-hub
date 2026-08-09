// 产品数据由各 app 项目的 sxxw-web/ 聚合而来(见 scripts/sync-apps.mjs)。
// 不要手改 src/content/products.json —— 改各 app 的 sxxw-web/ 后跑 `npm run sync`。
import productsData from '@/content/products.json';

export interface Feature {
  title: string;
  desc: string;
}
export interface LegalDoc {
  updated: string;
  md: string;
}
export interface Product {
  slug: string;
  name: string;
  nameZh: string;
  tagline: string;
  description: string;
  features: Feature[];
  platforms: string[];
  accent: string;
  live: boolean;
  links: { appStore?: string; support?: string; privacy?: string };
  icon: string;
  screenshots: string[];
  legal: { privacy: LegalDoc; terms: LegalDoc };
}

export const SITE = {
  brand: '树下小屋',
  brandEn: 'sxxw',
  // 公司主体信息(用于官方站、页脚、关于页、合规页)
  company: '上海树下小屋网络科技有限公司',
  companyEn: 'Shanghai Shuxia Xiaowu Network Technology Co., Ltd.',
  domain: 'www.sxxw.site',
  email: 'house@sxxw.site', // 商务合作对外邮箱
  // ICP 备案号:备案通过后填写,页脚会自动展示(留空则不显示)
  icp: '',
  // 动态服务入口(HK 轻量服务器),前端调用统一走这个前缀
  api: 'https://api.sxxw.site',
} as const;

export const APPS = productsData as Product[];

export function getApp(slug: string): Product | undefined {
  return APPS.find((a) => a.slug === slug);
}

// public/ 下的素材需带上部署 base 前缀(项目页在 /sxxw-hub/ 子路径)。
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path;
}
