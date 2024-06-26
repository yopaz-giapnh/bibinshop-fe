import { BackButton } from '@/components/button/back-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import MessageList from '@/features/account/message/components/message-list';
import { Suspense } from 'react';

/**
 * メッセージホーム画面
 * @returns JSX.Element
 */
export default function Page({
  searchParams
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
      <div className="flex w-full items-center justify-between pb-[24px] md:justify-normal">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[16px] text-black-90 md:text-[24px]"
        >
          メッセージ
        </Typography>
        <div className="h-7 w-7" />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <MessageList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
