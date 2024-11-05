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

  // 在庫がある商品のみをフィルタリング
  const availableProducts = products.data.filter(
    (product) => product.attributes.total_on_hand && product.attributes.total_on_hand > 0
  );

  return (
    <ProductOverview
      title={title}
      products={availableProducts}
      columns={5}
      seeMoreUrl={seeMoreUrl}
    />
  );
}
