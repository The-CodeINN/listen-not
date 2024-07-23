'use client';

import AudioSubmit from '@/components/pages/audio-submit';
import Waveform from '@/components/pages/waveform';
import { File, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TryIt() {
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [file]);

  return (
    <div className='container flex w-full flex-col items-center gap-12'>
      <section className='text-center py-28 max-w-3xl flex flex-col gap-3 items-center w-full'>
        <h1 className='text-4xl md:text-5xl tracking-tighter font-semibold'>
          Upload an mp3 file
        </h1>
        <div
          onClick={() => fileInputRef.current?.click()}
          className='cursor-pointer justify-center'
        >
          {!file ? (
            <div className='my-5 flex gap-2 items-center px-2.5 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-600 bg-gray-100 bg-opacity-40'>
              <Upload size={20} /> Select a File
            </div>
          ) : (
            <div className='my-5 flex gap-2 items-center px-2.5 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-600 bg-gray-100 bg-opacity-40'>
              <File size={20} /> Change File
            </div>
          )}
          <input
            ref={fileInputRef}
            type='file'
            accept='.mp3'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>
        {file && (
          <div className='flex flex-col items-center w-full gap-2'>
            <h1 className='pt-5 font-semibold w-full'>
              <Waveform file={file} />
            </h1>
            <div className='pt-8'>
              <AudioSubmit file={file} setFile={setFile} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
