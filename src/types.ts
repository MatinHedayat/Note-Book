type SignUpPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

type SendEmailPayload = {
  email: string;
};

type ResetPasswordPayload = {
  password: string;
  confirmPassword: string;
  otp: string;
};

type UpdateProfilePayload = {
  username: string;
  email: string;
};

type ToastInfoProp = {
  message: string;
  desc: string;
};
