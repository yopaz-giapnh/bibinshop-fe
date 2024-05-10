import { Typography } from '@/components/ui/typography';
import { CarouselBanner } from '@/features/banner/components/carousel-banner';
import {
  ProductOverview,
  ProductOverviewSkeleton
} from '@/features/product/components/product-overview';
import { productsList } from '@/lib/api/products/products';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <CarouselBanner />

        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 px-[46.5px] py-6">
            <Suspense fallback={<ProductOverviewSkeleton />}>
              <ProductOverview
                title="ベストセラー"
                seeMoreUrl="/products/bestsellers"
                columns={5}
                productListResponse={productsList({ include: 'images' })}
              />
            </Suspense>
            <Suspense fallback={<ProductOverviewSkeleton />}>
              <ProductOverview
                title="新着"
                seeMoreUrl="/products/new"
                columns={5}
                productListResponse={productsList({ include: 'images' })}
              />
            </Suspense>
          </div>
          <div className="flex flex-col items-center bg-paleFrostBlue px-[46.5px] py-6">
            <Typography as="bold" element="h2" className="text-bibinBlue-100">
              \ 売れてる商品 /
            </Typography>
            <div className="mt-1">
              <Suspense fallback={<ProductOverviewSkeleton />}>
                <ProductOverview
                  title="ランキング"
                  seeMoreUrl="/products/ranking"
                  columns={5}
                  productListResponse={productsList({ include: 'images' })}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
