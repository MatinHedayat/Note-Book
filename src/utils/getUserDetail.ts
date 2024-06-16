export function getUserInfo(user: any) {
  return [
    { label: 'username', value: user?.username },
    { label: 'email', value: user?.email },
    {
      label: 'created at',
      value: new Date(user?.createdAt).toLocaleTimeString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      label: 'last update',
      value: new Date(user?.updatedAt).toLocaleTimeString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];
}

export function getUserNotesInfo(user: any) {
  return [
    { label: 'all notes', value: calculateLengthOfAllNotes(user?.notes) },
    { label: 'categories', value: user?.notes.length },
    { label: 'bookmarked', value: user?.bookmarks.length },
  ];
}

export function calculateLengthOfAllNotes(notes: any) {
  let notesLength = 0;
  notes.map((note: any) => {
    notesLength += note.notes.length;
  });

  return notesLength;
}
