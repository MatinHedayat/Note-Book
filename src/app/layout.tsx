import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import FiltersProvider from '@/contexts/Filters';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NoteBook',
  description: 'Simple, beautiful and efficient',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster />
        <section className='max-w-[1000px] mx-auto'>
          <FiltersProvider>{children}</FiltersProvider>
        </section>
      </body>
    </html>
  );
}
