'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getBanners } from '../actions';
import { CarouselDots } from './carousel-dots';

const slideInterval = 5000 as const;

type Props = {
  getBanners: ReturnType<typeof getBanners>;
};

export function CarouselBanner({ getBanners }: Props) {
  const banners = React.use(getBanners);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const intervalId = setInterval(() => {
      if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, slideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {banners.map(
          (banner) =>
            banner.linkUrl &&
            banner.imageUrl && (
              <CarouselItem
                key={banner.id}
                style={{
                  backgroundColor: banner.backgroundColor
                }}
              >
                <Link key={banner.id} href={banner.linkUrl} passHref>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title ?? 'banner'}
                    width={790}
                    height={370}
                    className="hidden w-full object-cover md:block"
                  />
                  <Image
                    src={banner.mobileImageUrl || banner.imageUrl}
                    alt={banner.title ?? 'banner'}
                    width={790}
                    height={370}
                    className="block md:hidden"
                  />
                </Link>
              </CarouselItem>
            )
        )}
      </CarouselContent>
      <CarouselDots current={current} count={count} />
    </Carousel>
  );
}
