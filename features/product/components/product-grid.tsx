'use client';

import { useIsPc } from '@/hooks/use-is-pc';
import { useWindowSize } from '@/hooks/use-window-size';
import clsx from 'clsx';
import { ComponentProps } from 'react';
import { ProductCard } from './product-card';

type Props = {
  columns: number;
} & { products: ComponentProps<typeof ProductCard>['product'][] } & Pick<
    ComponentProps<'div'>,
    'className'
  >;

export function ProductGrid({ columns, products, className }: Props) {
  const { width } = useWindowSize();
  const imageSize = width / columns;
  const spImageSize = width / 2;
  const isPc = useIsPc();

  return (
    <div className={clsx('grid w-full gap-x-4 gap-y-6', className)}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            imageSize={isPc ? imageSize : spImageSize}
          />
        );
      })}
    </div>
  );
}
