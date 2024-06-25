'use client';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Checkbox } from './checkbox';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger
} from './menubar';
import { Typography } from './typography';

type SliderProps = React.ComponentProps<typeof Slider>;

const priceRange = [
  {
    from: undefined,
    to: 900
  },
  {
    from: 900,
    to: 1900
  },
  {
    from: 1900,
    to: 2900
  },
  {
    from: 2900,
    to: 3900
  },
  {
    from: 3900,
    to: 4900
  },
  {
    from: 4900,
    to: undefined
  }
];

export function PriceSlider({ className, ...props }: SliderProps) {
  const [value, setValue] = useState([500, 10000]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prices = searchParams.get('prices')?.split(',') ?? [];
    if (!prices.length) setValue([500, 10000]);
    else setValue([Number.parseInt(prices[0]), Number.parseInt(prices[1])]);
  }, [searchParams]);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);
    clearTimeout(debounceTimer as ReturnType<typeof setTimeout>);
    const timer = setTimeout(() => {
      updateQueryParams(newValue);
    }, 500); // 500ms の遅延を設定
    setDebounceTimer(timer);
  };

  const updateQueryParams = (newValue: number[]) => {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    params.set('prices', `${newValue[0]},${newValue[1]}`);
    const newUrl = `${currentUrl.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="my-2 w-[216px] md:my-0 md:space-y-6">
      <div className="hidden md:block">
        <Typography as="linkSmall" element="p" className="mb-[24px] text-[16px] text-black-80">
          価格帯(JPY)
        </Typography>
        <Slider
          value={value}
          onValueChange={handleChange}
          max={20000}
          step={1}
          className={cn('w-full', className)}
          {...props}
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-600">¥{value[0]}</span>
          <span className="text-gray-600">¥{value[1]}</span>
        </div>
      </div>
      <Menubar className="h-[30px] w-full rounded-full border-2 border-bibinBlue-100 bg-white-base font-bold text-bibinBlue-100 md:hidden">
        <MenubarMenu>
          <MenubarTrigger>
            価格帯
            {searchParams.getAll('prices').length
              ? `(${searchParams.getAll('prices').length})`
              : ''}
          </MenubarTrigger>
          <MenubarPortal>
            <MenubarContent
              className="mt-2 max-h-80 w-screen overflow-y-auto overflow-x-hidden bg-white-base"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              {priceRange.map((range, index) => (
                <MenubarItem
                  key={index}
                  className="m-4 flex w-full"
                  onClick={() => {
                    handleChange([range.from ?? 0, range.to ?? 100_000]);
                  }}
                >
                  <Checkbox
                    className="rounded-full"
                    value={index}
                    checked={value[0] == (range.from ?? 0)}
                    id={`price-${index}`}
                  />
                  <Typography as="body" element="p" className="ml-2 text-[14px] text-black-80">
                    {range.from ? `${range.from}円` : ''}~{range.to ? `${range.to}円` : ''}
                  </Typography>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarPortal>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
