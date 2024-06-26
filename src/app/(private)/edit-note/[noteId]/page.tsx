import EditNoteForm from '@/components/form/EditNote';
import getUser from '@/utils/getUser';

type EditNoteProps = {
  params: { noteId: string };
};

export default async function EditNote({ params }: EditNoteProps) {
  const user = await getUser();
  if (!user) return;

  let noteInfo;
  const categories = user?.notes;

  user?.notes.forEach((item) =>
    item.notes.find((note) => {
      if (note.id === params.noteId) noteInfo = note;
    })
  );

  return (
    <div>
      <h2 className='title-medium'>Edit Note</h2>
      <p className='title-small mb-8'>You can edit your note and add it to a category.</p>

      <EditNoteForm noteInfo={noteInfo!} categories={categories} />
    </div>
  );
}
