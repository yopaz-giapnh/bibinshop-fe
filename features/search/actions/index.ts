'use server';
import { apiClient } from '@/config/api-client';

export async function getAutoComplete(term: string): Promise<string[]> {
  if (!term || !term.trim()) return [];
  const { error, data } = await apiClient.GET('/api/v2/storefront/search/{search_term}', {
    params: {
      path: {
        search_term: term
      }
    }
  });
  if (error) {
    console.error(error);
    return [];
  }
  return data.data.map((item) => item.attributes.name);
}

export type PopularSearchTerm = {
  term: string;
  isHot: boolean;
};
export async function getPopularSearches(): Promise<PopularSearchTerm[]> {
  const { error, data } = await apiClient.GET('/api/v2/storefront/popular_searches');
  if (error) {
    console.error(error);
    return [];
  }
  const totalCounts = data.reduce((acc, item) => acc + item.count, 0);
  return data.map((item) => ({
    term: item.term,
    isHot: item.count > totalCounts * 0.2
  }));
}
