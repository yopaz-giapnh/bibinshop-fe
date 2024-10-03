import { Cart } from '@/components/icons/cart';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { addItem } from '@/features/cart/actions';
import Rating from '@/features/review/components/rating';
import { calculateDiscountPercentage, formatedPrice, isDiscounted } from '@/utils/price';
import { BadgeAlert, Check, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';

type Props = {
  product: Product;
  imageSize: number;
  deleteButtonAction?: (product: Product) => Promise<void>;
};

export function ProductCard({ product, imageSize, deleteButtonAction = undefined }: Props) {
  const { toast } = useToast();

  const defaultVariant = product.relationships.default_variant?.data;

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await addItem(null, { variantId: defaultVariant?.id || '', quantity: 1 });
    if (result.success) {
      toast({
        title: 'カートに追加しました',
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: result.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  return (
    <Link className="flex flex-col" href={`/products/${product.attributes.slug}`} passHref>
      <div className="relative">
        {/* TODO: 閲覧履歴を削除するAPIを作成する */}
        {deleteButtonAction && (
          <button
            className="absolute right-2 top-2 z-10 rounded-full text-gray-100 shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteButtonAction(product);
            }}
          >
            <X className="h-[32px] w-[32px] rounded-full shadow-xl md:h-[56px] md:w-[56px]" />
          </button>
        )}
        <Image
          src={product.images[0]?.url || '/placeholder-product-image.png'}
          alt={product.attributes.name || ''}
          width={imageSize}
          height={imageSize}
          className={'h-full rounded-[5px] object-cover'}
          style={{
            height: imageSize,
            width: imageSize
          }}
        />
      </div>
      <Typography
        as="xSmall"
        element="p"
        className="mt-1 overflow-hidden whitespace-normal break-words"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1
        }}
      >
        {product.attributes.name}
      </Typography>
      <div className="items-center gap-2 md:flex">
        <Typography as="xSmall" element="p" className="text-black-70 md:hidden">
          {`${product.attributes.order_count} 個販売`}
        </Typography>

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

        <Typography as="xSmall" element="p" className="hidden text-black-70 md:flex">
          {`${product.attributes.order_count} 個販売`}
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
