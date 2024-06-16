import Link from 'next/link';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';
import { Button } from './ui/button';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import getUser from '@/utils/getUser';
import Image from 'next/image';

const navLinks = [
  { label: 'add note', href: '/add-note', icon: MdOutlineAddCircleOutline },
  { label: 'categories', href: '/add-note', icon: MdOutlineAddCircleOutline },
  { label: 'profile', href: '/add-note', icon: MdOutlineAddCircleOutline },
  { label: 'update profile', href: '/add-note', icon: MdOutlineAddCircleOutline },
];

export default async function Header() {
  const user = await getUser();

  return (
    <div className='w-full h-16 flex-between px-6 mb-8 border-b border-zinc-600'>
      <Link href={'/'} className='flex-center gap-x-1'>
        <MdOutlineLocalFireDepartment className='text-xl' />
        <span className='text-[0.9rem] font-semibold'>NoteBook</span>
      </Link>

      <div className='flex-center gap-x-3'>
        <Button className='h-0 text-[0.8rem] flex-center gap-x-2 px-2 py-4'>
          <MdOutlineAddCircleOutline className='text-base' />
          <span>Add Note</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className='bg-zinc-800 text-[0.8rem] w-8 h-8 rounded-full'>
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                width={80}
                height={80}
                alt={'avatar'}
                className='rounded-full'
              />
            ) : (
              'A'
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((link) => (
              <DropdownMenuItem key={link.label} asChild>
                <Link href={link.href} className='capitalize gap-x-2'>
                  <link.icon />
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
