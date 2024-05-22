import { Typography } from '@/components/ui/typography';
import { Store } from 'lucide-react';
import Image from 'next/image';
import OrderDetailListItem from './order-detail-list-itam';
import OrderDetailSection from './order-detail-section';

type Props = {
  items: {
    imageSrc: string;
    title: string;
    color: string;
    price: string;
    store: string;
  }[];
};

/**
 * 注文内容共通コンポーネント
 * @returns JSX.Element
 */
export default function OrderDetail({ items }: Props) {
  return (
    <>
      <div className="h-screen-calc w-5/6 overflow-y-auto">
        {/*↓ TODO: ステータスが「出荷済みの場合表示させる」 */}
        <OrderDetailSection title="出荷済み">
          <Typography as="caption" element="p" className="mt-[16px] text-[16px] text-black-90">
            配送日時：2024/4/4 ~ 2024/4/10
          </Typography>
        </OrderDetailSection>
        {/* ↑TODO: */}
        <OrderDetailSection title="注文番号：#123456789101112">
          <Typography as="caption" element="p" className="mt-[16px] text-[16px] text-black-90">
            注文時間：2024/4/4
          </Typography>
        </OrderDetailSection>
        <OrderDetailSection title="注文概要">
          <div className="w-1/2">
            <div className="flex justify-between">
              <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
                商品金額(2)
              </Typography>
              <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
                7,705円
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
                送料
              </Typography>
              <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
                350円
              </Typography>
            </div>
            <div className="mt-[16px] border-t-[1px]" />
            <div className="flex items-center justify-between">
              <Typography as="caption" element="p" className="mt-[16px] text-[14px] text-black-90">
                小計
              </Typography>
              <Typography as="bold" element="p" className="mt-[16px] text-[20px] text-black-90">
                8,055円
              </Typography>
            </div>
          </div>
        </OrderDetailSection>
        <OrderDetailSection title="お支払い方法">
          <div className="mt-[16px] flex items-center">
            <Image
              className="h-[20px] w-[32px] object-cover"
              alt=""
              width={32}
              height={20}
              src={'/credit-brand-icon-demo.png'}
            />
            <Typography as="caption" element="p" className="ml-[16px] text-[14px] text-black-90">
              Master Card ....3948
            </Typography>
          </div>
        </OrderDetailSection>
        <OrderDetailSection title="お届け先住所">
          <div className="flex">
            <Typography as="boldSmall" element="p" className="mt-[16px] text-[16px] text-black-90">
              山田太郎
            </Typography>
            <Typography
              as="caption"
              element="p"
              className="ml-[16px] mt-[16px] text-[16px] text-black-90"
            >
              071-1234-5678
            </Typography>
          </div>
          <div className="mt-[16px]">
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              〒123-4567
            </Typography>
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              東京都新宿区西新宿
            </Typography>
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              1-2-3
            </Typography>
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              新宿ハイツ
            </Typography>
          </div>
        </OrderDetailSection>
        <OrderDetailSection title="注文情報">
          {items.map((item, index) => (
            <div key={index}>
              {/* TODO: データの型が決まったら簡素化する */}
              {index === 0 || items[index - 1].store !== item.store ? (
                <div className="mt-[16px]">
                  <div className="flex items-center">
                    <Store className="h-[18px] w-[18px]" />
                    <Typography
                      as="boldSmall"
                      element="p"
                      className="ml-[4px] text-[14px] text-black-90"
                    >
                      {item.store}
                    </Typography>
                  </div>
                </div>
              ) : null}
              <OrderDetailListItem
                imageSrc={item.imageSrc}
                title={item.title}
                color={item.color}
                price={item.price}
              />
              {index < items.length - 1 && items[index + 1].store === item.store ? null : (
                <div className="mt-[16px] border-[1px]" />
              )}
              {/* ↑TODO: */}
            </div>
          ))}
        </OrderDetailSection>
      </div>
    </>
  );
}
