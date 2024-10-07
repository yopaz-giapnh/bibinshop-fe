'use client';

import { useIsPc } from '@/hooks/use-is-pc';
import { useWindowSize } from '@/hooks/use-window-size';
import { useRouter } from 'next/navigation';
import { ComponentProps, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { ProductCard } from './product-card';

type Props = {
  columns: 4 | 5;
  deleteButtonAction?: (product: Product) => Promise<void>;
} & { products: ComponentProps<typeof ProductCard>['product'][] };

export function ProductGrid({ columns, products, deleteButtonAction = undefined }: Props) {
  const router = useRouter();
  const { width } = useWindowSize();
  const imageSize = width / columns;
  const spImageSize = width / 2;
  const isPc = useIsPc();

  const deletAction = useCallback(async (product: Product) => {
    if (deleteButtonAction) {
      await deleteButtonAction(product);
      router.refresh();
    }
  }, []);

  return (
    <Wrapper columns={columns}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            imageSize={isPc ? imageSize : spImageSize}
            deleteButtonAction={deleteButtonAction ? deletAction : undefined}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = ({ columns, children }: { columns: 4 | 5; children: ReactNode }) => {
  switch (columns) {
    case 4:
      return (
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">{children}</div>
      );
    case 5:
      return (
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-5">{children}</div>
      );
  }
};
