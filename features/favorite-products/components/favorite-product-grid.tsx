'use client';

import { ProductGrid } from '@/features/product/components/product-grid';
import { Product } from '@/features/product/types';
import { useState } from 'react';
import { removeFromFavorite } from '../actions';

export function FavoriteProductGrid({ products }: { products: Product[] }) {
  // FIXME: 削除中の商品を管理する。revalidateが遅いので削除中は先にお気に入りから消している
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const deleteButtonAction = async (product: Product) => {
    await removeFromFavorite(product.activeVariant?.id ?? product.defaultVariant?.id ?? product.id);
    setDeletingProduct(product);
  };

  return (
    <ProductGrid
      columns={4}
      products={products.filter((product) => product.id !== deletingProduct?.id)}
      deleteButtonAction={deleteButtonAction}
      isFavoriteList={true}
    />
  );
}
