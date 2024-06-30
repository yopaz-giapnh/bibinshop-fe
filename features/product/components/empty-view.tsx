import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export default async function EmptyView() {
  return (
    <div className="mx-[16px] flex flex-col items-center justify-center">
      <BibiSuprisedFace />
      <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
        申し訳ございません。検索に一致する商品はありませんでした。
      </Typography>
      <Link href="/" className="mb-[80px] mt-[24px]" passHref>
        <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
          ホームに戻る
        </Button>
      </Link>
    </div>
  );
}
