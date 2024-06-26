'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { MdErrorOutline } from 'react-icons/md';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='min-h-screen px-8 flex flex-col items-center justify-center gap-y-10 sm:px-0'>
      <h2 className='flex flex-col gap-y-2'>
        <span className='text-xl font-medium flex-center gap-x-2'>
          <MdErrorOutline className='text-2xl' /> Error
        </span>
        <span className='text-zinc-300'>Something went wrong!</span>
      </h2>

      <Image src={'/error.svg'} alt='error' width={500} height={500} />

      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
