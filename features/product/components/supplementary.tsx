import { FastShipping } from '@/components/icons/fast-shipping';
import { Typography } from '@/components/ui/typography';
import { getShippingMethods } from '../actions';
import { Product } from '../types';
import { getDisplayShippingCost } from '../utils';

type Props = {
  product: Product;
};

export async function Supplementary({ product }: Props) {
  const { vendor } = product;
  const shippingMethods = await getShippingMethods();

  return (
    <div className="rounded-[6px] bg-powderBlue px-6 py-4">
      <div className="flex flex-col">
        <div>
          <div className="flex items-center">
            <FastShipping />
            <Typography as="boldSmall" element="p" className="ml-1 text-bibinBlue-100">
              送料
            </Typography>
          </div>
          {vendor && (
            <div className="mt-1">
              <Typography as="xSmall" element="p" className="text-black-50">
                {getDisplayShippingCost({
                  shippingMethods,
                  vendor
                })}
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* TODO:キャンセル/返品に関する仕様決まり次第コメントイン */}
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
