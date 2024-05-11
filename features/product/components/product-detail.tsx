import { Typography } from '@/components/ui/typography';
import { getProducts } from '../api/products';
import { Product } from '../types';
import { Gallery } from './gallery';
import { ProductGrid } from './product-grid';

type Props = {
  product: Product;
};

export async function ProductDetail({ product }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Gallery images={product.images} />
      </div>
      <div className="mt-[60px] flex flex-col gap-4">
        <Typography as="title" element="h1" className="text-black-90">
          おすすめ商品
        </Typography>
        <ProductGrid
          columns={5}
          products={[...(await getProducts()), ...(await getProducts())]}
          className="grid-cols-5 gap-x-2 gap-y-4"
        />
      </div>
    </div>
  );
}
