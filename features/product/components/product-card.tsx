import { Cart } from '@/components/icons/cart';
import { Star } from '@/components/icons/star';
import { Typography } from '@/components/ui/typography';
import { Product } from '@/lib/api/schema';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  product: Product & {
    imageUrl: string | undefined;
  };
  imageSize: number;
};

export function ProductCard({ product, imageSize }: Props) {
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('TODO: カートに追加しました');
  };

  return (
    <Link className="flex flex-col" href={`/products/${product.id}`} passHref>
      <Image
        src={product.imageUrl || ''}
        alt=""
        width={imageSize}
        height={imageSize}
        className="rounded-[5px]"
      />
      <Typography as="xSmall" element="p" className="mt-1">
        {product.attributes.name}
      </Typography>
      <div className="flex h-[29px] items-center gap-2">
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
            <div className="rounded-[4px] border border-lightRed px-1 py-[0.5px]">
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
        <div className="flex">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
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
