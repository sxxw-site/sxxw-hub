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

  // 按语言组装;英文缺失的字段回退到中文,保证英文页永不空白。
  const zhMdPrivacy = readMd('privacy.md');
  const zhMdTerms = readMd('terms.md');
  const zhMdSupport = readMd('support.md');
  const en = p.en ?? {};

  const locale = (lang) => {
    const isEn = lang === 'en';
    return {
      tagline: (isEn ? en.tagline : p.tagline) || p.tagline || '',
      description:
        (isEn ? en.description : p.description) || p.description || '',
      features: (isEn ? en.features : p.features) || p.features || [],
      support: {
        md: (isEn ? readMd('support.en.md') : zhMdSupport) || zhMdSupport,
      },
      legal: {
        privacy: {
          updated: p.legal?.privacy?.updated ?? '',
          md: (isEn ? readMd('privacy.en.md') : zhMdPrivacy) || zhMdPrivacy,
        },
        terms: {
          updated: p.legal?.terms?.updated ?? '',
          md: (isEn ? readMd('terms.en.md') : zhMdTerms) || zhMdTerms,
        },
      },
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
    locales: { zh: locale('zh'), en: locale('en') },
  });

  const hasEn = Boolean(en.tagline && readMd('privacy.en.md'));
  console.log(
    `✓ ${slug}:图标${iconWeb ? '✓' : '✗'} 截图 ${shotsWeb.length} 张 英文${hasEn ? '✓' : '(回退中文)'}`,
  );
}

const outFile = join(root, 'src', 'content', 'products.json');
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log(`\n已生成 ${basename(outFile)}（${products.length} 个产品）`);
