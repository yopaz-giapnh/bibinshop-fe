'use client';

import { ArrowRight } from '@/components/icons/arrow-right';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { ComponentProps } from 'react';

type Props = Pick<ComponentProps<typeof Link>, 'href'>;

export function SeeMoreButton({ href }: Props) {
  return (
    <Link href={href} passHref>
      <Button
        className="w-[230px] border border-bibinBlue-100 bg-white-base"
        size="lg"
        variant="lg"
      >
        <Typography as="bold" element="p" className="text-bibinBlue-100">
          もっと見る
        </Typography>
        <ArrowRight />
      </Button>
    </Link>
  );
}
