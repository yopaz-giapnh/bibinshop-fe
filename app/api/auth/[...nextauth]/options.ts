import { getAccountInformationQueryKey } from '@/lib/api/account/account';
import { Token } from '@/lib/api/schema';
import { createOrRefreshToken } from '@/lib/api/token/token';
import { isNumber } from '@/utils/isNumber';
import { isString } from '@/utils/string';
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
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
                  refreshToken: loginResponse.refresh_token,
                  accessTokenExpires: calculateAccessTokenExpires(loginResponse)
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
      // 初回ログイン時
      if (user) {
        return { ...token, ...user };
      }

      // トークン有効期限内
      if (isNumber(token.accessTokenExpires) && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // トークン有効期限切れ
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (
        isString(token.accessToken) &&
        isString(token.refreshToken) &&
        isNumber(token.accessTokenExpires)
      ) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accessTokenExpires = token.accessTokenExpires;
      }

      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};

const refreshAccessToken = async (token: JWT) => {
  try {
    console.log('Refreshing access token', token);
    const refreshResponse = await createOrRefreshToken({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken
    });

    return {
      ...token,
      accessToken: refreshResponse.access_token,
      refreshToken: refreshResponse.refresh_token,
      accessTokenExpires: calculateAccessTokenExpires(refreshResponse)
    };
  } catch (error) {
    return {
      ...token,
      error
    };
  }
};

function calculateAccessTokenExpires(token: Token): number {
  const accessTokenExpires = new Date(token.created_at * 1000);
  accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + token.expires_in);
  return accessTokenExpires.getTime();
}
