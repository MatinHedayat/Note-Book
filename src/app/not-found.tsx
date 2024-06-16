import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='max-w-[30rem] min-h-screen px-6 mx-auto flex flex-col items-center justify-center gap-y-8'>
      <h2 className='font-medium'>Not found</h2>
      <Image src={'/not-found.svg'} alt='not-found' width={500} height={500} />
    </div>
  );
}
