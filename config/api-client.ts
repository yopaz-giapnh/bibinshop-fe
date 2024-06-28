import { getAccessToken } from '@/features/auth/utils/session';
import { COOKIES } from '@/features/cart/constants';
import type { paths as oauthPaths } from '@/lib/api/oauth';
import type { paths as storefrontPaths } from '@/lib/api/storefront';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import createClient, { type Middleware } from 'openapi-fetch';

type paths = oauthPaths & storefrontPaths;

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

const throwOnError: Middleware = {
  async onRequest(req) {
    const oauthTokenRequest = req.schemaPath === '/spree_oauth/token';
    if (oauthTokenRequest) {
      return req;
    }

    const accessToken = await getAccessToken();
    if (accessToken) {
      req.headers.set('Authorization', `Bearer ${accessToken}`);
      return req;
    }

    const cartToken = cookies().get(COOKIES.cartToken);
    if (cartToken) {
      req.headers.set('X-Spree-Order-Token', cartToken.value);
      return req;
    }

    return req;
  },
  async onResponse(res) {
    if (res.status === 401) {
      redirect('/auth/signout');
    }

    return res;
  }
};

const apiClient = createClient<paths>({
  baseUrl: baseURL
});

apiClient.use(throwOnError);

export { apiClient };
