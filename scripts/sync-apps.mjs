// 从各 app 项目的 sxxw-web/ 内容源聚合到官网。
//
// 每个 app 仓库自维护 sxxw-web/{product.json, privacy.md, terms.md} 与素材,
// 本脚本负责:拷贝 图标/截图 到 public/apps/<slug>/,并生成
// src/content/products.json(内联隐私/协议正文 + web 素材路径)。
//
// 用法:npm run sync            (默认从同级目录读取各 app)
// 生成物需提交入库,以便 CI 构建时无需访问各 app 仓库。

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  rmSync,
} from 'node:fs';
import { dirname, join, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// 支持的语言(须与 src/i18n/lang.tsx 的 Lang 一致)。
const LANGS = [
  'zh',
  'en',
  'es',
  'fr',
  'de',
  'ja',
  'ko',
  'pt',
  'ru',
  'ar',
  'hi',
  'it',
];

// slug → app 项目目录(相对本仓库)。如目录结构不同,改这里即可。
const MANIFEST = [
  { slug: 'memoria', dir: '../Memoria' },
  { slug: 'timetrails', dir: '../TimeTrails' },
  { slug: 'traceapp', dir: '../TraceApp' },
];

const publicApps = join(root, 'public', 'apps');
const products = [];

for (const { slug, dir } of MANIFEST) {
  const appRoot = resolve(root, dir);
  const srcDir = join(appRoot, 'sxxw-web');
  const productFile = join(srcDir, 'product.json');
  if (!existsSync(productFile)) {
    console.warn(`⚠ 跳过 ${slug}:未找到 ${productFile}`);
    continue;
  }

  const p = JSON.parse(readFileSync(productFile, 'utf8'));
  const outDir = join(publicApps, slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  // 图标
  let iconWeb = '';
  const iconAbs = join(appRoot, p.assets?.icon ?? '');
  if (p.assets?.icon && existsSync(iconAbs)) {
    const name = `icon${extname(iconAbs)}`;
    copyFileSync(iconAbs, join(outDir, name));
    iconWeb = `apps/${slug}/${name}`;
  } else {
    console.warn(`⚠ ${slug}:图标缺失 ${iconAbs}`);
  }

  // 截图
  const shotsWeb = [];
  (p.assets?.screenshots ?? []).forEach((rel, i) => {
    const abs = join(appRoot, rel);
    if (!existsSync(abs)) {
      console.warn(`⚠ ${slug}:截图缺失 ${abs}`);
      return;
    }
    const name = `shot-${String(i + 1).padStart(2, '0')}${extname(abs)}`;
    copyFileSync(abs, join(outDir, name));
    shotsWeb.push(`apps/${slug}/${name}`);
  });

  const readMd = (f) => {
    const abs = join(srcDir, f);
    return existsSync(abs) ? readFileSync(abs, 'utf8') : '';
  };
  // 语言文件后缀:中文用无后缀(privacy.md),其余用 privacy.<code>.md
  const mdOf = (lang, base) =>
    readMd(`${base}${lang === 'zh' ? '' : '.' + lang}.md`);
  // 回退链:请求语言 → 英文 → 中文
  const pickMd = (lang, base) =>
    mdOf(lang, base) || mdOf('en', base) || mdOf('zh', base);

  const zhMarketing = {
    tagline: p.tagline ?? '',
    description: p.description ?? '',
    features: p.features ?? [],
  };
  const i18n = p.i18n ?? {};
  const marketing = (lang) => {
    if (lang === 'zh') return zhMarketing;
    return i18n[lang] ?? i18n.en ?? zhMarketing;
  };

  // 合规/支持长文按语言写入 public,运行时按需 fetch(不打进 JS 主包)。
  // 回退内容(缺失语言→英→中)已在写入时烘焙进文件。
  for (const lang of LANGS) {
    const ldir = join(outDir, lang);
    mkdirSync(ldir, { recursive: true });
    writeFileSync(join(ldir, 'privacy.md'), pickMd(lang, 'privacy'), 'utf8');
    writeFileSync(join(ldir, 'terms.md'), pickMd(lang, 'terms'), 'utf8');
    writeFileSync(join(ldir, 'support.md'), pickMd(lang, 'support'), 'utf8');
  }

  // locales 仅存营销文案(体积小),合规正文走 fetch。
  const locale = (lang) => {
    const m = marketing(lang);
    return {
      tagline: m.tagline || zhMarketing.tagline,
      description: m.description || zhMarketing.description,
      features: m.features?.length ? m.features : zhMarketing.features,
    };
  };

  products.push({
    slug: p.slug,
    name: p.name,
    nameZh: p.nameZh ?? '',
    platforms: p.platforms ?? [],
    accent: p.accent ?? '#6d5ef0',
    live: p.live ?? true,
    links: p.links ?? {},
    icon: iconWeb,
    screenshots: shotsWeb,
    legal: {
      privacy: { updated: p.legal?.privacy?.updated ?? '' },
      terms: { updated: p.legal?.terms?.updated ?? '' },
    },
    locales: Object.fromEntries(LANGS.map((l) => [l, locale(l)])),
  });

  const translated = LANGS.filter(
    (l) => l !== 'zh' && mdOf(l, 'privacy'),
  ).length;
  console.log(
    `✓ ${slug}:图标${iconWeb ? '✓' : '✗'} 截图 ${shotsWeb.length} 张 · 译文语言 ${translated}/${LANGS.length - 1}`,
  );
}

const outFile = join(root, 'src', 'content', 'products.json');
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log(`\n已生成 ${basename(outFile)}（${products.length} 个产品）`);
