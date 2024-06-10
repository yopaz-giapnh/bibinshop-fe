'use server';

import { apiClient } from '@/config/api-client';
import { TAGS } from '../constans';

export async function getTaxons() {
  const { data, error } = await apiClient.GET('/api/v2/storefront/taxons', {
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 3600, tags: [TAGS.taxons] } });
    }
  });

  if (error) {
    throw new Error(error);
  }

  return data.data;
}

export async function getRootTaxons(fields: string[] = ['']) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/taxons', {
    params: {
      query: {
        'filter[roots]': true,
        'fields[taxon]': fields.join(',')
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { revalidate: 3600, tags: [TAGS.taxons] } });
    }
  });

  if (error) {
    throw new Error(error);
  }

  return data.data;
}
