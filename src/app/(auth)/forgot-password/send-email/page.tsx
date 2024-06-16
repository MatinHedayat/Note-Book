import SendEmailForm from '@/components/form/SendEmail';
import Image from 'next/image';

export default function SendEmail() {
  return (
    <>
      <div className='max-w-[400px] lg:mr-auto'>
        <h2 className='auth-title'>Send Email</h2>
        <p className='auth-subtitle'>
          Enter your email with which you have an account and you have forgotten its password, and
          we will send you an email with an OTP code. (connect to vpn)
        </p>

        <hr className='auth-hr' />

        <SendEmailForm />
      </div>

      <div className='auth-image right-0'>
        <Image
          src='/background/send-email.jpg'
          alt='background'
          className='object-cover'
          fill={true}
        />
      </div>
    </>
  );
}
