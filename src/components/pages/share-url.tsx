'use client';

import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { Check, Copy } from 'lucide-react';

type ShareUrlProps = {
  host: string;
  call_id: string;
};

const ShareUrl = ({ host, call_id }: ShareUrlProps) => {
  const [copiedText, copy] = useCopyToClipboard();
  const url = `${host}/${call_id}`;

  const onCopy = () => {
    copy(url);
  };

  return (
    <div className='prose flex gap-2 my-3 overflow-scroll w-full'>
      <div className='p-2 bg-gray-100 text-black border border-gray-300 m-0 w-full'>
        {url}
      </div>

      <button onClick={onCopy} className='flex items-center justify-center'>
        {copiedText === url ? (
          <Check className='text-green-500' height={15} />
        ) : (
          <Copy height={15} />
        )}
        <span className='sr-only'>Copy URL</span>
      </button>
    </div>
  );
};

export default ShareUrl;
