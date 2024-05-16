import { Cart } from '@/components/icons/cart';
import { Typography } from '@/components/ui/typography';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';
import { ReviewStars } from './review-stars';

type Props = {
  product: Product;
  imageSize: number;
};

export function ProductCard({ product, imageSize }: Props) {
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('TODO: カートに追加しました');
  };

  return (
    <Link className="flex flex-col" href={`/products/${product.attributes.slug}`} passHref>
      <Image
        src={product.images[0].url || ''}
        alt={product.attributes.name || ''}
        width={imageSize}
        height={imageSize}
        className={'h-full rounded-[5px] object-cover'}
        style={{
          height: imageSize,
          width: imageSize
        }}
      />
      <Typography as="xSmall" element="p" className="mt-1">
        {product.attributes.name}
      </Typography>
      <div className="flex items-center gap-2">
        <Typography as="bold" element="p" className="text-bibinBlue-100">
          {formatedPrice(product.attributes.price)}
        </Typography>

        {isDiscounted(product.attributes.price, product.attributes.compare_at_price) && (
          <>
            <div className="relative flex items-center justify-center">
              <Typography as="small" element="p" className="text-black-20">
                {formatedPrice(product.attributes.compare_at_price)}
              </Typography>
              <div className="absolute h-[1px] w-full bg-black-20" />
            </div>
            <div className="flex items-center rounded-[4px] border border-lightRed px-1 py-[0.5px]">
              <Typography as="xSmall" element="p" className="text-lightRed">
                {`-${calculateDiscountPercentage(
                  product.attributes.price,
                  product.attributes.compare_at_price
                )}%`}
              </Typography>
            </div>
          </>
        )}

        <Typography as="xSmall" element="p" className="text-black-70">
          {/* TODO: 販売個数 */}
          2,561 個販売
        </Typography>
      </div>
      <div className="mt-[2px] flex items-center">
        {/* TODO: レビュー */}
        <ReviewStars reviewCount={5} viewSize={16} starSize={12} />

        <Typography as="xSmall" element="p" className="ml-1 text-sunburstYellow">
          (188)
        </Typography>
        <button onClick={addToCart} type="button">
          <Cart className="ml-2" />
        </button>
      </div>
    </Link>
  );
}
