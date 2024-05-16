import { Typography } from '@/components/ui/typography';
import { getProducts } from '../api/products';
import { Product } from '../types';
import { Gallery } from './gallery';
import { ProductCartForm } from './product-cart-form';
import { ProductGrid } from './product-grid';
import { ShopCard } from './shop-card';
import { Supplementary } from './supplementary';

type Props = {
  product: Product;
};

export async function ProductDetail({ product }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Gallery images={product.images} />

        <div className="ml-[60px] flex flex-1 flex-col gap-5">
          <ProductCartForm product={product} />
          <ShopCard />
          <Supplementary />
        </div>
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
