import type { paths as oauthPaths } from '@/lib/api/oauth';
import type { paths as storefrontPaths } from '@/lib/api/storefront';
import createClient, { type Middleware } from 'openapi-fetch';

type paths = oauthPaths & storefrontPaths;

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const body = res.headers.get('content-type')?.includes('json')
        ? await res.clone().json()
        : await res.clone().text();
      throw new Error(body);
    }
    return undefined;
  }
};

const apiClient = createClient<paths>({
  baseUrl: baseURL
});

apiClient.use(throwOnError);

export { apiClient };
