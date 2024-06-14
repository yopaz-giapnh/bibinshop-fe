import MessageList from '@/features/account/message/components/message-list';

/**
 * メッセージホーム画面
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <MessageList />
    </div>
  );
}
