import { z } from 'zod';

// ============= ADD-NOTE SCHEMA
const addNoteFormSchema = z.object({
  title: z.string().trim().min(1, 'You must enter something ...'),
  desc: z.string().trim().optional(),
});

// ============= EDIT-NOTE SCHEMA
const editNoteFormSchema = z.object({
  title: z.string().trim().min(1, 'You must enter something ...'),
  desc: z.string().trim().optional(),
});

// EXPORT
export { addNoteFormSchema, editNoteFormSchema };
