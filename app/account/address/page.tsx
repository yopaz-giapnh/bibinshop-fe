import Address from '@/features/account/address/components/address';

/**
 * お届け先住所ホーム画面
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <Address />
    </div>
  );
}
