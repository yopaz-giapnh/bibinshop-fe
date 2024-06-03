import { Typography } from '@/components/ui/typography';
import { CarouselBanner } from '@/features/banner/components/carousel-banner';
import { getProducts } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';

export default async function Page() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex w-full flex-col pt-[126px]">
        <CarouselBanner />

        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 px-[46.5px] py-6">
            <ProductOverview
              title="ベストセラー"
              seeMoreUrl="/products/bestsellers"
              products={(await getProducts()).data}
              columns={5}
            />
            <ProductOverview
              title="新着"
              seeMoreUrl="/products/new"
              products={(await getProducts()).data}
              columns={5}
            />
          </div>
          <div className="flex flex-col items-center bg-paleFrostBlue px-[46.5px] py-6">
            <Typography as="bold" element="h2" className="text-bibinBlue-100">
              \ 売れてる商品 /
            </Typography>
            <div className="mt-1">
              <ProductOverview
                title="ランキング"
                seeMoreUrl="/products/ranking"
                products={(await getProducts()).data}
                columns={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
