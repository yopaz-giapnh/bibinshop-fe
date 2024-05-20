import OrderHistoryTabs from '@/features/account/order-history/components/order-history-tabs';

/**
 * 注文履歴ホーム画面
 * @returns JSX.Element
 */
export default function Page() {
  // demo data
  const orders = [
    {
      status: '出荷済み',
      date: '2024/4/4',
      amount: '8,055円',
      number: '012345678901112',
      items: [
        {
          image: '/item-demo.png',
          alt: '',
          name: '『公式ショップ』 アイレノールクマクリーム 3種（ナチュラルなカバー＆ケア）',
          details: '色：vol. 6'
        },
        {
          image: '/item-demo.png',
          alt: '',
          name: '『公式ショップ』 アイレノールクマクリーム 3種（ナチュラルなカバー＆ケア）',
          details: '色：vol. 6'
        }
      ]
    },
    {
      status: '未払い',
      date: '2024/4/5',
      amount: '4,025円',
      number: '012345678901113',
      items: [
        {
          image: '/item-demo.png',
          alt: '',
          name: '『公式ショップ』 アイレノールクマクリーム 3種（ナチュラルなカバー＆ケア）',
          details: '色：vol. 5'
        }
      ]
    },
    {
      status: '処理中',
      date: '2024/4/5',
      amount: '4,025円',
      number: '012345678901113',
      items: [
        {
          image: '/item-demo.png',
          alt: '',
          name: '『公式ショップ』 アイレノールクマクリーム 3種（ナチュラルなカバー＆ケア）',
          details: '色：vol. 5'
        }
      ]
    }
  ];

  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col items-center bg-paleFrostBlue p-[24px]">
      <OrderHistoryTabs orders={orders} />
    </div>
  );
}
