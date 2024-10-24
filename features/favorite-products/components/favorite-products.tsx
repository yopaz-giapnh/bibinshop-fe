import Pagination from '@/features/pagination/components/pagination';
import { getFavorites } from '../actions';
import { FavoriteProductGrid } from './favorite-product-grid';
import { FavoriteProductsEmptyView } from './favorite-products-empty-view';

export async function FavoriteProducts({ searchParams }: { searchParams?: { page?: string } }) {
  const { data: products, meta } = await getFavorites(
    searchParams?.page ? parseInt(searchParams.page) : undefined
  );
  const isEmpty = products.length === 0;

  return isEmpty ? (
    <FavoriteProductsEmptyView />
  ) : (
    <div className="px-[8px] md:px-0">
      <FavoriteProductGrid products={products} />
      {meta.total_pages && meta.total_pages > 1 && <Pagination totalPages={meta.total_pages} />}
    </div>
  );
}
