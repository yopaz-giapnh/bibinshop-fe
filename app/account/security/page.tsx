import SecurityDetail from '@/features/account/security/components/security-detail';

/**
 * アカウントセキュリティホーム画面
 * @returns JSX.Element
 */
export default async function Page() {
  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <SecurityDetail />
    </div>
  );
}
