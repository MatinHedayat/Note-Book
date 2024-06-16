import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicPaths = [
  '/login',
  '/sign-up',
  '/forgot-password/send-email',
  '/forgot-password/reset-password',
];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authAccess = cookies().has('auth-access');

  if (publicPaths.includes(pathname) && authAccess) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  if (!publicPaths.includes(pathname) && !authAccess) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/sign-up',
    '/forgot-password',
    '/forgot-password/send-email',
    '/forgot-password/reset-password',
  ],
};
