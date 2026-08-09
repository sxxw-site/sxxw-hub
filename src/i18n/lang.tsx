/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Lang =
  | 'zh'
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'ar'
  | 'hi'
  | 'it';

// 语言清单:代码 + 原生名称 + 文字方向。顺序即选择器展示顺序。
export const LANGS: { code: Lang; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'zh', label: '中文', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', dir: 'ltr' },
  { code: 'ja', label: '日本語', dir: 'ltr' },
  { code: 'ko', label: '한국어', dir: 'ltr' },
  { code: 'pt', label: 'Português', dir: 'ltr' },
  { code: 'ru', label: 'Русский', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'hi', label: 'हिन्दी', dir: 'ltr' },
  { code: 'it', label: 'Italiano', dir: 'ltr' },
];

const CODES = LANGS.map((l) => l.code);
const KEY = 'sxxw-lang';

function detect(): Lang {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(KEY) as Lang | null;
  if (saved && CODES.includes(saved)) return saved;
  const nav = navigator.language?.toLowerCase() ?? '';
  const hit = CODES.find((c) => nav === c || nav.startsWith(c + '-'));
  return hit ?? 'en';
}

export function dirOf(lang: Lang): 'ltr' | 'rtl' {
  return LANGS.find((l) => l.code === lang)?.dir ?? 'ltr';
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}
const LangCtx = createContext<Ctx>({ lang: 'zh', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang === 'zh' ? 'zh-CN' : lang;
    el.dir = dirOf(lang);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        window.localStorage.setItem(KEY, l);
      },
    }),
    [lang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangCtx);
}
