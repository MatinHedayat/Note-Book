'use server';

import prisma from '@/dbconfig';
import getUser from '@/utils/getUser';
import { addNoteFormSchema, editNoteFormSchema } from '@/schema/note-schema';

import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// =================== ADD-NOTE
// ===============================================
export async function addNote(payload: AddNotePayload, otherPayload: SecondPayloadOfAddNote) {
  const parsedData = addNoteFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const {
    data: { title, desc },
  } = parsedData;
  const { category, isBookmarked } = otherPayload;

  const user = await getUser();
  const newNote = { id: uuidv4(), title, desc, category, isBookmarked };

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: user?.notes.map((item) => {
          if (item.category === category) {
            return {
              ...item,
              notes: [...item.notes, newNote],
              updatedAt: new Date().toISOString(),
            };
          } else return item;
        }),
      },
    });

    if (isBookmarked) {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          bookmarks: [...user!.bookmarks, newNote],
        },
      });
    }
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  redirect('/');
}

// =================== EDIT-NOTES
// ===============================================
export async function editNote(payload: EditNotePayload, secondPayload: SecondPayloadOfEditNote) {
  const parsedData = editNoteFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const {
    data: { title, desc },
  } = parsedData;
  const { category, isBookmarked, lastNoteId, lastCategory, lastCreatedAt } = secondPayload;

  const user = await getUser();
  const newNote = { id: uuidv4(), title, desc, category, isBookmarked, createdAt: lastCreatedAt };

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: user?.notes.map((item) => {
          if (item.category === category) {
            if (category === lastCategory) {
              return {
                ...item,
                notes: [newNote, ...item.notes.filter((note) => note.id !== lastNoteId)],
                updatedAt: new Date().toISOString(),
              };
            } else {
              return {
                ...item,
                notes: [...item.notes, newNote],
                updatedAt: new Date().toISOString(),
              };
            }
          } else if (item.category === lastCategory) {
            return { ...item, notes: item.notes.filter((note) => note.id !== lastNoteId) };
          } else return item;
        }),
      },
    });

    if (isBookmarked) {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          bookmarks: [...user!.bookmarks, newNote],
        },
      });
    }
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  redirect('/');
}

// =================== DELETE-NOTE
// ===============================================
export async function deleteNote(noteId: string, category: string) {
  let user;

  try {
    user = await getUser();
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  try {
    if (category === 'bookmarks') {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          bookmarks: user?.bookmarks.filter((note) => note.id !== noteId),
        },
      });

      let selectedNote: NoteType = {
        id: '',
        title: '',
        desc: '',
        isBookmarked: false,
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      user?.notes.map((item) =>
        item.notes.map((note) => {
          if (note.id === noteId) selectedNote = note;
        })
      );

      if (selectedNote) {
        await prisma.user.update({
          where: { id: user?.id },
          data: {
            notes: user?.notes.map((item) => {
              if (item.category === selectedNote?.category) {
                return {
                  ...item,
                  notes: item.notes.map((note) => {
                    if (note.id === noteId) {
                      return { ...note, isBookmarked: false };
                    } else return note;
                  }),
                };
              } else return item;
            }),
          },
        });
      }
    } else {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          notes: user?.notes.map((item) => {
            if (item.category === category) {
              return { ...item, notes: item.notes.filter((note) => note.id !== noteId) };
            } else return item;
          }),
        },
      });
    }
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  revalidatePath('/');
}

// =================== DELETE-NOTES
// ===============================================
export async function deleteNotes(categoryId: string) {
  let user;

  try {
    user = await getUser();
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: user?.notes.map((item) => {
          if (item.id === categoryId) {
            return { ...item, notes: [] };
          } else return item;
        }),
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  revalidatePath('/');
}

// =================== DELETE-NOTES
// ===============================================
export async function updatedNote(noteId: string, category: string) {
  let user;
  let selectedNote: NoteType = {
    id: '',
    title: '',
    desc: '',
    isBookmarked: false,
    category: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    user = await getUser();
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: user?.notes.map((item) => {
          if (item.category === category) {
            return {
              ...item,
              notes: item.notes.map((note) => {
                if (note.id === noteId) {
                  selectedNote = { ...note, isBookmarked: !note.isBookmarked };
                  return selectedNote;
                } else return note;
              }),
            };
          } else return item;
        }),
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  try {
    if (selectedNote.isBookmarked) {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          bookmarks: [...user!.bookmarks, selectedNote],
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          bookmarks: user?.bookmarks.filter((note) => note.id !== selectedNote.id),
        },
      });
    }
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  revalidatePath('/');
}
