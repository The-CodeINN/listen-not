import Link from 'next/link';
import { Ear } from 'lucide-react';
import ShimmerButton from './custom/shimmerbutton';
import { GithubIcon } from '@/assets/icons';

const Navbar = () => {
  return (
    <nav className='flex w-full items-center px-4 md:px-12 py-3 justify-between sticky top-0 backdrop-blur-sm'>
      <Link
        href={'/'}
        className='flex items-center text-xl md:text-2xl font-semibold tracking-tighter'
      >
        <s>Listen Not</s>
        <Ear />
      </Link>
      <Link
        href='https://github.com/Listen-Not/Listen-Not'
        target='_blank'
        rel='noopener noreferrer'
      >
        <ShimmerButton className='flex gap-2 px-2 md:px-6'>
          <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10'>
            Get the Code
          </span>
          <GithubIcon />
        </ShimmerButton>
      </Link>
    </nav>
  );
};

export default Navbar;
