import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { AnimatedMessageContainer } from '@/features/account/message/components/animated-message-container';
import MessageList from '@/features/account/message/components/message-list';
import { MessageListSkeleton } from '@/features/account/message/components/skeletons/message-list-skeleton';
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
    <AnimatedMessageContainer>
      <div className="mx-auto mb-[200px] flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:mb-0 md:h-screen md:p-[24px]">
        <div className="flex w-full items-center justify-between pb-[24px] md:justify-center">
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
        <Suspense fallback={<MessageListSkeleton />}>
          <MessageList currentPage={currentPage} />
        </Suspense>
      </div>
    </AnimatedMessageContainer>
  );
}
