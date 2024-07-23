'use client';
import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { Check, Copy, Download } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
  fileName: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  python: '.py',
  javascript: '.js',
  typescript: '.ts',
  'C#': '.cs',
};

const CodeBlock: React.FC<CodeBlockProps> = memo(
  ({ language, value, fileName }) => {
    const [copiedText, copy] = useCopyToClipboard();

    const downloadAsFile = () => {
      if (typeof window === 'undefined') return;

      const blob = new Blob([value], { type: 'text/plain' });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = fileName;
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      return true;
    };

    return (
      <div className='codeblock  relative w-full  font-sans shadow-md rounded-lg bg-white'>
        <div className='flex w-full  items-center justify-between pr-4 bg-gray-100 rounded-t-lg'>
          <div className=' lowercase bg-white h-full p-3 flex items-center justify-between border-t-2 px-3 gap-2.5 border-t-blue-500'>
            <div className='flex gap-1'>{fileName}</div>{' '}
            <span className='rounded-full bg-gray-700 h-2 w-2 mt-[.15rem]'></span>
          </div>
          <div className='flex items-center gap-1'>
            <button onClick={downloadAsFile}>
              <Download height={15} />
              <span className='sr-only'>Download</span>
            </button>
            <button
              onClick={() => copy(value)}
              className='flex items-center gap-1'
            >
              {copiedText === value ? (
                <Check className='text-green-500' height={15} />
              ) : (
                <Copy height={15} />
              )}
              <span className='sr-only'>Copy Code</span>
            </button>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          PreTag={'div'}
          style={coldarkCold}
          customStyle={{
            margin: 0,
            width: '100%',
            background: 'transparent',
            lineHeight: '1.2',
          }}
          codeTagProps={{
            style: {
              lineHeight: 'inherit',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
