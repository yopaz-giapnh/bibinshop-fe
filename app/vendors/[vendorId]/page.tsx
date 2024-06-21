import { getVendor } from '@/features/vendor/actions';
import { VendorHeader } from '@/features/vendor/components/vendor-header';
import VendorTabs from '@/features/vendor/components/vendor-tabs';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
  searchParams
}: {
  params: { vendorId: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const vendor = await getVendor(params.vendorId);

  if (!vendor) return notFound();

  return (
    <div className="h-full w-full bg-white-base px-16 pb-6">
      <div className="pt-[128px]">
        <VendorHeader vendor={vendor} />
        <VendorTabs vendor={vendor} searchParams={searchParams} />
      </div>
    </div>
  );
}
