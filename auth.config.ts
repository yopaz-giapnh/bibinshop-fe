import type { NextAuthConfig } from 'next-auth';
import { createTokenByGoogle, getUser } from './features/auth/actions';
import { calculateAccessTokenExpires } from './features/auth/utils';
import { associateCart } from './features/cart/actions';
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
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      // 初回ログイン時
      if (user && account) {
        switch (account.provider) {
          case 'google':
            return await handleGoogleLogin({ idToken: account.id_token });
          default:
            return { ...token, ...user };
        }
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

async function handleGoogleLogin({ idToken }: { idToken: string | undefined }) {
  if (!idToken) {
    return null;
  }

  const token = await createTokenByGoogle({ idToken });
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
