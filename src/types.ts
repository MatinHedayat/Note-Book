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

type AddNotePayload = {
  title: string;
  desc?: string;
};

type EditNotePayload = {
  title: string;
  desc?: string;
};

type SecondPayloadOfEditNote = {
  category: string;
  isBookmarked: boolean;
  lastNoteId: string;
  lastCategory: string;
  lastCreatedAt: Date;
};

type SecondPayloadOfAddNote = {
  category: string;
  isBookmarked: boolean;
};

type CategoryType = {
  id: string;
  category: string;
  notes: NoteType[];
  createdAt: Date;
  updatedAt: Date;
};

type NoteType = {
  id: string;
  title: string;
  desc: string | null;
  category: string;
  isBookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
