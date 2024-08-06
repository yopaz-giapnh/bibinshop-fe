import BibiSuprisedFace from '@/assets/bibincban/surprised-face.svg';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

export default function SnsUserListEmptyView() {
  return (
    <div className="mx-[16px] mt-[16px] flex flex-col items-center justify-center">
      <BibiSuprisedFace />
      <Typography as="caption" element="p" className="mt-[24px] text-[16px]">
        検索に一致するユーザーがいませんでした。
      </Typography>
      <Link href="/" className="mb-[80px] mt-[24px]" passHref>
        <Button size="lg" variant="lg" type="button" className="w-[220px] md:w-[392px]">
          ホームに戻る
        </Button>
      </Link>
    </div>
  );
}
