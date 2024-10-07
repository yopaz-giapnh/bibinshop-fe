import { FavoriteProducts } from '@/features/favorite-products/components/favorite-products';

export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  return <FavoriteProducts searchParams={searchParams} />;
}
