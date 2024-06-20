import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getProducts } from '@/features/product/actions';
import { ProductOverview } from '@/features/product/components/product-overview';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <>
      <div className="mx-[49px] mt-60 flex flex-col items-center justify-center">
        <Typography as="title" element="h1" className="mb-[24px]">
          404 not found
        </Typography>
        <BibiSuprisedFace />
        <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
          申し訳ございません。指定されたページは存在いたしません。
        </Typography>
        <Link href="/" className="mb-[80px] mt-[24px]" passHref>
          <Button size="lg" variant="lg" type="button" className="w-[392px]">
            ホームに戻る
          </Button>
        </Link>
      </div>
      <div className="ml-6 mr-6 flex">
        <ProductOverview
          title="新着"
          seeMoreUrl="/products/new"
          products={(await getProducts()).data}
          columns={5}
        />
      </div>
    </>
  );
}
