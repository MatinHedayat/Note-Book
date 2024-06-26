'use client';

import BackDrop from '../BackDrop';
import { sendEmail } from '@/actions/auth';
import { sendEmailFormSchema } from '@/schema/auth-schema';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import SubmitButton from '../button/SubmitButton';
import { sendEmailToastInfo } from '@/data/toastInfo';

export default function SendWEmail() {
  const form = useForm<z.infer<typeof sendEmailFormSchema>>({
    resolver: zodResolver(sendEmailFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof sendEmailFormSchema>) {
    const parsedData = sendEmailFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await sendEmail(parsedData.data);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({
      title: sendEmailToastInfo.message,
      description: sendEmailToastInfo.desc,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-x-2'>
            <Link href={'/login'} className='main-btn w-2/6'>
              Back
            </Link>

            <SubmitButton text='Send Email' isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
