import { Typography } from '@/components/ui/typography';
import { getCart } from '@/features/cart/actions';
import { ReviewListWithAvator } from '@/features/review/components/review-list-with-avator';
import { SeeMoreReviewButton } from '@/features/review/components/see-more-review-button';
import { Suspense } from 'react';
import { getProducts } from '../actions';
import { Product } from '../types';
import { Gallery } from './gallery';
import { ProductCartForm } from './product-cart-form';
import { ProductDescription } from './product-description';
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
        <div className="flex flex-col gap-6">
          <Gallery images={product.images} />
          <ReviewListWithAvator />
          <div className="mx-auto">
            <SeeMoreReviewButton href="/reviews" />
          </div>
          <ProductDescription product={product} />
        </div>

        <div className="ml-[60px] flex flex-1 flex-col gap-5">
          <ProductCartForm product={product} getCart={getCart()} />
          <Suspense fallback={<div>Loading...</div>}>
            {product.vendor && <ShopCard vendorId={product.vendor.id} />}
          </Suspense>
          <Supplementary />
        </div>
      </div>
      <div className="mt-[60px] flex flex-col gap-4">
        <Typography as="title" element="h1" className="text-black-90">
          おすすめ商品
        </Typography>
        <ProductGrid
          columns={5}
          products={[...(await getProducts()).data]}
          className="grid-cols-5 gap-x-2 gap-y-4"
        />
      </div>
    </div>
  );
}
