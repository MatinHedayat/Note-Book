'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='min-h-screen px-6 flex flex-col items-center justify-center gap-y-8'>
      <h2 className='text-xl font-medium'>Something went wrong!</h2>

      <Image src={'/error.svg'} alt='error' width={500} height={500} />

      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
