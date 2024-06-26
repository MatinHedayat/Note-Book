'use client';

import avatars from '@/data/avatars';
import { useState } from 'react';
import BackDrop from '../BackDrop';
import { updateProfile } from '@/actions/auth';
import { UpdateProfileFormSchema } from '@/schema/auth-schema';

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
import Image from 'next/image';
import { updateProfileToastInfo } from '@/data/toastInfo';

export default function UpdateProfile({ userInfo }: { userInfo: any }) {
  const { avatar, username, email } = userInfo;
  const [profileAvatar, setProfileAvatar] = useState(avatar);

  const form = useForm<z.infer<typeof UpdateProfileFormSchema>>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      username,
      email,
    },
  });

  const { toast } = useToast();
  const isSubmitting = form.formState.isSubmitting;

  const handleSelectAvatar = (avatarSrc: string) => {
    setProfileAvatar(profileAvatar === avatarSrc ? '' : avatarSrc);
  };

  async function onSubmit(data: z.infer<typeof UpdateProfileFormSchema>) {
    const parsedData = UpdateProfileFormSchema.safeParse(data);
    if (!parsedData.success) return;

    const response = await updateProfile(data, profileAvatar);
    if (response) {
      toast({ title: response.message, description: response.desc, variant: 'destructive' });
      return;
    }

    toast({ title: updateProfileToastInfo.message, description: updateProfileToastInfo.desc });
  }

  return (
    <>
      <h4 className='title-small'>Update Profile</h4>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-6 mt-6 mb-8 sm:mt-8 sm:gap-5'>
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            className={`relative w-16 h-16 rounded-full overflow-hidden transition-all sm:w-20 sm:h-20 ${
              profileAvatar === avatar.src ? 'ring-[6px] ring-zinc-100' : ''
            }`}
            onClick={() => handleSelectAvatar(avatar.src)}
          >
            <Image src={avatar.src} alt='avatar' width={100} height={100} className='w-full' />
          </button>
        ))}
      </div>

      <span className='bg-zinc-800 text-zinc-300 text-[0.8rem] px-2 py-0.5 rounded'>Notice*</span>
      <p className='title-small mt-1 mb-8'>You can tap on avatars to select and deselect them</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-w-[26rem]'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username :</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            <Link href={'/profile'} className='main-btn w-2/6'>
              Cancel
            </Link>

            <SubmitButton text='Update Profile' isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>

      <BackDrop pending={isSubmitting} />
    </>
  );
}
