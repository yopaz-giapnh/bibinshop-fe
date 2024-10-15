import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ChevronDown } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export function SeeMoreReviewButton({ onClick }: Props) {
  return (
    <Button
      className="flex h-[40px] w-[211px] items-center border border-bibinBlue-100 bg-white-base p-[8px]"
      onClick={onClick}
    >
      <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
        全てのレビューを見る
      </Typography>
      <ChevronDown className="h-5 w-5 text-bibinBlue-100" />
    </Button>
  );
}
