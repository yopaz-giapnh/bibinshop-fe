import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import { getShippingMethods } from '../actions';
import { Product } from '../types';
import { getDisplayShippingCost } from '../utils';

type Props = {
  product: Product;
};

export async function Supplementary({ product }: Props) {
  const { vendor } = product;
  const shippingMethods = await getShippingMethods();

  const isSagawaShipping = vendor?.attributes.shipping_method_type === 'sagawa_system';

  return (
    <div className="rounded-[6px] bg-powderBlue px-6 py-4">
      <div className="flex flex-col">
        {isSagawaShipping && (
          <div className="mt-2 flex items-center">
            <Image
              src={'/bibin-official-badge.png'}
              alt={'bibin official badge'}
              width={24}
              height={24}
            />
            <Typography
              as="boldSmall"
              element="p"
              className="ml-1 bg-gradient-to-r from-[#00C2FF] to-[#00CC66] bg-clip-text text-transparent"
            >
              バッジ付きブランド２つで送料無料対象
            </Typography>
          </div>
        )}
        <div className="mt-2 flex items-center">
          <Typography as="boldSmall" element="p" className="text-gray-500">
            配送料：
          </Typography>
          {vendor && (
            <Typography as="boldSmall" element="p" className="text-black-200">
              {getDisplayShippingCost({
                shippingMethods,
                vendor
              })}
            </Typography>
          )}
        </div>
        {isSagawaShipping && (
          <div className="mt-2">
            <Typography as="boldSmall" element="p" className="text-gray-500">
              送料無料対象：
            </Typography>
            <div className="mt-1 flex items-start">
              <Image
                src={'/bibin-official-badge.png'}
                alt={'bibin official badge'}
                width={24}
                height={24}
              />
              <Typography as="boldSmall" element="p" className="text-black-200 ml-1">
                バッジブランドをもう１つ追加すると、バッジのブランドは送料無料になります
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* TODO:キャンセル/返品に関する仕様決まり次第コメントイン -> Nativeにも実装 (工藤) */}
      {/* <div className="mt-5 flex flex-col">
        <div className="flex items-center">
          <ArrowBack />
          <Typography as="boldSmall" element="p" className="ml-1 text-bibinBlue-100">
            返品
          </Typography>
        </div>

        <div className="mt-1 flex items-center">
          <Typography as="xSmall" element="p" className="text-black-50">
            キャンセル/返品/払い戻しに関する事項
          </Typography>
          <Link href="/return-policy" passHref>
            <Typography as="linkSmall" element="p" className="ml-1 text-bibinBlue-100 underline">
              詳細
            </Typography>
          </Link>
        </div>
      </div> */}
    </div>
  );
}
