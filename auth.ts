import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { apiClient } from './config/api-client';
import { createToken } from './features/auth/actions';
import { calculateAccessTokenExpires } from './features/auth/utils';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const token = await createToken({ email, password });
          if (!token) {
            return null;
          }

          const user = await getUser({ accessToken: token.access_token });
          if (!user) {
            return null;
          }

          return {
            id: user.id,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            accessTokenExpires: calculateAccessTokenExpires({
              createdAt: token.created_at,
              expiresIn: token.expires_in
            })
          };
        }

        console.log('Invalid credentials');
        return null;
      }
    })
  ]
});

async function getUser({ accessToken }: { accessToken: string }) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account', {
    headers: {
      accept: 'application/vnd.api+json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (error) {
    throw error;
  }

  const { data: user } = data;

  return user;
}
