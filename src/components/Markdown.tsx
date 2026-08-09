import type { ReactNode } from 'react';

// 极简 Markdown 渲染:支持 #/## 标题、- 列表、段落。
// 合规文本由我们自控,无需完整 Markdown 解析器,避免额外依赖。
export default function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={key++}>{para.join(' ')}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={key++}>
          {list.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
    } else if (line.startsWith('### ')) {
      flushPara();
      flushList();
      blocks.push(<h3 key={key++}>{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      flushPara();
      flushList();
      blocks.push(<h2 key={key++}>{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      flushPara();
      flushList();
      blocks.push(<h1 key={key++}>{line.slice(2)}</h1>);
    } else if (line.startsWith('- ')) {
      flushPara();
      list.push(line.slice(2));
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();

  return <>{blocks}</>;
}
