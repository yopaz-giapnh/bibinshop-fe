import { CommercialTransactions } from '@/features/commercial-transactions.tsx/componentns/commercial-transactions';

/**
 * 特定商取引法に基づく表記ページ
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] pb-[64px] pt-[100px] md:p-[24px] md:pt-[180px]">
      <CommercialTransactions />
    </div>
  );
}
