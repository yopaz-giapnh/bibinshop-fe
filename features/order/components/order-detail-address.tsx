import { Typography } from '@/components/ui/typography';
import { Address } from '@/features/address/types';
import OrderDetailSection from './order-detail-section';

type Props = {
  address: Address;
};

export function OrderDetailAddress({ address }: Props) {
  return (
    <OrderDetailSection title="お届け先住所">
      <div className="flex">
        <Typography
          as="boldSmall"
          element="p"
          className="mt-[8px] text-[14px] text-black-90 md:mt-[16px] md:text-[16px]"
        >
          {address.attributes.lastname}
          {address.attributes.firstname}
        </Typography>
        <Typography
          as="caption"
          element="p"
          className="ml-[16px] mt-[8px] text-[14px] text-black-90 md:mt-[16px] md:text-[16px]"
        >
          {address.attributes.phone}
        </Typography>
      </div>
      <div className="mt-[8px] md:mt-[16px]">
        <Typography as="caption" element="p" className="text-[14px] text-black-90">
          〒{address.attributes.zipcode}
        </Typography>
        <Typography as="caption" element="p" className="text-[14px] text-black-90">
          {address.attributes.state_name}
          {address.attributes.city}
        </Typography>
        <Typography as="caption" element="p" className="text-[14px] text-black-90">
          {address.attributes.address1}
        </Typography>
        <Typography as="caption" element="p" className="text-[14px] text-black-90">
          {address.attributes.address2}
        </Typography>
      </div>
    </OrderDetailSection>
  );
}
