import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import OrderDetail from '@/features/order/components/order-detail';
import { redirectToTop } from '@/utils/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { COOKIES } from '../constants';

export default async function CheckoutComplete() {
  const orderNumber = cookies().get(COOKIES.checkoutCompletedOrderNumber)?.value;
  if (!orderNumber) {
    return redirectToTop();
  }

  // demo data
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
    <div className="h-full w-full bg-paleFrostBlue">
      <div className="mx-auto flex w-full flex-col items-center pt-[24px]">
        <Typography as="boldTitle" element="h2" className="text-text-80">
          ご購入ありがとうございました
        </Typography>
        <Typography as="caption" element="p" className="pb-[24px] pt-[16px] text-text-80">
          ご注文を承りました。
        </Typography>
        <OrderDetail items={items} />
        <Link href="/" passHref>
          <Button size="lg" variant="lg" className="mt-[24px] w-[392px]">
            お買い物を続ける
          </Button>
        </Link>
      </div>
    </div>
  );
}
