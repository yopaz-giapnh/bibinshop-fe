'use server';

import { apiClient } from '@/config/api-client';
import { isTaxonImageSchema } from '@/features/product/utils';
import { TAGS } from '../constans';
import { TaxonIncludes, TaxonSchema, TaxonsListParameters } from '../types';

const HIDDEN_CATEGORY = 'カテゴリー';

export async function getTaxons(params?: TaxonsListParameters) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/taxons', {
    params: {
      query: {
        include: 'image',
        ...params?.query
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.taxons] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
  }

  const { data: taxons, included: taxonIncluded } = data;

  return reshapeTaxons({
    taxons,
    taxonIncluded
  });
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
      return fetch(request, { next: { tags: [TAGS.taxons] }, cache: 'no-store' });
    }
  });

  if (error) {
    throw error;
  }

  return data.data;
}

function reshapeTaxons({
  taxons,
  taxonIncluded
}: {
  taxons: TaxonSchema[];
  taxonIncluded?: TaxonIncludes[];
}) {
  const allTaxonImages = taxonIncluded?.filter(isTaxonImageSchema) || [];

  return taxons
    .filter((taxon) => taxon.attributes.name !== HIDDEN_CATEGORY)
    .map((taxon) => {
      const taxonImage = allTaxonImages.find(
        (image) => image.id === taxon.relationships.image?.data?.id
      );

      return {
        ...taxon,
        taxonImage
      };
    });
}
