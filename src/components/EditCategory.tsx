import { deleteNotes } from '@/actions/note';
import { deleteCategory, renameCategory } from '@/actions/category';
import {
  renameCategoryToastInfo,
  deleteNotesToastInfo,
  deleteCategoryToastInfo,
} from '@/data/toastInfo';

import { useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { AddCategoryFormSchema } from '@/schema/category-schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import SubmitButton from './button/SubmitButton';
import { Button } from './ui/button';

type EditCategoryProps = {
  item: CategoryType;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditCategory({ item, setDialogOpen }: EditCategoryProps) {
  const form = useForm<z.infer<typeof AddCategoryFormSchema>>({
    resolver: zodResolver(AddCategoryFormSchema),
    defaultValues: {
      category: item.category,
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function handleDeleteNotes(categoryId: string) {
    console.log(categoryId);
    const response = await deleteNotes(categoryId);
    if (response) {
      toast({ title: response?.message, description: response?.desc });
      return;
    }

    toast({ title: deleteNotesToastInfo?.message });
    setDialogOpen(false);
  }

  async function handleRenameCategory(data: z.infer<typeof AddCategoryFormSchema>) {
    const parsedData = AddCategoryFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await renameCategory(item.id, parsedData.data.category);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({ title: renameCategoryToastInfo.message });
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRenameCategory)}>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name :</FormLabel>
              <FormControl>
                <Input placeholder='Enter your category name' {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-6'>
          <span className='bg-zinc-800 text-zinc-300 text-[0.8rem] px-2 py-0.5 rounded'>
            Notice*
          </span>
          <p className='title-small mt-1 mb-4'>
            This action is irreversible, with this action you delete all the notes in this category.
          </p>

          <Button
            type='button'
            className='h-8 text-sm flex-center gap-x-2'
            onClick={() => handleDeleteNotes(item.id)}
          >
            <MdOutlineDeleteSweep className='text-base' /> Delete all notes
          </Button>
        </div>

        <div className='space-y-1 my-6'>
          <p className='flex-between gap-x-2'>
            <span className='text-sm'>Created at :</span>
            <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] capitalize px-2 py-1 rounded'>
              {new Date(item.createdAt).toLocaleTimeString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>

          <p className='flex-between gap-x-2'>
            <span className='text-sm'>Last update :</span>
            <span className='bg-zinc-800 text-zinc-300 text-[0.7rem] capitalize px-2 py-1 rounded'>
              {new Date(item.updatedAt).toLocaleTimeString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>

        <div className='flex gap-x-2'>
          <DialogTrigger asChild>
            <Button type='button' className='w-2/6'>
              Close
            </Button>
          </DialogTrigger>

          <SubmitButton text='Save Changes' isSubmitting={isSubmitting} isDisabled={isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
