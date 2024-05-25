import MagnifyingGlass from '@/assets/magnifying-glass.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getProducts } from '@/features/product/api/products';
import { ProductOverview } from '@/features/product/components/product-overview';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className="h-default-screen-calc mx-[49px] flex flex-col items-center justify-center">
      <Typography as="title" element="h1" className="mb-[24px]">
        404 not found
      </Typography>
      <MagnifyingGlass />
      <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
        申し訳ございません。指定されたページは存在いたしません。
      </Typography>
      <Link href="/" className="mb-[80px] mt-[24px]" passHref>
        <Button size="lg" variant="lg" type="button" className="w-[392px]">
          ホームに戻る
        </Button>
      </Link>
      <ProductOverview
        title="新着"
        seeMoreUrl="/products/new"
        products={await getProducts()}
        columns={5}
      />
    </div>
  );
}
