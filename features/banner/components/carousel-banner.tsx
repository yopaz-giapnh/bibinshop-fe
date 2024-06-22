'use client';

import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselDots } from './carousel-dots';

// TODO: OpenAPIから取得するようにする
type Banner = {
  id: string;
  imageUrl: string;
  linkUrl: string;
  backgroundColor: string;
};

const slideInterval = 5000 as const;

export function CarouselBanner() {
  // TODO: ダミーデータ差し替える
  const banners: Banner[] = [
    {
      id: '1',
      imageUrl: '/banner.png',
      linkUrl: '/products/1',
      backgroundColor: '#EEEAD7'
    },
    {
      id: '2',
      imageUrl: '/banner.png',
      linkUrl: '/products/2',
      backgroundColor: '#51B7FF'
    },
    {
      id: '3',
      imageUrl: '/banner.png',
      linkUrl: '/products/3',
      backgroundColor: '#EEEAD7'
    },
    {
      id: '4',
      imageUrl: '/banner.png',
      linkUrl: '/products/4',
      backgroundColor: '#51B7FF'
    },
    {
      id: '5',
      imageUrl: '/banner.png',
      linkUrl: '/products/5',
      backgroundColor: '#EEEAD7'
    }
  ];

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
              <Image src={banner.imageUrl} alt="banner" width={790} height={370} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots current={current} count={count} />
    </Carousel>
  );
}
