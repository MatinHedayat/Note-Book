'use client';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addCategory } from '@/actions/category';
import SubmitButton from './button/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCategoryToastInfo } from '@/data/toastInfo';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { AddCategoryFormSchema } from '@/schema/category-schema';

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';

type AddCategoryProps = {
  triggerMode?: 'normal' | 'small';
};

export default function AddCategory(props: AddCategoryProps) {
  const form = useForm<z.infer<typeof AddCategoryFormSchema>>({
    resolver: zodResolver(AddCategoryFormSchema),
    defaultValues: {
      category: '',
    },
  });

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { triggerMode = 'small' } = props;
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof AddCategoryFormSchema>) {
    const parsedData = AddCategoryFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await addCategory(parsedData.data.category);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({ title: addCategoryToastInfo.message });
    setOpen(false);
  }

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`bg-zinc-800 font-medium flex-center gap-x-2 px-3 py-4 rounded-md ${
          triggerMode === 'small' ? 'text-[0.8rem] h-0' : 'h-10 text-sm'
        }`}
      >
        <MdOutlineAddCircleOutline className='text-base' />
        Add Category
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            You can create a category by choosing a name for it, but be careful that the name you
            choose is not duplicate.
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-2'>
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name :</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your category name'
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-x-2'>
                <DialogTrigger asChild>
                  <Button type='button' className='w-2/6'>
                    Close
                  </Button>
                </DialogTrigger>

                <SubmitButton
                  text='Create Category'
                  isSubmitting={isSubmitting}
                  isDisabled={isSubmitting}
                />
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
