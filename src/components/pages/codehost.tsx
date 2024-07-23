'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Link from 'next/link';
import { CodeBlock } from './codeblock';
import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';

const CodeHost: React.FC = () => {
  const codeBlock = `
  from flask import Flask, request, jsonify

  app = Flask(__name__)

  @app.route('/')
  def hello_world():
      return 'Hello, World!'

  if __name__ == '__main__':
      app.run()
  `;

  const modalCommand = 'modal deploy main.py';
  const requestCommand = `curl -X POST -F "audio=@<file>" https://<org_name>--whisper-v3-demo-entrypoint.modal.run`;
  const installCommand = 'pip install insanely-fast-whisper';
  const fileAttachCommand =
    'insanely-fast-whisper --file-name <filename or URL> --flash True';

  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div className=''>
      <Tabs
        defaultValue='modal'
        className='w-screen xl:w-[600px] sm:w-[500px] min-h-[500px] px-5'
      >
        <TabsList className=''>
          <TabsTrigger value='modal'>Deploy on Modal</TabsTrigger>
          <TabsTrigger value='local'>Run Locally</TabsTrigger>
        </TabsList>
        <TabsContent value='modal' className='w-full text-start'>
          <div className=''>
            <h1>Deploy on Modal</h1>
            <p>
              One of the easiest and cheapest ways to host an on-demand API is
              via{' '}
              <Link
                className='text-green-600'
                href='https://www.modal.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Modal
              </Link>
              .
            </p>
            <p>
              Once you create a free account and download the Python client,
              copy or download the base code below. It&apos;s on GitHub
              <Link
                className='text-green-600'
                href='https://google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                here
              </Link>
              .
            </p>
          </div>

          <div className='max-w-lg'>
            <div className='w-full py-6'>
              <CodeBlock
                language='python'
                value={codeBlock}
                fileName='main.py'
              />
            </div>
          </div>

          <CommandBlock
            command={modalCommand}
            copiedText={copiedText}
            copy={copy}
          />
          <CommandBlock
            command={requestCommand}
            copiedText={copiedText}
            copy={copy}
          />
        </TabsContent>
        <TabsContent className='w-full text-start' value='local'>
          <div className='prose prose-p:tracking-tight'>
            <p>
              Run WhisperV3 easily with{' '}
              <Link
                href='https://huggingface.co/openai/whisper-large-v3'
                target='_blank'
                rel='noopener noreferrer'
                className='text-orange-600'
              >
                Insanely Fast Whisper
              </Link>
              .
            </p>
            <p>
              Install <code>insanely-fast-whisper</code> via pip:
            </p>
            <CommandBlock
              command={installCommand}
              copiedText={copiedText}
              copy={copy}
            />

            <p>
              Run inference with <code>flash attention v2</code>. Requires
              Amphere GPUs (A10G, A100, etc). View the full requirements at the
              PyPI page:{' '}
              <Link
                href='https://pypi.org/project/insanely-fast-whisper/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-orange-600'
              >
                here
              </Link>
              .
            </p>

            <CommandBlock
              command={fileAttachCommand}
              copiedText={copiedText}
              copy={copy}
            />

            <p>
              If you don&apos;t have the required GPUs, you can still run it
              without the flash attention v2. Just remove the
            </p>
            <CommandBlock
              command={installCommand}
              copiedText={copiedText}
              copy={copy}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CommandBlock: React.FC<{
  command: string;
  copiedText: string | null;
  copy: (text: string) => void;
}> = ({ command, copiedText, copy }) => {
  return (
    <div className='prose prose-p:tracking-tight'>
      <p>After authenticating with the Modal CLI, run this in your terminal:</p>
      <pre className='bg-gray-100 rounded-lg p-3 mt-3 text-sm font-mono text-gray-800 flex items-center gap-2.5 border-t-2 border-t-blue-500 justify-between overflow-auto'>
        <code className='break-words'>
          <span className='select-none pr-3'>$</span>
          {command}
        </code>
        <span onClick={() => copy(command)} className='cursor-pointer'>
          {copiedText === command ? (
            <Check className='text-green-500' height={15} />
          ) : (
            <Copy height={15} />
          )}
        </span>
      </pre>
    </div>
  );
};

export default CodeHost;
