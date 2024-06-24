import { Typography } from '@/components/ui/typography';
import { formatDateString } from '@/utils/date';
import { Review } from '../types';
import Rating from './rating';

type Props = {
  reviews: Review[];
};

export function ReviewListWithAvator({ reviews }: Props) {
  return (
    <div className="flex flex-col px-4 md:px-0">
      <div className="mt-4 flex flex-col gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex w-full">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-bibinBlue-100">
              <Typography as="boldSmall" element="p" className="text-white-base">
                C
              </Typography>
            </div>
            <div className="ml-3 md:ml-6">
              <div className="flex items-center gap-2">
                <Typography
                  as="boldSmall"
                  element="p"
                  className="max-w-[30px] overflow-hidden whitespace-normal break-words text-charcoalGray md:max-w-none"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1
                  }}
                >
                  {review.user?.attributes.nickname ?? '匿名'}
                </Typography>
                <Typography as="small" element="p" className="text-charcoalGray">
                  •
                </Typography>
                <Typography as="small" element="p" className="font-normal text-charcoalGray">
                  {formatDateString(review.attributes.created_at)}
                </Typography>
                <Typography as="small" element="p" className="text-charcoalGray">
                  •
                </Typography>
                <Rating star={review.attributes.rating ?? 0} readOnly />
              </div>
              {/* TODO: api が実装されてから */}
              {/* <Typography as="small" element="p" className="text-black-100 mt-2">
                色: バーガンディ
              </Typography> */}
              <Typography
                as="body"
                element="p"
                className="text-black-100 mt-4 max-w-[285px] font-normal md:max-w-[42vw]"
              >
                {review.attributes.review}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
