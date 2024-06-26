'use server';

import prisma from '@/dbconfig';
import { v4 as uuidv4 } from 'uuid';
import getUser from '@/utils/getUser';
import { revalidatePath } from 'next/cache';
import { AddCategoryFormSchema } from '@/schema/category-schema';

// =================== ADD-CATEGORY
// ===============================================
export async function addCategory(category: string) {
  const parsedData = AddCategoryFormSchema.safeParse({ category });
  if (!parsedData.success) return { message: 'Wrong data format', success: false };

  let user;
  let error = false;

  try {
    user = await getUser();
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  user?.notes.forEach((item) => {
    if (item.category.toLowerCase() === category.toLowerCase()) error = true;
  });

  if (error) return { message: 'Incorrect category name', desc: 'This category already exists' };

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: [...user!.notes, { id: uuidv4(), category, notes: [] }],
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

// =================== DELETE-CATEGORY
// ===============================================
export async function deleteCategory(categoryId: string) {
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
        notes: user?.notes.filter((item) => item.id !== categoryId),
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

// =================== RENAME-CATEGORY
// ===============================================
export async function renameCategory(categoryId: string, category: string) {
  const parsedData = AddCategoryFormSchema.safeParse({ category });
  if (!parsedData.success) return { message: 'Wrong data format', success: false };

  let user;
  let error = false;

  try {
    user = await getUser();
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  user?.notes.forEach((item) => {
    if (item.category.toLowerCase() === category.toLowerCase()) error = true;
  });

  if (error) return { message: 'Incorrect category name', desc: 'This category already exists' };

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        notes: user?.notes.map((item) => {
          if (item.id === categoryId) {
            return { ...item, category: category };
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

// =================== REMOVE-ALL-CATEGORY
// ===============================================
export async function RemoveAllCategories() {
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
        notes: [],
        bookmarks: [],
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while updating user information',
      desc: 'Please try again ...',
    };
  }

  revalidatePath('/profile');
}
