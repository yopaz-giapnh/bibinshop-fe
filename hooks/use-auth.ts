import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session } = useSession();
  return {
    isLoggedIn: !!session,
    user: session?.user
  };
}
