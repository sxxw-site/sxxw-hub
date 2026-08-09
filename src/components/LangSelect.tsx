import { LANGS, useLang, type Lang } from '@/i18n/lang';

export default function LangSelect() {
  const { lang, setLang } = useLang();
  return (
    <select
      className="mod-lang"
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      aria-label="Language / 语言"
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
