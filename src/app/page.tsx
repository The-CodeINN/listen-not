import BorderGlowbutton from '@/components/custom/borderglowbutton';
import IconTabs from '@/components/custom/icontabs';
import RetroGrid from '@/components/custom/retrogrid';
import CodeHost from '@/components/pages/codehost';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  return (
    <main className='container flex h-full justify-center w-full flex-col items-center gap-12 px-5 '>
      <section className='w-full overflow-hidden relative text-center flex flex-col items-center'>
        <div className='max-w-3xl pt-24'>
          <BorderGlowbutton />
          <h1 className=' text-5xl sm:text-6xl tracking-tighter font-semibold'>
            Transcribe audio in minutes with WhisperV3
          </h1>
        </div>
        <RetroGrid />
      </section>
      <section className='flex flex-col items-center gap-3 text-center max-w-3xl'>
        <p>
          Everything AI has seamlessly integrated all the latest AI generation
          tools into one platform, allowing you to generate content with just a
          single click, all within minutes using the WhisperV3 AI app.
        </p>
      </section>
      <section className='flex gap-4 flex-wrap py-6'>
        <Link className={twMerge(buttonVariants(), 'w-full sm:w-48')} href='/'>
          Host it yourself
        </Link>
        <Link
          className={twMerge(
            buttonVariants({ variant: 'outline', size: 'default' }),
            'w-full sm:w-48'
          )}
          href='/tryit'
        >
          Try it out
        </Link>
      </section>
      <section
        id='host'
        className='text-center py-8 sm:py-32 flex flex-col gap-3 items-center'
      >
        <CodeHost />
        {/* <IconTabs /> */}
      </section>
    </main>
  );
}
