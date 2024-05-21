'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { CartItemGroupByShop } from './cart-item-group-by-shop';

const shops = [
  {
    id: 1,
    name: 'ドクターディエット公式',
    items: [
      {
        id: 1,
        name: 'マスカラ モテマスカラ カラーマスカラ まつげケア お湯オフ 低刺激性 クリア 透明 マスカラ 塗る つけま...',
        price: 1030,
        quantity: 1
      },
      {
        id: 2,
        name: 'マスカラ モテマスカラ カラーマスカラ まつげケア お湯オフ 低刺激性 クリア 透明 マスカラ 塗る つけま...',
        price: 1030,
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    name: 'ダルバ(d’Alba)公式',
    items: [
      {
        id: 3,
        name: '【プレミアムUVケア】日焼け止め 50ml 4種 SPF50+PA++++/トーンアップ/サンクリーム/化粧下地/敏...',
        price: 3045,
        quantity: 1
      },
      {
        id: 4,
        name: 'マスカラ モテマスカラ カラーマスカラ まつげケア お湯オフ 低刺激性 クリア 透明 マスカラ 塗る つけま...',
        price: 2600,
        quantity: 1
      }
    ]
  }
];

export function CartItemList() {
  return (
    <div className="flex flex-col gap-4">
      <label
        key="all"
        className="flex cursor-pointer items-center rounded-[6px] bg-white-base px-[11px] py-[10px] shadow-base"
      >
        <div className="flex h-[46px] w-[46px] items-center justify-center">
          <Checkbox id="all" defaultChecked />
        </div>
        <Typography as="boldTitle" element="h2" className="text-text-100">
          すべての商品 (4)
        </Typography>
      </label>
      <ScrollArea>
        <div className="flex h-[calc(100vh_-_373px)] flex-col gap-4">
          {shops.map((shop) => (
            <CartItemGroupByShop
              key={shop.id}
              shop={shop}
              onCheckedChangeShop={() => {
                console.log('onCheckedChangeShop');
              }}
              onCheckedChangeItem={() => {
                console.log('onCheckedChangeItem');
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
