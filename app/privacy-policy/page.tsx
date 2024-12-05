import { PrivacyPolicy } from '@/features/privacy-policy/components/privacy-policy';

/**
 * プライバシーポリシーページ
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] pb-[64px] pt-[100px] md:p-[24px] md:pt-[180px]">
      <PrivacyPolicy />
    </div>
  );
}
