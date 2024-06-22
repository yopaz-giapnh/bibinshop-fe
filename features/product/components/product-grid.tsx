'use client';

import { useIsPc } from '@/hooks/use-is-pc';
import { useWindowSize } from '@/hooks/use-window-size';
import { ComponentProps, ReactNode } from 'react';
import { ProductCard } from './product-card';

type Props = {
  columns: 4 | 5;
} & { products: ComponentProps<typeof ProductCard>['product'][] };

export function ProductGrid({ columns, products }: Props) {
  const { width } = useWindowSize();
  const imageSize = width / columns;
  const spImageSize = width / 2;
  const isPc = useIsPc();

  return (
    <Wrapper columns={columns}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            imageSize={isPc ? imageSize : spImageSize}
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
