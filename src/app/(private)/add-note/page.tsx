import AddNoteForm from '@/components/form/AddNote';
import getUser from '@/utils/getUser';

export default async function AddNote() {
  const user = await getUser();

  return (
    <div>
      <h2 className='title-medium'>Add Note</h2>
      <p className='title-small mb-8'>
        You can create a note and add it to a category. You can also add it to your bookmark list.
      </p>

      <AddNoteForm categories={user!.notes} />
    </div>
  );
}
