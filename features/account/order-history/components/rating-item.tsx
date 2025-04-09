import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';

type RatingItemProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function RatingItem({ label, value, onChange }: RatingItemProps) {
  return (
    <div className="flex items-center">
      <Typography as="boldSmall" element="p" className="w-[180px]">
        {label}
      </Typography>
      <Rating star={value} size={24} onClick={onChange} />
    </div>
  );
}
