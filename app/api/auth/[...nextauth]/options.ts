import { getAccountInformationQueryKey } from '@/lib/api/account/account';
import { createOrRefreshToken } from '@/lib/api/token/token';
import { isString } from '@/utils/string';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          try {
            const { email, password } = parsedCredentials.data;
            const loginResponse = await createOrRefreshToken({
              grant_type: 'password',
              username: email,
              password
            });

            if (loginResponse.access_token) {
              const userResponse = await fetch(
                process.env.API_URL + getAccountInformationQueryKey()[0],
                {
                  method: 'GET',
                  headers: {
                    accept: 'application/vnd.api+json',
                    Authorization: `Bearer ${loginResponse.access_token}`
                  }
                }
              );

              if (userResponse.ok) {
                const user = await userResponse.json();

                return {
                  id: user.data.id,
                  accessToken: loginResponse.access_token,
                  refreshToken: loginResponse.refresh_token
                };
              } else {
                console.log('Unable to retrieve user data');
                return null;
              }
            } else {
              console.log('Login failed');
              return null;
            }
          } catch (error) {
            console.error(error);
            return null;
          }
        }

        console.log('Invalid credentials structure');
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (isString(token.accessToken) && isString(token.refreshToken)) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }

      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};
