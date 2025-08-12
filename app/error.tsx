'use client';

import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function Error() {
  const { t } = useTranslation();
  return (
    <div className="mx-[49px] mt-32 flex flex-col items-center justify-center md:mt-60">
      <Typography as="title" element="h1" className="mb-[24px]">
        {t('error.title')}
      </Typography>
      <BibiSuprisedFace />
      <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
        {t('error.message')}
      </Typography>
      <Link href="/" className="mb-[80px] mt-[24px]" passHref>
        <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
          {t('common.backHome')}
        </Button>
      </Link>
    </div>
  );
}
