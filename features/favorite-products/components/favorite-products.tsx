'use server';
import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { ProductGrid } from '@/features/product/components/product-grid';
import { deleteFavorite, getFavorites } from '../actions';
import { FavoriteProductsEmptyView } from './favorite-products-empty-view';

export async function FavoriteProducts() {
  const products = await getFavorites();

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] pt-[80px] md:p-[24px] md:pt-[150px]">
      <div className="mb-[14px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          お気に入り
        </Typography>
        <div className="h-7 w-7" />
      </div>
      {products.length === 0 ? (
        <FavoriteProductsEmptyView />
      ) : (
        <div className="px-[8px] md:px-0">
          <ProductGrid columns={5} products={products} deleteButtonAction={deleteFavorite} />
        </div>
      )}
    </div>
  );
}
