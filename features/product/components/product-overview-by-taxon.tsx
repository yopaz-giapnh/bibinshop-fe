import { getProductsOnTaxons, getRecommendedProducts, getTaxonId } from '../actions';
import { ProductOverview } from './product-overview';

type Props = {
  /** Localized title */
  title: string;
  /** URL for the "see more" link */
  seeMoreUrl: string;
  /** Original taxon name used to fetch products */
  taxonName?: string;
  /** Whether to load recommended products instead of by taxon */
  recommended?: boolean;
};

export async function ProductOverviewByTaxon({ title, seeMoreUrl, taxonName, recommended }: Props) {
  let products;
  let showSeeMore = true;

  if (recommended) {
    const result = await getRecommendedProducts();
    products = result;
    showSeeMore = false;
  } else if (taxonName) {
    const taxonId = await getTaxonId(taxonName);
    if (!taxonId) {
      return null;
    }
    products = await getProductsOnTaxons([taxonId]);
  } else {
    return null;
  }

  if (!products.data || products.data.length === 0) {
    return null;
  }

  return (
    <ProductOverview
      title={title}
      products={products.data}
      columns={5}
      seeMoreUrl={showSeeMore ? seeMoreUrl : undefined}
    />
  );
}
