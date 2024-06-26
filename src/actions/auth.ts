'use server';

import prisma from '../dbconfig';
import setCookie from '@/utils/setCookie';
import getUserId from '@/utils/getUserId';
import EmailTemplate from '@/components/EmailTemplate';
import {
  signUpFormSchema,
  signInFormSchema,
  sendEmailFormSchema,
  ResetPasswordFormSchema,
  UpdateProfileFormSchema,
} from '@/schema/auth-schema';

import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import { authenticator } from 'otplib';
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

// =================== SIGN-UP
// ===============================================
export async function signUp(payload: SignUpPayload) {
  const parsedData = signUpFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const {
    data: { email, password },
  } = parsedData;
  let user, newUser;

  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  if (user)
    return {
      message: 'There is a user with this email',
      desc: 'Please choose another email',
    };

  const hashedPassword = await bcryptjs.hash(password, 8);

  try {
    newUser = await prisma.user.create({
      data: {
        avatar: '',
        username: '',
        email,
        password: hashedPassword,
        notes: [
          { id: uuidv4(), category: 'personal', notes: [] },
          { id: uuidv4(), category: 'work', notes: [] },
        ],
        bookmarks: [],
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while creating a new user',
      desc: 'Please try again ...',
    };
  }

  const token = jwt.sign({ userId: newUser.id }, process.env.TOKEN_KEY!);
  setCookie('auth-access', token, 60 * 60 * 24 * 2);
  redirect('/profile');
}

// =================== SIGN-IN
// ===============================================
export async function signIn(payload: SignInPayload) {
  const parsedData = signInFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const {
    data: { email, password },
  } = parsedData;
  let user;
  console.log(user);

  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  if (!user)
    return {
      message: 'There is no user with this email',
      desc: 'Please enter the correct email address',
    };

  const passwordIsValid = await bcryptjs.compare(password, user.password);
  if (!passwordIsValid)
    return {
      message: 'You entered a wrong password',
      desc: 'Please be careful when entering the password',
    };

  const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY!);
  setCookie('auth-access', token, 60 * 60 * 24 * 2);
  redirect('/profile');
}

// =================== SEND-EMAIL
// ===============================================
export async function sendEmail(payload: SendEmailPayload) {
  const parsedData = sendEmailFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const {
    data: { email },
  } = parsedData;
  let emailValidation;

  try {
    emailValidation = await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  if (!emailValidation)
    return {
      message: 'There is no user with this email',
      desc: 'Please enter the correct email address',
    };

  const secretKey = authenticator.generateSecret();
  const otpToken = authenticator.generate(secretKey);

  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset Password',
      react: EmailTemplate({ OTP: otpToken }),
    });
  } catch (error) {
    return {
      message: 'An error occurred while sending email',
      desc: 'Please connect to VPN to send email',
    };
  }

  const token = jwt.sign({ email, otpToken }, process.env.TOKEN_KEY!);
  setCookie('reset-access', token, 60 * 5);
  redirect('/forgot-password/reset-password');
}

// =================== RESET-PASSWORD
// ===============================================
export async function resetPassword(payload: ResetPasswordPayload) {
  const parsedData = ResetPasswordFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const resetAccessCookie = cookies().get('reset-access');
  if (!resetAccessCookie)
    return {
      message: 'OTP code is expired',
      desc: 'Please try with another OTP code',
    };

  const decodedToken: any = jwt.verify(resetAccessCookie.value, process.env.TOKEN_KEY!);
  const otpValidation = decodedToken.otpToken === parsedData.data.otp;

  if (!otpValidation)
    return {
      message: 'OTP code is incorrect',
      desc: 'Enter the correct code or use another OTP',
    };

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email: decodedToken.email } });
  } catch (error) {
    return {
      message: 'An error occurred while finding user information',
      desc: 'Please try again ...',
    };
  }

  const token = jwt.sign({ userId: user!.id }, process.env.TOKEN_KEY!);
  setCookie('auth-access', token, 60 * 60 * 24 * 2);

  const hashedPassword = await bcryptjs.hash(parsedData.data.password, 8);

  try {
    await prisma.user.update({
      where: { email: decodedToken.email },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while updating user password',
      desc: 'Please try again ...',
    };
  }

  redirect('/profile');
}

// =================== UPDATE-PROFILE
// ===============================================
export async function updateProfile(payload: UpdateProfilePayload, avatar: string) {
  const parsedData = UpdateProfileFormSchema.safeParse(payload);
  if (!parsedData.success)
    return {
      message: 'Wrong data format',
      success: false,
    };

  const userId = await getUserId();
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        avatar,
        username: parsedData.data.username,
        email: parsedData.data.email,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return {
      message: 'An error occurred while updating the profile',
      desc: 'Please try again ...',
    };
  }

  redirect('/profile');
}

// =================== LOG-OUT
// ===============================================
export async function logout() {
  cookies().delete('auth-access');
  redirect('/login');
}

// =================== DELETE-ACCOUNT
// ===============================================
export async function deleteAccount() {
  const authAccessCookie = cookies().get('auth-access');
  if (!authAccessCookie) redirect('/login');

  const decodedToken: any = jwt.verify(authAccessCookie.value, process.env.TOKEN_KEY!);

  try {
    await prisma.user.delete({
      where: { id: decodedToken?.userId },
    });
  } catch (error) {
    return {
      message: 'An error occurred while deleting your account',
      desc: 'Please try again ...',
    };
  }

  cookies().delete('auth-access');
  redirect('/sign-up');
}
