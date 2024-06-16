import ResetPasswordForm from '@/components/form/ResetPassword';
import Image from 'next/image';

export default function ResetPassword() {
  return (
    <>
      <div className='auth-image left-0'>
        <Image
          src='/background/reset-password.jpg'
          alt='background'
          className='object-cover'
          fill={true}
        />
      </div>

      <div className='max-w-[400px] lg:ml-auto'>
        <h2 className='auth-title'>Reset Password</h2>
        <p className='auth-subtitle'>
          You can change your password, but you must have the OTP code we sent to your email.
        </p>

        <hr className='auth-hr' />

        <ResetPasswordForm />
      </div>
    </>
  );
}
