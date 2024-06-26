'use client';

import { useFiltersContext } from '@/contexts/Filters';
import NoteCard from './NoteCard';

type NoteListProps = {
  categories: CategoryType[];
  bookmarks: NoteType[];
};

export default function NoteList({ categories, bookmarks }: NoteListProps) {
  const {
    filters: { category, sort, search, searchType },
  } = useFiltersContext();

  let noteList: NoteType[] = [];
  let allCategory: NoteType[] = [];

  categories.forEach((item) => {
    allCategory.push(...item.notes);
  });

  // category filters
  if (category === 'all categories') noteList = allCategory;
  else if (category === 'bookmarks') noteList = bookmarks;
  else {
    const singleCategory = categories.find((item) => item.category === category)?.notes;
    noteList = singleCategory ? singleCategory : [];
  }

  // sort filters
  if (sort === 'earliest') {
    noteList.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)));
  } else {
    noteList.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
  }

  // search filters
  if (search) {
    noteList = noteList.filter((note) => {
      if (searchType.title && searchType.desc)
        return note.title.includes(search) || note.desc?.includes(search);
      else if (searchType.title) return note.title.includes(search);
      else if (searchType.desc) return note.desc?.includes(search);
    });
  }

  let leftLength = 0;
  let rightLength = 0;
  let leftList: any = [];
  let rightList: any = [];

  noteList?.forEach((element, index) => {
    if (!index) {
      leftLength += element.title.length;
      leftList.push({ ...element, index });
    }

    if (index === 1) {
      rightLength += element.title.length;
      rightList.push({ ...element, index });
    }

    if (index > 1) {
      if (leftLength > rightLength) {
        rightLength += element.title.length;
        rightList.push({ ...element, index });
      } else {
        leftLength += element.title.length;
        leftList.push({ ...element, index });
      }
    }
  });

  return (
    <div>
      {noteList.length ? (
        <>
          <div className='grid gap-4 mt-4 md:hidden'>
            {noteList?.map((item) => (
              <NoteCard key={item.id} noteInfo={item} />
            ))}
          </div>

          <div className='hidden gap-4 mt-4 md:flex'>
            <div className='w-1/2 flex flex-col gap-4'>
              {leftList.map((item: any) => (
                <NoteCard key={item.id} noteInfo={item} />
              ))}
            </div>

            <div className='w-1/2 flex flex-col gap-4'>
              {rightList.map((item: any) => (
                <NoteCard key={item.id} noteInfo={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className='text-zinc-400 text-sm text-center mt-20 md:mt-40'>Note list is empty ...</p>
      )}
    </div>
  );
}
