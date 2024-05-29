import BibiBubbleCart from '@/assets/bibincban/bubble-cart.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center">
      <BibiBubbleCart />

      <Typography as="body" element="h2" className="mt-6 text-center text-black-80">
        カート内に商品がありません。
      </Typography>

      <Link href="/" passHref>
        <Button size="lg" variant="lg" className="mt-10 w-[392px]">
          買い物する
        </Button>
      </Link>
    </div>
  );
}
