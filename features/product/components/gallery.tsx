'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useWindowSize } from '@/hooks/use-window-size';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { ProductImage } from '../types';

type Props = {
  images: ProductImage[];
};

export function Gallery({ images }: Props) {
  const { width } = useWindowSize();
  const mainImageSize = width * 0.4;
  const subImageSize = width * 0.04;

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

  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => {
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
      <Carousel setApi={setApi} className="ml-6 w-[40vw]">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.url}
                alt={image.id}
                width={mainImageSize}
                height={mainImageSize}
                className="h-[40vw] w-[40vw] rounded-[8px] object-cover"
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
