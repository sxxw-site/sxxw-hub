import { useLang, type Lang } from './lang';

// 界面文案(chrome)字典。内容型文案(产品/合规)走 products.json 的多语言字段。
const STRINGS = {
  zh: {
    nav_products: '产品',
    nav_about: '关于',
    nav_contact: '联系我们',
    hero_title_1: '打造下一代',
    hero_title_2: '移动应用体验',
    hero_sub:
      '我们是一支专注移动端的产品与工程团队,以克制的设计和扎实的工程,持续交付值得信赖的产品。',
    cta_browse: '浏览产品',
    cta_business: '商务合作',
    stat_products: '款产品',
    stat_live: '已上线',
    stat_global_value: '全球',
    stat_global: '部署',
    products_title: '旗下产品',
    products_sub: '覆盖记录、追踪与数据管理等场景',
    about_title: '关于',
    about_text:
      '专注于移动应用的设计与研发,追求性能、体验与可靠性的平衡。我们把每一款产品当作长期作品来打磨。',
    footer_rights: '版权所有',
    coming_soon: '即将上线',
    learn_more: '了解更多',
    home: '首页',
    appstore: 'App Store 下载',
    support: '技术支持',
    privacy: '隐私政策',
    terms: '用户协议',
    features_title: '功能亮点',
    screenshots_title: '产品截图',
    legal_title: '法律与合规',
    about_intro: '这里是产品介绍。',
    updated: '最后更新',
    not_found: '页面走丢了',
    back_home: '返回首页',
    doc_missing: '该文档暂未提供,请稍后查看。',
  },
  en: {
    nav_products: 'Products',
    nav_about: 'About',
    nav_contact: 'Contact',
    hero_title_1: 'Building the next generation of',
    hero_title_2: 'mobile experiences',
    hero_sub:
      'We are a product and engineering team focused on mobile, delivering trustworthy apps through restrained design and solid engineering.',
    cta_browse: 'Browse products',
    cta_business: 'Partnerships',
    stat_products: 'Products',
    stat_live: 'Live',
    stat_global_value: 'Global',
    stat_global: 'Availability',
    products_title: 'Our Products',
    products_sub: 'Covering journaling, tracking, and data management',
    about_title: 'About',
    about_text:
      'focuses on the design and development of mobile apps, striving for a balance of performance, experience, and reliability. We craft every product as a long-term work.',
    footer_rights: 'All rights reserved.',
    coming_soon: 'Coming soon',
    learn_more: 'Learn more',
    home: 'Home',
    appstore: 'Download on the App Store',
    support: 'Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    features_title: 'Features',
    screenshots_title: 'Screenshots',
    legal_title: 'Legal & Compliance',
    about_intro: 'Product overview.',
    updated: 'Updated',
    not_found: 'Page not found',
    back_home: 'Back to home',
    doc_missing: 'This document is not available yet. Please check back later.',
  },
} as const;

export type StringKey = keyof (typeof STRINGS)['zh'];

export function tr(lang: Lang, key: StringKey): string {
  return STRINGS[lang][key];
}

export function useT() {
  const { lang } = useLang();
  return (key: StringKey) => STRINGS[lang][key];
}
