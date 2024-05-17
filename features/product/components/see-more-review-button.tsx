'use client';

import { ArrowRight } from '@/components/icons/arrow-right';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { ComponentProps } from 'react';

type Props = Pick<ComponentProps<typeof Link>, 'href'>;

// TODO: see more buttonと共通化できる
export function SeeMoreReviewButton({ href }: Props) {
  return (
    <Link href={href} passHref>
      <Button className="flex h-[40px] w-[211px] items-center border border-bibinBlue-100 bg-white-base p-[8px]">
        <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
          全てのレビューを見る
        </Typography>
        <ArrowRight />
      </Button>
    </Link>
  );
}
