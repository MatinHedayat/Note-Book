'use client';

import BackDrop from '../BackDrop';
import { resetPassword } from '@/actions/auth';
import { ResetPasswordFormSchema } from '@/schema/auth-schema';
import SubmitButton from '../button/SubmitButton';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { resetPasswordToastInfo } from '@/data/toastInfo';

export default function ResetPassword() {
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    const parsedData = ResetPasswordFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await resetPassword(parsedData.data);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({
      title: resetPasswordToastInfo.message,
      description: resetPasswordToastInfo.desc,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password :</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    typeId='1'
                    placeholder='Enter your new password'
                    {...field}
                  />
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

          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormDescription>
                  Please enter the one-time password sent to your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-x-2'>
            <Link href={'/forgot-password/send-email'} className='main-btn w-2/6'>
              Back
            </Link>

            <SubmitButton text='Submit' isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
