import { Typography } from '@/components/ui/typography';
import { getCart } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { Suspense } from 'react';
import { getProducts } from '../actions';
import { Product } from '../types';
import { Gallery } from './gallery';
import { ProductCartForm } from './product-cart-form';
import { ProductDescription } from './product-description';
import { ProductGrid } from './product-grid';
import { ProductReviewList } from './product-review-list';
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
          <>
            <Typography as="boldTitle" element="h1">
              {`レビュー (${product.attributes.reviews_count})`}
            </Typography>

            <div className="mt-4 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[6px] bg-powderBlue px-6 py-4">
              <div className="flex w-full items-center gap-2 self-stretch">
                {product.attributes.stars != null && (
                  <div className="inline-flex items-center gap-[9.78px]">
                    <Rating star={product.attributes.stars} readOnly />
                  </div>
                )}
                <Typography as="boldTitle" element="h1" className="text-[32px] tracking-[0.96px]">
                  {product.attributes.stars}
                </Typography>
              </div>
            </div>
          </>

          <Suspense fallback={<div>Loading...</div>}>
            <ProductReviewList productId={product.id} />
          </Suspense>

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
