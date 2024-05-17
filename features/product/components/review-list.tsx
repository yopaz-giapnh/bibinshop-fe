import { Typography } from '@/components/ui/typography';
import { ReviewStars } from './review-stars';
import { SeeMoreReviewButton } from './see-more-review-button';

export function ReviewList() {
  const reviews = [1, 2, 3, 4, 5];
  const seeMore = reviews.length > 3;

  return (
    <div className="flex flex-col">
      <Typography as="boldTitle" element="h1">
        レビュー (95)
      </Typography>

      <div className="mt-4 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[6px] bg-powderBlue px-6 py-4">
        <div className="flex w-full items-center gap-2 self-stretch">
          <div className="inline-flex items-center gap-[9.78px]">
            <ReviewStars reviewCount={5} viewSize={26} starSize={19} />
          </div>
          <Typography as="boldTitle" element="h1" className="text-[32px] tracking-[0.96px]">
            5.00
          </Typography>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-6">
        {reviews.slice(0, 3).map((_, index) => (
          <div key={index} className="flex w-full">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-bibinBlue-100">
              <Typography as="boldSmall" element="p" className="text-white-base">
                C
              </Typography>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-2">
                <Typography as="boldSmall" element="p" className="text-charcoalGray">
                  chi***
                </Typography>
                <Typography as="small" element="p" className="text-charcoalGray">
                  •
                </Typography>
                <Typography as="small" element="p" className="font-normal text-charcoalGray">
                  2024/3/8
                </Typography>
                <Typography as="small" element="p" className="text-charcoalGray">
                  •
                </Typography>
                <ReviewStars reviewCount={5} viewSize={21} starSize={18} />
              </div>
              <Typography as="small" element="p" className="text-black-100 mt-2">
                色: バーガンディ
              </Typography>
              <Typography
                as="body"
                element="p"
                className="text-black-100 mt-4 max-w-[42vw] font-normal"
              >
                細かいラメのザラつきは感じますが良い感じにキラキラしてて取れにくいし1回でツヤツヤしてます。
              </Typography>
            </div>
          </div>
        ))}

        {seeMore && (
          <div className="mx-auto">
            <SeeMoreReviewButton href="/reviews" />
          </div>
        )}
      </div>
    </div>
  );
}
