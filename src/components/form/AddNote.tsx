'use client';

import BackDrop from '../BackDrop';
import { addNote } from '@/actions/note';
import SubmitButton from '../button/SubmitButton';
import { addNoteToastInfo } from '@/data/toastInfo';
import { addNoteFormSchema } from '@/schema/note-schema';

import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdBookmarkAdded } from 'react-icons/md';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

export default function AddNote({ categories }: { categories: CategoryType[] }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isBookmarked, setBookmarked] = useState(false);

  const form = useForm<z.infer<typeof addNoteFormSchema>>({
    resolver: zodResolver(addNoteFormSchema),
    defaultValues: {
      title: '',
      desc: '',
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof addNoteFormSchema>) {
    const parsedData = addNoteFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const categoryValidation = categories.some((item) => item.category === selectedCategory);

    if (!categories.length) {
      toast({
        title: 'Please first add a category',
        description: 'To add a note, you must select the category',
        variant: 'destructive',
      });
      return;
    }

    if (!categoryValidation) {
      toast({
        title: 'Please choose a category',
        description: 'To add a note, you must select the category',
        variant: 'destructive',
      });
      return;
    }

    const secondPayload = { category: selectedCategory, isBookmarked: isBookmarked };
    const response = await addNote(parsedData.data, secondPayload);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }
    toast({ title: addNoteToastInfo.message, description: addNoteToastInfo.desc });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='w-full flex flex-col justify-between gap-6 lg:flex-row'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='lg:w-1/2'>
                  <FormLabel>Title :</FormLabel>
                  <FormControl>
                    <Textarea
                      className='md:min-h-[120px] lg:min-h-[160px]'
                      placeholder='Enter your title'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem className='lg:w-1/2'>
                  <FormLabel>Description :</FormLabel>
                  <FormControl>
                    <Textarea
                      className='md:min-h-[120px] lg:min-h-[160px]'
                      placeholder='Enter your description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='max-w-[600px]'>
            <div className='flex items-center justify-between mb-6'>
              <Select
                onValueChange={(value) => {
                  setSelectedCategory(value);
                }}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item: CategoryType, index: number) => (
                    <SelectItem key={index} value={item.category} className='capitalize'>
                      {item.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type='button'
                className='h-10 flex-center gap-x-1.5'
                onClick={() => setBookmarked((prevValue) => !prevValue)}
              >
                {isBookmarked ? (
                  <>
                    <MdBookmarkAdded className='text-xl' />
                    Bookmarked
                  </>
                ) : (
                  'Not marked'
                )}
              </Button>
            </div>

            <div className='flex gap-x-2'>
              <Link href={'/'} className='main-btn w-2/6'>
                Back
              </Link>

              <SubmitButton text='Add Note' isSubmitting={isSubmitting} />
            </div>
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
