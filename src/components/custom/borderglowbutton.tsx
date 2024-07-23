'use client';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const BorderGlowButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({
    x: '-100%',
    y: '-100%',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: `${x}px`, y: `${y}px` });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      className='relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90'
      ref={ref}
    >
      <span
        className={`absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#000_0%,transparent_70%)] `}
        style={
          {
            left: mousePosition.x,
            top: mousePosition.y,
          } as any
        }
      ></span>
      <div className='relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90  px-4 py-2 text-xs text-black backdrop-blur-sm inline-flex items-center justify-center'>
        <span>✨ We&apos;ve raised $1.5M in seed funding</span>
        <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
      </div>
    </button>
  );
};

export default BorderGlowButton;
