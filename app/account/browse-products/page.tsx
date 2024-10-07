import { BrowseProducts } from '@/features/browse-products/components/browse-products';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  return <BrowseProducts searchParams={searchParams} />;
}
