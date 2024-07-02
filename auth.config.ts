import type { NextAuthConfig } from 'next-auth';
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
  session: {
    maxAge: 2592000 // 30 days
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('nextUrl', nextUrl);
      return isLoggedIn;
    },
    async jwt({ token, user, account }) {
      // 初回ログイン時
      if (user && account) {
        return { ...token, ...user };
      }

      return token;
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
