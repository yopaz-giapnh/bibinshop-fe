import { ProductGrid } from './product-grid';

import { getProducts } from '../actions';

export async function RecommendProduct() {
  const products = await getProducts();

  return (
    <div className="px-[8px] md:px-0">
      <ProductGrid columns={5} products={products.data} />
    </div>
  );
}
