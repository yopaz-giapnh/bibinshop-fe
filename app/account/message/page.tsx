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
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        メッセージ
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <MessageList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
