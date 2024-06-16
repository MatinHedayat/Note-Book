import Header from '@/components/Header';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='px-6'>{children}</div>
    </>
  );
}
