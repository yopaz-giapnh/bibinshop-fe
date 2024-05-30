import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import OrderHistoryTabContent from './order-history-tab-content';

/**
 * 注文履歴タブコンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryTabs() {
  //TODO: 注文履歴を取得するAPIを叩いてデータを取得する(すべてのステータスの注文を一括でここで取得してしまう？)

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

  const tabs = [
    { label: 'すべて', value: 'all', status: null },
    { label: '未払い', value: '未払い', status: '未払い' },
    { label: '処理中', value: '処理中', status: '処理中' },
    { label: '出荷済み', value: '出荷済み', status: '出荷済み' }
  ];

  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        注文履歴
      </Typography>
      <Tabs defaultValue="all" className="w-full justify-center">
        <TabsList className="w-full pb-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="relative top-[-2px] border-[1px]" />
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <OrderHistoryTabContent orders={orders} status={tab.status} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
