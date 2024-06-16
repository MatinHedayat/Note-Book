'use client';

import BackDrop from '../BackDrop';
import { signIn } from '@/actions/auth';
import { signInFormSchema } from '@/schemas';
import { loginToastInfo } from '@/data/toastInfo';

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

export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    const parsedData = signInFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await signIn(parsedData.data);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({
      title: loginToastInfo.message,
      description: loginToastInfo.desc,
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input type='password' typId={'1'} placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-x-2'>
            <Link href={'/sign-up'} className='main-btn w-2/6'>
              Sign-up
            </Link>

            <SubmitButton text='Login' isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
