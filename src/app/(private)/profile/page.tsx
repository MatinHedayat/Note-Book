import getUser from '@/utils/getUser';
import { deleteAccount, logout } from '@/actions/auth';
import ActionButton from '@/components/button/ActionButton';
import { getUserInfo, getUserNotesInfo } from '@/utils/getUserDetail';

import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineArrowBack } from 'react-icons/md';

export default async function Profile() {
  const user = await getUser();
  const userInfo = getUserInfo(user);
  const userNotes = getUserNotesInfo(user);

  return (
    <>
      <div className='flex items-center justify-between mb-4 sm:mb-6'>
        <h4 className='title-small'>Your Profile</h4>

        <Link href={'/'} className='text-sm text-zinc-400 flex-center gap-x-1.5'>
          <MdOutlineArrowBack />
          Back to home
        </Link>
      </div>

      <div className='flex-between mb-8'>
        <div className='avatar'>
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              width={80}
              height={80}
              alt={'avatar'}
              className='w-full ring-2 ring-zinc-100 rounded-full sm:ring-4'
            />
          ) : (
            <div>A</div>
          )}
        </div>

        <div className='space-y-2'>
          {userNotes.map((note) => (
            <p key={note.label} className='flex-between gap-x-10 sm:gap-x-20'>
              <span className='title-medium capitalize'>{note.label}</span>
              <span className='w-10 text-zinc-400 text-[0.8rem] text-center font-medium border border-zinc-500 rounded sm:w-16 sm:text-sm sm:py-1'>
                {note.value}
              </span>
            </p>
          ))}
        </div>
      </div>

      <h4 className='title-small'>Your Information</h4>

      <div className='space-y-1 mt-4 mb-12 sm:mt-6 sm:space-y-2'>
        {userInfo.map((item) => (
          <p key={item.label} className='flex items-center justify-between gap-x-4'>
            <span className='title-medium capitalize'>{item.label} :</span>
            <span className='bg-zinc-800 text-zinc-300 text-sm px-2 py-1 rounded sm:text-base sm:tracking-wider sm:font-medium sm:px-4'>
              {!item.value ? (
                <span className='text-zinc-400'>This field is empty</span>
              ) : (
                item.value
              )}
            </span>
          </p>
        ))}
      </div>

      <div className='lg:max-w-[70%]'>
        <div className='flex gap-x-2 mb-8'>
          <ActionButton text='Logout' className='w-1/2' action={logout} actionType={'logout'} />

          <Link href={'/profile/update-profile'} className='main-btn w-1/2'>
            Update Profile
          </Link>
        </div>

        <span className='bg-zinc-800 text-zinc-300 text-[0.8rem] px-2 py-0.5 rounded'>Notice*</span>
        <p className='title-small mt-1 mb-4'>
          These actions are a bit dangerous because it either deletes your account with all
          information or deletes information about your all notes.
        </p>

        <div className='flex gap-x-2 h-12'>
          <ActionButton
            text='Delete Account'
            className='main-btn w-1/2'
            action={deleteAccount}
            actionType={'delete-account'}
            modal
            modalTitle='Are you sure you want to delete your account ?'
            modalDesc='This action is irreversible, please do this with full confidence.'
          />

          <ActionButton
            text='Delete All Notes'
            className='main-btn w-1/2'
            action={deleteAccount}
            actionType={'delete-notes'}
            modal
            modalTitle='Are you sure you want to delete all your notes ?'
            modalDesc='This action is irreversible, please do this with full confidence.'
          />
        </div>
      </div>
    </>
  );
}
