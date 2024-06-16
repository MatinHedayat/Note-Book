'use client';

import BackDrop from '../BackDrop';
import { signUp } from '@/actions/auth';
import { signUpFormSchema } from '@/schemas';

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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import SubmitButton from '../button/SubmitButton';
import { signUpToastInfo } from '@/data/toastInfo';

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    const parsedData = signUpFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await signUp(parsedData.data);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({
      title: signUpToastInfo.message,
      description: signUpToastInfo.desc,
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
                  <Input type='password' typeId='1' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password :</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    typeId='2'
                    placeholder='Enter your password again'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-x-2'>
            <Link href={'/login'} className='main-btn w-2/6'>
              Login
            </Link>

            <SubmitButton text='Sign-up now' isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
