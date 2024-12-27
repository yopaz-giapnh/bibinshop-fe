import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import Rating from '@/features/review/components/rating';
import { getVendor } from '@/features/vendor/actions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  vendorId: string;
};

export async function ShopCard({ vendorId }: Props) {
  const vendor = await getVendor(vendorId);
  const isSagawaShipping = vendor?.attributes.shipping_method_type === 'sagawa_system';

  return vendor ? (
    <div className="mt-[8px] flex w-full flex-col gap-[10px] rounded-[6px] border border-black-10 bg-white-base p-4 md:mt-0 md:w-fit">
      <div className="inline-flex w-full gap-[16px]">
        <Image
          className="h-[96px] w-[96px] object-cover"
          alt={vendor.attributes.name || ''}
          width={82}
          height={82}
          src={vendor.vendorImage?.url || '/placeholder-product-image.png'}
        />
        <div className="flex flex-col gap-[8px]">
          <div className="items-center justify-center gap-[8px] pr-7 md:inline-flex">
            <Typography as="bold" element="p" className="text-text-100">
              {vendor?.attributes.name}
            </Typography>
            {isSagawaShipping && (
              <div className="flex items-center">
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
                  送料無料対象
                </Typography>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {vendor.attributes.stars != null && (
              <Rating star={vendor.attributes.stars} size={12} readOnly />
            )}
            <Typography as="xSmall" element="p" className="text-text-80">
              {`${vendor.attributes.stars} (${vendor.attributes.reviews_count})`}
            </Typography>
          </div>
          <Link href={`/vendors/${vendor.id}`}>
            <Button className="hidden h-[40px] w-[211px] items-center border border-bibinBlue-100 bg-white-base p-[8px] md:block">
              <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
                全ての商品を見る({vendor.attributes.available_products_count || 0})
              </Typography>
            </Button>
          </Link>
        </div>
      </div>
      <Link href={`/vendors/${vendor.id}`}>
        <Button className="flex h-[40px] w-full items-center border border-bibinBlue-100 bg-white-base p-[8px] md:hidden">
          <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
            全ての商品を見る({vendor.attributes.available_products_count || 0})
          </Typography>
        </Button>
      </Link>
    </div>
  ) : null;
}
