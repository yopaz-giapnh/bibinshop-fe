import { Card } from '@/components/ui/card';
import { Vendor } from '../types';
import { VendorInfoItem } from './vendor-info-item';
import VendorInfoEmptyView from './vendorInfo-empty-view';

type Props = {
  vendor: Vendor;
};

const VendorInfo = ({ vendor }: Props) => {
  const infoItems = [
    { label: 'ショップ、ブランド名', value: vendor.attributes.name },
    { label: 'ショップ、ブランド概要', value: vendor.attributes.about_us },
    { label: '住所', value: vendor.attributes.address },
    { label: 'メール', value: vendor.attributes.notification_email },
    { label: '連絡先', value: vendor.attributes.phone }
  ];

  const hasAnyValue = infoItems.some((item) => item.value);

  if (!hasAnyValue) {
    return <VendorInfoEmptyView />;
  }

  return (
    <Card className="flex w-11/12 flex-col gap-5 rounded-md bg-[#EEF8FF] p-4 md:w-[580px] md:items-center md:justify-center">
      {infoItems.map((item) => (
        <VendorInfoItem key={item.label} {...item} />
      ))}
    </Card>
  );
};

export default VendorInfo;
