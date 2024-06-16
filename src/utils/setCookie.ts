import { cookies } from 'next/headers';

export default function setCookie(name: string, token: string, maxAge: number) {
  cookies().set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge,
    sameSite: 'strict',
    path: '/',
  });
}
