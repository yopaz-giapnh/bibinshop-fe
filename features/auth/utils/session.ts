import { auth } from '@/auth';

export async function getServerSession() {
  const session = await auth();
  return session;
}

export async function isSignedIn() {
  const session = await getServerSession();
  return !!session?.user.accessToken;
}

export async function getAccessToken() {
  const session = await getServerSession();
  return session?.user.accessToken;
}
