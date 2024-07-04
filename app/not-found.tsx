import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { ProductOverviewByTaxon } from '@/features/product/components/product-overview-by-taxon';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function NotFound() {
  return (
    <>
      <div className="mx-[49px] mt-32 flex flex-col items-center justify-center md:mt-60">
        <Typography as="title" element="h1" className="mb-[24px]">
          404 not found
        </Typography>
        <BibiSuprisedFace />
        <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
          申し訳ございません。指定されたページは存在いたしません。
        </Typography>
        <Link href="/" className="mb-[80px] mt-[24px]" passHref>
          <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
            ホームに戻る
          </Button>
        </Link>
      </div>
      <div className="ml-2 mr-2 flex md:ml-6 md:mr-6">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductOverviewByTaxon title="新着" seeMoreUrl="/products/new?page=1" />
        </Suspense>
      </div>
    </>
  );
}
