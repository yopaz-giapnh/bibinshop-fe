'use client';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';

type Props = Pick<ComponentProps<typeof Link>, 'href'> & {
  arrow: 'right' | 'bottom';
};

export function SeeMoreButton({ href, arrow }: Props) {
  const renderArrow = () => {
    if (arrow === 'right') {
      return <ChevronRight className="h-[21px] w-5 text-bibinBlue-100" />;
    }
    if (arrow === 'bottom') {
      return <ChevronDown className="h-[21px] w-5 text-bibinBlue-100" />;
    }
  };

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
        {renderArrow()}
      </Button>
    </Link>
  );
}
