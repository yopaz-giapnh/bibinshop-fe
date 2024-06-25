import { getProductsOnTaxons, getTaxonId } from '../actions';
import { ProductOverview } from './product-overview';

type Props = {
  title: string;
  seeMoreUrl: string;
};

export async function ProductOverviewByTaxon({ title, seeMoreUrl }: Props) {
  const taxonId = await getTaxonId(title);
  if (!taxonId) {
    return null;
  }

  const products = await getProductsOnTaxons([taxonId]);

  return (
    <ProductOverview title={title} products={products.data} columns={5} seeMoreUrl={seeMoreUrl} />
  );
}
