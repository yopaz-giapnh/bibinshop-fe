'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useIsPc } from '@/hooks/use-is-pc';
import { useWindowSize } from '@/hooks/use-window-size';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { ProductImage } from '../types';

type Props = {
  images: ProductImage[];
};

export function Gallery({ images }: Props) {
  const isPc = useIsPc();
  const { width } = useWindowSize();
  const mainImageSize = isPc ? width * 0.4 : width;
  const subImageSize = width * 0.4;

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const srollTo = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const enhancedImages = images.length
    ? images
    : [{ id: 'placeholder', url: '/placeholder-product-image.png' }];

  return (
    <div className="flex">
      <div className="hidden flex-col gap-2 md:flex">
        {enhancedImages.map((image, index) => {
          const isCurrent = index === current - 1;

          return (
            <button
              key={image.id}
              onClick={() => {
                srollTo(index);
              }}
              className={clsx('rounded-sm', isCurrent && 'border border-bibinBlue-100')}
            >
              <Image
                src={image.url}
                alt={image.id}
                className="h-[4vw] w-[4vw] object-cover"
                width={subImageSize}
                height={subImageSize}
              />
            </button>
          );
        })}
      </div>
      <Carousel setApi={setApi} className="md:ml-6 md:w-[40vw]">
        <CarouselContent>
          {enhancedImages.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.url}
                alt={image.id}
                width={mainImageSize}
                height={mainImageSize}
                className="md:h-[40vw] md:w-[40vw] md:rounded-[8px] md:object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
