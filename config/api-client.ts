import { getAccessToken } from '@/features/auth/utils/session';
import type { paths as oauthPaths } from '@/lib/api/oauth';
import type { paths as storefrontPaths } from '@/lib/api/storefront';
import * as auth from 'next-auth/react';
import createClient, { type Middleware } from 'openapi-fetch';

type paths = oauthPaths & storefrontPaths;

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

const throwOnError: Middleware = {
  async onRequest(req) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return req;
    }

    req.headers.set('Authorization', `Bearer ${accessToken}`);
    return req;
  },
  async onResponse(res) {
    // TODO: ちゃんと実装する
    if (res.status === 401) {
      await auth.signOut();
    }

    return res;
  }
};

const apiClient = createClient<paths>({
  baseUrl: baseURL
});

apiClient.use(throwOnError);

export { apiClient };
