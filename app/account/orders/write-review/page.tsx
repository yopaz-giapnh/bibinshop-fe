'use client';

import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { AnimatedWriteReviewContainer } from '@/features/account/order-history/components/animated-write-review-container';
import WriteReview from '@/features/account/order-history/components/write-review';
import { Suspense, useEffect, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { HistoryTabBanner } from '@/features/account/order-history/components/history-tab-banner';
import { getReviewPoint } from '@/features/point-balance/actions';
import { useIsPc } from '@/hooks/use-is-pc';

/**
 * ユーザープロフィールレビューを書く画面ホーム
 * @returns JSX.Element
 */
export default function Page({ searchParams }: { searchParams?: { slug?: string[] | string } }) {
  const [reviewPoint, setReviewPoint] = useState(0);
  const slugs = Array.isArray(searchParams?.slug)
    ? searchParams?.slug
    : [searchParams?.slug || ''].filter(Boolean);
  const isPc = useIsPc();

  useEffect(() => {
    const fetchReviewPoint = async () => {
      const point = await getReviewPoint();
      setReviewPoint(point);
    };
    fetchReviewPoint();
  }, []);

  return (
    <AnimatedWriteReviewContainer>
      <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
        <div className="mb-[16px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
          <BackButton />
          <Typography
            as="boldXLarge"
            element="p"
            className="text-[16px] text-black-90 md:text-[24px]"
          >
            レビューを書く
          </Typography>
          <div className="h-7 w-7" />
        </div>
        <Typography as="caption" element="div" className="mb-[24px] text-black-90">
          {isPc ? (
            'ご購入いただいた商品の使用感や感想をぜひお聞かせください！あなたのレビューが、ほかのお客様の参考になります。'
          ) : (
            <div className="flex flex-col items-center">
              <Typography as="caption" element="p" className="text-[14px] text-black-90">
                ご購入いただいた商品の使用感や感想をぜひお聞か
              </Typography>
              <Typography as="caption" element="p" className="text-[14px] text-black-90">
                せください！あなたのレビューが、ほかのお客様の
              </Typography>
              <Typography as="caption" element="p" className="text-[14px] text-black-90">
                参考になります。
              </Typography>
            </div>
          )}
        </Typography>
        <HistoryTabBanner
          title="獲得予定："
          content={`${reviewPoint}ポイント`}
          className="mb-[24px]"
        />
        <div className="flex flex-row items-center gap-1">
          <ExclamationCircleIcon className="h-5 w-5 text-black-base" />
          {isPc ? (
            <Typography as="subCaption" element="p" className="text-black-90">
              レビューの内容が不適切な場合は、運営の方で確認出来次第アカウント停止などの措置を取る場合がございます。
            </Typography>
          ) : (
            <div className="flex flex-col items-center">
              <Typography as="caption" element="p" className="text-[12px] text-black-90">
                レビューの内容が不適切な場合は、運営の方で確認出来
              </Typography>
              <Typography as="caption" element="p" className="text-[12px] text-black-90">
                次第アカウント停止などの措置を取る場合がございます。
              </Typography>
            </div>
          )}
        </div>
        <Suspense>
          <WriteReview slugs={slugs} reviewPoint={reviewPoint} />
        </Suspense>
      </div>
    </AnimatedWriteReviewContainer>
  );
}
