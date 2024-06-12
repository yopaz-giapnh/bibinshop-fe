import { Cart } from '@/components/icons/cart';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';

type Props = {
  product: Product;
  imageSize: number;
};

export function ProductCard({ product, imageSize }: Props) {
  const { toast } = useToast();

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await addItem(null, { productId: product.id, quantity: 1 });
    if (result.success) {
      toast({
        title: 'カートに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: 'カートに追加できませんでした',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  return (
    <Link className="flex flex-col" href={`/products/${product.attributes.slug}`} passHref>
      <Image
        src={product.images[0]?.url || require('/public/placeholder-product-image.png')}
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
        {product.attributes.stars != null && (
          <Rating star={product.attributes.stars} size={16} readOnly />
        )}

        <Typography as="xSmall" element="p" className="ml-1 text-sunburstYellow">
          {`(${product.attributes.reviews_count})`}
        </Typography>
        <button onClick={addToCart} type="button">
          <Cart className="ml-2" />
        </button>
      </div>
    </Link>
  );
}
