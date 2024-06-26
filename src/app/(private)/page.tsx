import NoteList from '@/components/note/NoteList';
import getUser from '@/utils/getUser';
import Categories from '@/components/note/Categories';
import Filters from '@/components/Filters';

export default async function Home() {
  const user = await getUser();
  if (!user) return;

  const categories = user.notes;
  const bookmarks = user.bookmarks;

  return (
    <div>
      <Categories categories={categories} />

      <hr className='mb-4 mt-8 border-b border-zinc-700' />

      <Filters categories={categories} />
      <NoteList categories={categories} bookmarks={bookmarks} />
    </div>
  );
}
