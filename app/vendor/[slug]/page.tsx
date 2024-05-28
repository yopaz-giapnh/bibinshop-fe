import { getProducts } from '@/features/product/api/products';
import { VendorHeader } from '@/features/vendor/components/vendor-header';
import VendorTabs from '@/features/vendor/components/vendor-tabs';

export default async function Page({ params }: { params: { slug: string } }) {
  // TODO: ベンダー情報取得
  console.log(params.slug);
  return (
    <div className="h-full w-full bg-white-base px-16 pb-6">
      <div className="pt-[128px]">
        <VendorHeader
          imageUrl="/vendor-header-image-sample.png"
          vendorName="ドクターダイエット公式"
          star={4.5}
          count={34}
        />
        <VendorTabs products={await getProducts()} review={4.5} />
      </div>
    </div>
  );
}
