import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

type Props = {
  file: File;
};

type TrackMetadata = {
  duration: number;
  name: string;
  size: number;
};

const Waveform = ({ file }: Props) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<WaveSurfer | null>(null);

  const [mounted, setMounted] = useState(false);
  const [metadata, setMetadata] = useState<TrackMetadata>({
    duration: 0,
    name: '',
    size: 0,
  });

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // check if the waveformRef and file exist
    // if they do, create a new WaveSurfer instance
    if (waveformRef.current && file) {
      trackRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(74,222,128)',
        progressColor: '#f3f4f6',
        url: URL.createObjectURL(file),
        barGap: 1,
        barWidth: 3,
        barRadius: 3,
        cursorColor: 'rgb(72,85,99)',
        cursorWidth: 3,
        mediaControls: true,
      });

      // once the track is ready, set the metadata
      trackRef.current.on('ready', () => {
        setMounted(true);
        setMetadata({
          duration: trackRef.current?.getDuration() || 0,
          name: file.name,
          size: file.size,
        });
      });

      // once the track finishes, reset the current time
      trackRef.current.on('finish', () => {
        setCurrentTime(0);
      });

      // cleanup the trackRef
      return () => {
        if (trackRef.current) {
          trackRef.current.destroy();
        }
        setMounted(false);
      };
    }
  }, [file]);

  useEffect(() => {
    // set an interval to update the current time
    const intervalId = setInterval(() => {
      if (trackRef.current && trackRef.current.isPlaying()) {
        setCurrentTime(trackRef.current.getCurrentTime());
      }
    }, 100);

    // cleanup the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex justify-center h-48'>
      <div
        className={clsx(
          'h-36 bg-gray-100 flex items-center justify-center w-full rounded-lg',
          !mounted ? 'block' : 'hidden'
        )}
      >
        <div className='animate-spin items-center m-auto'>
          <Loader2 opacity={0.5} size={30} />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-col w-full gap-2 text-gray-600',
          mounted ? 'block' : 'hidden'
        )}
      >
        <div className='flex justify-between font-mono tracking-tight text-sm text-opacity-70 w-full gap-24'>
          <div className='text-ellipsis overflow-hidden w-fit whitespace-nowrap'>
            {file.name}
          </div>
          <div className='whitespace-nowrap w-fit'>
            {(metadata.size / 1000).toFixed(2)} kb
          </div>
        </div>
        <div className='w-full' ref={waveformRef} id='waveform'></div>
        <div className='flex justify-between font-mono tracking-tight text-sm text-opacity-70 items-center'>
          <div>{currentTime.toFixed(2)}s</div>
          <div className='tabular-nums w-2/5 text-right'>
            {metadata.duration.toFixed(2)}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waveform;
