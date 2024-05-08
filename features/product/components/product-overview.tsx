'use client';

import { Typography } from '@/components/ui/typography';
import { useProductsListSuspense } from '@/lib/api/products/products';
import { isImageProductInclude } from '@/utils/product';
import { ComponentProps } from 'react';
import { ProductGrid } from './product-grid';
import { SeeMoreButton } from './see-more-button';

type Props = {
  title: string;
  seeMoreUrl: string;
} & Pick<ComponentProps<typeof ProductGrid>, 'columns'>;

export function ProductOverview({ title, seeMoreUrl, columns }: Props) {
  const {
    data: { data, included }
  } = useProductsListSuspense({
    include: 'images'
  });

  const imageIncluded = included?.filter(isImageProductInclude);

  // TODO: 暫定実装
  const products = data.map((product) => ({
    ...product,
    imageUrl: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${
      imageIncluded?.find((image) =>
        product.relationships.images?.data?.find((i) => i?.id === image.id)
      )?.attributes.styles?.[2].url
    }`
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <Typography as="title" element="h1" className="text-center">
        {title}
      </Typography>
      <ProductGrid products={products} columns={columns} className="grid-cols-5" />
      <SeeMoreButton href={seeMoreUrl} />
    </div>
  );
}
