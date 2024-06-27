import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { apiClient } from './config/api-client';
import { calculateAccessTokenExpires } from './features/auth/utils';
import { isNumber } from './utils/isNumber';
import { isString } from './utils/string';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('nextUrl', nextUrl);
      return isLoggedIn;
    },
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
  }
} satisfies NextAuthConfig;

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
