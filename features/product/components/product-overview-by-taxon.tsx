import { getProductsOnTaxons, getRecommendedProducts, getTaxonId } from '../actions';
import { ProductOverviewServer } from './product-overview-server';

type Props = {
  title: string;
  seeMoreUrl: string;
};

export async function ProductOverviewByTaxon({ title, seeMoreUrl }: Props) {
  let products;
  let showSeeMore = true;

  if (title === 'おすすめ商品') {
    const result = await getRecommendedProducts();
    products = result;
    showSeeMore = false;
  } else {
    const taxonId = await getTaxonId(title);
    if (!taxonId) {
      return null;
    }
    products = await getProductsOnTaxons([taxonId]);
  }

  if (!products.data || products.data.length === 0) {
    return null;
  }

  return (
    <ProductOverviewServer
      title={title}
      products={products.data}
      columns={5}
      seeMoreUrl={showSeeMore ? seeMoreUrl : undefined}
    />
  );
}
