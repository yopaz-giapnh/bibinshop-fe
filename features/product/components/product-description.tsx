import { Typography } from '@/components/ui/typography';
import { ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { SeeMoreButton } from './see-more-button';

type Props = {
  product: Product;
};

export function ProductDescription({ product }: Props) {
  return (
    <div className="flex max-w-[46vw] flex-col">
      <Typography as="boldTitle" element="h1">
        商品情報
      </Typography>

      <div className="mt-4">
        <div className="flex">
          <Typography as="body" element="h2" className="text-black-base">
            メーカー：
          </Typography>
          <Typography as="body" element="p" className="text-black-base">
            フローフシ
          </Typography>
        </div>

        <div className="flex">
          <Typography as="body" element="h2" className="text-black-base">
            商品の状態：
          </Typography>
          <Typography as="body" element="p" className="text-black-base">
            新品
          </Typography>
        </div>

        <div className="flex">
          <Typography as="body" element="h2" className="text-black-base">
            発送国:
          </Typography>
          <Typography as="body" element="p" className="text-black-base">
            国内 (日本)
          </Typography>
        </div>

        <button className="mt-2 flex items-center gap-1">
          <Typography as="linkSmall" element="p" className="text-bibinBlue-100">
            もっと見る
          </Typography>
          <ChevronDown className="h-[17px] w-4 text-bibinBlue-100" />
        </button>
      </div>

      {product.attributes.description != null && (
        <div className="mt-2">
          <div dangerouslySetInnerHTML={{ __html: product.attributes.description }} />
          <div className="flex justify-center">
            <SeeMoreButton href={'/'} arrow="bottom" />
          </div>
        </div>
      )}
    </div>
  );
}
