import { z } from 'zod';

// ============= SIGN-UP SCHEMA
const signUpFormSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6, 'Must be at least 6 characters'),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be match',
    path: ['confirmPassword'],
  });

// ============= SIGN-IN SCHEMA
const signInFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6, 'Must be at least 6 characters'),
});

// ============= SEND-EMAIL SCHEMA
const sendEmailFormSchema = z.object({
  email: z.string().trim().email(),
});

// ============= RESET-PASSWORD SCHEMA
const ResetPasswordFormSchema = z
  .object({
    password: z.string().trim().min(6, 'Must be at least 6 characters'),
    confirmPassword: z.string().trim(),
    otp: z.string().min(6, 'Must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be match',
    path: ['confirmPassword'],
  });

// ============= UPDATE-PROFILE SCHEMA
const UpdateProfileFormSchema = z.object({
  username: z.string().trim(),
  email: z.string().trim().email(),
});

// EXPORT
export {
  signUpFormSchema,
  signInFormSchema,
  sendEmailFormSchema,
  ResetPasswordFormSchema,
  UpdateProfileFormSchema,
};
