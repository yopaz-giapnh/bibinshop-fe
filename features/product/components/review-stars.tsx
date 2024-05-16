import { Star } from 'lucide-react';

type Props = {
  reviewCount: number;
  viewSize: number;
  starSize: number;
};

export function ReviewStars({ reviewCount, viewSize, starSize }: Props) {
  return (
    <div className="flex">
      {Array.from({ length: reviewCount }).map((_, index) => (
        <div
          key={index}
          style={{ width: viewSize, height: viewSize }}
          className="flex items-center justify-center"
        >
          <Star className="fill-sunburstYellow text-sunburstYellow" size={starSize} />
        </div>
      ))}
    </div>
  );
}
