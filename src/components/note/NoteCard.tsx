import { BsThreeDots } from 'react-icons/bs';
import { MdBookmarkAdded } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { MdOutlineBookmarkRemove } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '../Modal';
import { deleteNote, updatedNote } from '@/actions/note';
import { toast } from '../ui/use-toast';
import { deleteNoteToastInfo, updateNoteToastInfo } from '@/data/toastInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFiltersContext } from '@/contexts/Filters';

type NoteCardProps = {
  noteInfo: NoteType;
};

export default function NoteCard({ noteInfo }: NoteCardProps) {
  const router = useRouter();
  const { filters } = useFiltersContext();

  const creationTime = new Date(noteInfo.createdAt).toLocaleTimeString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  async function handleDeleteNote(noteId: string, category: string) {
    let response;
    if (filters.category === 'bookmarks') response = await deleteNote(noteId, 'bookmarks');
    else response = await deleteNote(noteId, category);

    if (response) {
      toast({ title: response?.message, description: response?.desc });
      return;
    }

    toast({ title: deleteNoteToastInfo?.message });
  }

  async function handleUpdateNote(noteId: string, category: string) {
    const response = await updatedNote(noteId, category);
    if (response) {
      toast({ title: response?.message, description: response?.desc });
      return;
    }

    toast({ title: updateNoteToastInfo?.message });
  }

  const noteCardOptions = [
    { id: 1, label: 'edit', icon: <MdEdit /> },
    {
      id: 2,
      label: noteInfo.isBookmarked ? 'delete form bookmark' : 'add to bookmark',
      icon: noteInfo.isBookmarked ? (
        <MdOutlineBookmarkRemove className='text-lg' />
      ) : (
        <MdOutlineBookmarkAdd className='text-lg' />
      ),
    },
  ];

  return (
    <div className='bg-zinc-900/50 p-4 border border-zinc-600 rounded-md'>
      <div className='flex-between'>
        <div className='flex-center gap-x-2'>
          <span
            className={`bg-zinc-800 text-zinc-300 text-[0.8rem] font-medium text-center px-2 py-1 flex-center gap-x-2 rounded transition-all ${
              noteInfo.isBookmarked
                ? 'opacity-100 visible scale-100'
                : 'opacity-0 invisible scale-75'
            }`}
          >
            <MdBookmarkAdded className='text-sm' />
            Bookmarked
          </span>
        </div>

        <div className='flex-center gap-x-2'>
          <Modal
            textIcon={<RiDeleteBin5Line />}
            modalTitle='Are you sure to delete this note ?'
            modalDesc='Once you delete this note, it will be deleted forever, unless you have added it to your bookmark list.'
            className='text-zinc-300 p-1'
            action={() => handleDeleteNote(noteInfo.id, noteInfo.category)}
          />

          {filters.category !== 'bookmarks' && (
            <DropdownMenu>
              <DropdownMenuTrigger className='p-[0.4rem] rounded'>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-[var(--clr-black)]/90'>
                {noteCardOptions.map((item) => {
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      className='flex items-center gap-x-2'
                      onClick={() => {
                        if (item.label === 'edit') {
                          router.push(`/edit-note/${noteInfo.id}`);
                          return;
                        }

                        handleUpdateNote(noteInfo.id, noteInfo.category);
                      }}
                    >
                      <span>{item.icon}</span>
                      <span className='capitalize'>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className={`mt-4 ${!noteInfo.desc ? 'mb-6' : ''}`}>
        <p className='text-zinc-200 break-words'>{noteInfo.title}</p>

        {noteInfo.desc && (
          <>
            <hr className='border-zinc-700 mt-4 mb-2' />
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1' className='border-b-0'>
                <AccordionTrigger className='text-zinc-400 text-sm'>Description</AccordionTrigger>
                <AccordionContent className='text-zinc-300 text-sm'>
                  {noteInfo.desc}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>

      <div className='flex-between gap-x-4'>
        <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] font-medium capitalize text-center px-2 py-1 rounded'>
          {noteInfo.category}
        </span>

        <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] font-medium text-center px-2 py-1 rounded'>
          {creationTime}
        </span>
      </div>
    </div>
  );
}
