'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import ShareUrl from './share-url';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Button, buttonVariants } from '../ui/button';
import { toast } from 'sonner';

type AudioSubmitProps = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  file: File;
};

const AudioSubmit = ({ setFile, file }: AudioSubmitProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [call_id, setCallId] = React.useState<string>('');

  const submitAudio = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const promise = fetch(
      'https://the-codeinn--whisper-large-v3-demo-entrypoint.modal.run/transcribe',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => res.json());

    toast.promise(promise, {
      loading: 'Sending your file to the server',
      success: (data: string) => {
        setOpen(true);
        setCallId(data);
        return 'Received call id: ' + data;
      },
      error: 'Failed to send file',
    });
  };

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader className='text-left'>
            <DialogTitle>Successfully submitted audio file.</DialogTitle>
            <DialogDescription>
              The transcription will be available at this link. You can go there
              now or check back later.
              <div className='max-w-[325px] sm:max-w-[450px] w-full'>
                <ShareUrl host={window.location.href} call_id={call_id} />
              </div>
            </DialogDescription>
            <DialogFooter>
              <div className='flex justify-end gap-2 mt-2'>
                <Link
                  href={`/tryit/${call_id}`}
                  className={twMerge(buttonVariants(), 'w-full sm:w-48')}
                >
                  Go to transcription
                </Link>
                <button
                  onClick={() => {
                    setFile(undefined);
                    setOpen(false);
                    setSubmitted(false);
                    setCallId('');
                  }}
                  className={twMerge(
                    buttonVariants({ variant: 'outline', size: 'default' }),
                    'w-full sm:w-48'
                  )}
                >
                  Upload a new audio
                </button>
              </div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button
        disabled={!file}
        onClick={() => {
          setSubmitted(true);
          submitAudio();
        }}
      >
        {submitted ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
};

export default AudioSubmit;
