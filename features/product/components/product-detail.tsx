import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { getCart } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { Store } from 'lucide-react';
import { Suspense } from 'react';
import { Product } from '../types';
import { Gallery } from './gallery';
import { ProductCartForm } from './product-cart-form';
import { ProductDescription } from './product-description';
import { ProductReviewList } from './product-review-list';
import { RecommendProduct } from './recommend-product';
import { ShopCard } from './shop-card';
import { Supplementary } from './supplementary';

type Props = {
  product: Product;
};

export async function ProductDetail({ product }: Props) {
  return (
    <div className="flex flex-col pt-[22px] md:pt-0">
      <div className="md:flex">
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex items-center gap-2 px-[8px] md:hidden">
            <BackButton />
            <Store className="h-[20px] w-[20px]" />
            <Typography as="bold" element="p" className="text-[14px] md:text-[20px]">
              {product.vendor?.attributes.name}
            </Typography>
          </div>
          <Gallery images={product.images} />
          <div className="px-4 md:hidden">
            <ProductCartForm product={product} getCart={getCart()} />
            <Suspense fallback={<LoadingSpinner />}>
              {product.vendor && <ShopCard vendorId={product.vendor.id} />}
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="mt-2">
                <Supplementary product={product} />
              </div>
            </Suspense>
          </div>
          <div className="mt-[12px] px-4 md:mt-0 md:px-0">
            <Typography as="boldTitle" element="h1" className="text-[20px] md:text-[24px]">
              {`レビュー (${product.attributes.reviews_count})`}
            </Typography>
            <div className="mt-4 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[6px] bg-powderBlue px-6 py-2 md:py-4">
              <div className="flex w-full items-center gap-2 self-stretch">
                {product.attributes.stars != null && (
                  <div className="inline-flex items-center gap-[9.78px]">
                    <Rating star={product.attributes.stars} readOnly />
                  </div>
                )}
                <Typography
                  as="boldTitle"
                  element="h1"
                  className="text-[20px] tracking-[0.96px] md:text-[32px]"
                >
                  {product.attributes.stars}
                </Typography>
              </div>
            </div>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <ProductReviewList productId={product.id} />
          </Suspense>

          <ProductDescription product={product} />
        </div>

        <div className="ml-[60px] flex flex-1 flex-col gap-5">
          <div className="hidden md:block">
            <ProductCartForm product={product} getCart={getCart()} />
          </div>
          <div className="hidden md:block">
            <Suspense fallback={<LoadingSpinner />}>
              {product.vendor && <ShopCard vendorId={product.vendor.id} />}
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="mt-5">
                <Supplementary product={product} />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="mt-[60px] flex flex-col items-center gap-4 md:items-start">
        <Typography as="title" element="h1" className="text-black-90">
          おすすめ商品
        </Typography>
        <Suspense fallback={<LoadingSpinner />}>
          <RecommendProduct />
        </Suspense>
      </div>
    </div>
  );
}
