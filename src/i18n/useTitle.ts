import { useEffect } from 'react';
import { useLang } from './lang';
import { SITE, companyName } from '@/config/apps';

// “官方网站”按语言(仅用于文档标题,不进主字典)。
const OFFICIAL: Record<string, string> = {
  zh: '官方网站',
  en: 'Official Site',
  es: 'Sitio oficial',
  fr: 'Site officiel',
  de: 'Offizielle Website',
  ja: '公式サイト',
  ko: '공식 사이트',
  pt: 'Site oficial',
  ru: 'Официальный сайт',
  ar: 'الموقع الرسمي',
  hi: 'आधिकारिक साइट',
  it: 'Sito ufficiale',
};

// 设置浏览器标签页标题。传 pageTitle 则为「页面 · 品牌」,否则为公司主页标题。
export function useTitle(pageTitle?: string) {
  const { lang } = useLang();
  useEffect(() => {
    const brand = lang === 'zh' ? SITE.brand : 'Shuxia Xiaowu';
    document.title = pageTitle
      ? `${pageTitle} · ${brand}`
      : `${companyName(lang)} · ${OFFICIAL[lang] ?? OFFICIAL.en}`;
  }, [pageTitle, lang]);
}
