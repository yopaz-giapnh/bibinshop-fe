'use client';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Typography } from './typography';

type SliderProps = React.ComponentProps<typeof Slider>;

export function PriceSlider({ className, ...props }: SliderProps) {
  const [value, setValue] = useState([500, 10000]);
  const router = useRouter();
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

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
    <div className="w-[216px] py-6">
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
  );
}
