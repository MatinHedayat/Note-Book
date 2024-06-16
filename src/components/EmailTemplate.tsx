type EmailTemplateProp = {
  OTP: string;
};

export default function EmailTemplate({ OTP }: EmailTemplateProp) {
  return (
    <div className='flex flex-col gap-y-2'>
      <p>Use this OTP code for change password</p>
      <span>OTP : {OTP}</span>
    </div>
  );
}
