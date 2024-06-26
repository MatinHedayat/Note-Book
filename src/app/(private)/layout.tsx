import Header from '@/components/Header';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='px-6 pb-8 min-[1000px]:px-0'>{children}</div>
    </>
  );
}
