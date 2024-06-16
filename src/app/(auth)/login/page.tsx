import SignInForm from '@/components/form/SignIn';
import Image from 'next/image';
import Link from 'next/link';

export default async function Login() {
  return (
    <>
      <div className='auth-image left-0'>
        <Image src='/background/sign-in.jpg' alt='background' className='object-cover' fill={true} />
      </div>

      <div className='max-w-[400px] lg:ml-auto'>
        <h2 className='auth-title'>Log in to your account</h2>
        <p className='auth-subtitle mb-3'>
          Sign in with your email and password or create a new account if you don't have one.
        </p>

        <Link
          href='/forgot-password/send-email'
          className='bg-zinc-800 text-[0.85rem] text-zinc-300 px-2 py-1 rounded'
        >
          Forgot password ?
        </Link>

        <hr className='auth-hr' />

        <SignInForm />
      </div>
    </>
  );
}
