import { Typography } from '@/components/ui/typography';
import OrderDetail from '../../../order/components/order-detail';
import OrderHistoryDetailBottomButton from './order-history-detail-bottom-button';

/**
 * 注文履歴ページ注文内容コンポーネント
 * @returns JSX.Element
 */
export default function OrderHistoryDetail() {
  const items = [
    {
      imageSrc: '/item-demo.png',
      title: '「公式ショップ」アイレノールクマクリーム 3種（ナチュラルなカバー＆ケア）',
      color: 'vol. 6',
      price: '1,030',
      store: 'ドクターディエット公式'
    },
    {
      imageSrc: '/item-demo.png',
      title: 'マスカラ モテマスカラ カラーマスカラ ロングマスカラ ボリュームマスカラ',
      color: 'vol. 6',
      price: '1,030',
      store: 'ドクターディエット公式'
    },
    {
      imageSrc: '/item-demo.png',
      title:
        '【プレミアムUVケア】日焼け止め 50ml 4種 SPF50+PA++++/トーンアップ/サンクリーム/化粧下地/敏感肌/メイ...',
      color: 'vol. 6',
      price: '3,045',
      store: 'ダルバ(d’Alba)公式'
    },
    {
      imageSrc: '/item-demo.png',
      title:
        '【CICA成分含有】マイルドスキンバランシングヴィーガンクレンザー 200ml シカ/保湿/鎮静/弾力/ハリ/クレンザ...',
      color: 'vol. 6',
      price: '2,630',
      store: 'ダルバ(d’Alba)公式'
    }
  ];

  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        注文内容を表示
      </Typography>
      <OrderDetail items={items} />
      <OrderHistoryDetailBottomButton />
    </>
  );
}
