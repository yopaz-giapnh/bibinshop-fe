import { Typography } from '@/components/ui/typography';
import { PRODUCT_PROPERTY_MAP } from '../constants';
import { Product } from '../types';

type Props = {
  product: Product;
};

export function ProductDescription({ product }: Props) {
  return (
    <div className="flex flex-col px-4 md:max-w-[46vw] md:px-0">
      <Typography as="boldTitle" element="h1" className="text-[20px] md:text-[24px]">
        商品情報
      </Typography>

      {Object.entries(PRODUCT_PROPERTY_MAP).map(([key, value]) => {
        const property = product.productProperties.find((pp) => pp.attributes.name === key);
        if (!property) return null;
        return (
          <div key={key} className="flex">
            <Typography as="body" element="h2" className="text-black-base">
              {value}：
            </Typography>
            <Typography as="body" element="p" className="text-black-base">
              {property.attributes.value}
            </Typography>
          </div>
        );
      })}

      {product.attributes.description != null && (
        <div className="mt-2">
          <div dangerouslySetInnerHTML={{ __html: product.attributes.description }} />
          {/* TODO: なにが表示されるか不明なので、一旦もっとみるはコメントアウト */}
          {/* <div className="flex justify-center">
            <SeeMoreButton href={'/'} arrow="bottom" />
          </div> */}
        </div>
      )}
    </div>
  );
}
