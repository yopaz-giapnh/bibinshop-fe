import WriteReview from '@/features/account/order-history/components/write-review';

/**
 * ユーザープロフィールレビューを書く画面ホーム
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <WriteReview />
    </div>
  );
}
