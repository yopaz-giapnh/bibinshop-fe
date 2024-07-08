'use client';

import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { useIsPc } from '@/hooks/use-is-pc';
import Image from 'next/image';
import Link from 'next/link';
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
  const isPc = useIsPc();

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
        {banners.map((banner) => (
          // NOTE: "pl-[426px]は、カテゴリーメニューと同じ位置に設定"
          <CarouselItem
            key={banner.id}
            className="md:pl-[426px]"
            style={{
              backgroundColor: banner.backgroundColor
            }}
          >
            <Link key={banner.id} href={banner.linkUrl} passHref>
              <Image
                src={isPc ? banner.imageUrl : banner.mobileImageUrl}
                alt={banner.title}
                width={790}
                height={370}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots current={current} count={count} />
    </Carousel>
  );
}
