import Pagination from '@/features/pagination/components/pagination';
import { getProducts } from '@/features/product/actions';
import { ProductGrid } from '@/features/product/components/product-grid';

type Props = {
  vendorId: string;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export async function ProductsList({ vendorId, searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const taxons = Array.isArray(searchParams?.taxons)
    ? searchParams?.taxons.join(',')
    : searchParams?.taxons;
  const prices = Array.isArray(searchParams?.prices)
    ? searchParams?.prices.join(',')
    : searchParams?.prices;

  const products = await getProducts({
    query: {
      'filter[vendor_ids]': vendorId,
      'filter[taxons]': taxons,
      'filter[price]': prices,
      page: currentPage
    }
  });
  const totalPages = products.meta.total_pages;

  return (
    <>
      <ProductGrid products={products.data} columns={4} />
      {!!totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
}
