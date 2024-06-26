import { z } from 'zod';

export const AddCategoryFormSchema = z.object({
  category: z.string().trim().min(1, 'You must enter something ...'),
});
