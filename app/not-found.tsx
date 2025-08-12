import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { NotFoundSkeleton } from '@/features/not-found/components/skeletons/not-found-skeleton';
import { ProductOverviewByTaxon } from '@/features/product/components/product-overview-by-taxon';
import { Locale, translate } from '@/lib/i18n';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function NotFound() {
  const locale = (cookies().get('NEXT_LOCALE')?.value || 'ja') as Locale;
  const t = (key: string) => translate(locale, key);
  return (
    <Suspense fallback={<NotFoundSkeleton />}>
      <div className="mx-[49px] mt-32 flex flex-col items-center justify-center md:mt-60">
        <Typography as="title" element="h1" className="mb-[24px]">
          {t('notFound.title')}
        </Typography>
        <BibiSuprisedFace />
        <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
          {t('notFound.message')}
        </Typography>
        <Link href="/" className="mb-[80px] mt-[24px]" passHref>
          <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
            {t('common.backHome')}
          </Button>
        </Link>
      </div>
      <div className="ml-2 mr-2 flex md:ml-6 md:mr-6">
        <ProductOverviewByTaxon
          title={t('nav.new')}
          taxonName="新着"
          seeMoreUrl="/products/new?page=1"
        />
      </div>
    </Suspense>
  );
}
