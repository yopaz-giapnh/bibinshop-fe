import { BackButton } from '@/components/button/back-button';
import { Typography } from '@/components/ui/typography';
import { deleteHistoryEntry, getBrowseHistory } from '@/features/product/actions';
import { ProductGrid } from '@/features/product/components/product-grid';
import { BrowseProductsEmptyView } from './browse-products-empty-view';

export async function BrowseProducts() {
  const products = await getBrowseHistory();

  return (
    <div className="mx-auto flex w-full flex-col items-center bg-paleFrostBlue p-[16px] md:p-[24px]">
      <div className="mb-[14px] flex w-full items-center justify-between md:mb-[24px] md:justify-center">
        <BackButton />
        <Typography
          as="boldXLarge"
          element="p"
          className="text-[18px] text-black-90 md:text-[24px]"
        >
          閲覧履歴
        </Typography>
        <div className="h-7 w-7" />
      </div>
      {products.data.length === 0 ? (
        <BrowseProductsEmptyView />
      ) : (
        <div className="px-[8px] md:px-0">
          <ProductGrid
            columns={4}
            products={products.data}
            deleteButtonAction={deleteHistoryEntry}
          />
        </div>
      )}
    </div>
  );
}
