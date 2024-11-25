import { auth } from '@/auth';
import { getAccount } from '@/features/account/profile/actions';

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

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user.accessToken) {
    return null;
  }

  try {
    return await getAccount();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}
