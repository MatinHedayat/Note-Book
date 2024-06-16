import prisma from '@/dbconfig';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function getUser() {
  const authAccessCookie = cookies().get('auth-access');
  if (!authAccessCookie) redirect('/login');

  const decodedToken: any = jwt.verify(authAccessCookie?.value, process.env.TOKEN_KEY!);

  return await prisma.user.findUnique({ where: { id: decodedToken.userId } });
}


