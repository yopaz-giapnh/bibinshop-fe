import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { accountConfirm, createToken, getUser } from './features/auth/actions';
import { calculateAccessTokenExpires } from './features/auth/utils';
import { associateCart } from './features/cart/actions';

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

          await associateCart({ accessToken: token.access_token });

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
    }),
    Credentials({
      id: 'confirmation',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ confirmationToken: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { confirmationToken } = parsedCredentials.data;

          const token = await accountConfirm(confirmationToken);
          if (!token) {
            return null;
          }

          const user = await getUser({ accessToken: token.access_token });
          if (!user) {
            return null;
          }

          await associateCart({ accessToken: token.access_token });

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
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ]
});
