import { options } from '@/app/api/auth/[...nextauth]/options';
import * as auth from 'next-auth';

export async function getServerSession() {
  const session = await auth.getServerSession(options);
  return session;
}

export async function isSignedIn() {
  const session = await getServerSession();
  return !!session?.user.accessToken;
}
