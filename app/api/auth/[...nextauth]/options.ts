import { apiClient } from '@/config/api-client';
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
            const loginResponse = await apiClient.POST('/spree_oauth/token', {
              body: {
                grant_type: 'password',
                username: email,
                password
              }
            });

            if (loginResponse.data?.access_token) {
              const userResponse = await apiClient.GET('/api/v2/storefront/account', {
                headers: {
                  accept: 'application/vnd.api+json',
                  Authorization: `Bearer ${loginResponse.data.access_token}`
                }
              });

              if (!userResponse.error) {
                const user = userResponse.data;

                return {
                  id: user.data.id,
                  accessToken: loginResponse.data.access_token,
                  refreshToken: loginResponse.data.refresh_token,
                  accessTokenExpires: calculateAccessTokenExpires({
                    createdAt: loginResponse.data.created_at,
                    expiresIn: loginResponse.data.expires_in
                  })
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
    if (!isString(token.refreshToken)) {
      throw new Error('Missing refresh token');
    }

    const refreshResponse = await apiClient.POST('/spree_oauth/token', {
      body: {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      }
    });

    if (refreshResponse.error) {
      throw new Error('Failed to refresh access token');
    }

    return {
      ...token,
      accessToken: refreshResponse.data?.access_token,
      refreshToken: refreshResponse.data?.refresh_token,
      accessTokenExpires: calculateAccessTokenExpires({
        createdAt: refreshResponse.data?.created_at,
        expiresIn: refreshResponse.data?.expires_in
      })
    };
  } catch (error) {
    return {
      ...token,
      error
    };
  }
};

function calculateAccessTokenExpires({
  createdAt,
  expiresIn
}: {
  createdAt: number;
  expiresIn: number;
}): number {
  const accessTokenExpires = new Date(createdAt * 1000);
  accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + expiresIn);
  return accessTokenExpires.getTime();
}
