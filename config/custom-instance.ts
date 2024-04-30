const baseURL = process.env.NEXT_PUBLIC_API_URL!;

export type BodyType<BodyData> = BodyData;

async function getAccessToken() {
  return 'TODO: token';
}

export const customInstance = async <T>({
  url,
  method,
  headers,
  params,
  data,
  signal
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: { Authorization?: string } & { 'Content-Type'?: string };
  params?: any;
  data?: BodyType<unknown>;
  responseType?: string;
  signal?: AbortSignal;
}): Promise<T> => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  const response = await fetch(`${baseURL}${url}?` + new URLSearchParams(params), {
    headers,
    method,
    body: JSON.stringify(data),
    signal
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export default customInstance;
