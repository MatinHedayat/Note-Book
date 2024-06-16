import SignUpForm from '@/components/form/SignUp';
import Image from 'next/image';

export default function SignUp() {
  return (
    <>
      <div className='max-w-[400px] lg:mr-auto'>
        <h2 className='auth-title'>Create your account</h2>
        <p className='auth-subtitle'>
          You can create a new account or log in (login button) if you already have one.
        </p>

        <hr className='auth-hr' />

        <SignUpForm />
      </div>

      <div className='auth-image right-0'>
        <Image src='/background/sign-up.jpg' alt='avatar' className='object-cover' fill={true} />
      </div>
    </>
  );
}
