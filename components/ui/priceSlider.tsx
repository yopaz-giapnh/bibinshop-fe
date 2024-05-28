'use client';

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Typography } from './typography';

type SliderProps = React.ComponentProps<typeof Slider>;

export function PriceSlider({ className, ...props }: SliderProps) {
  // TODO: 初期値をどうするか
  const [value, setValue] = useState([103, 5000]);

  const handleChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <div className="w-[216px] py-6">
      <Typography as="linkSmall" element="p" className="mb-[24px] text-[16px] text-black-80">
        価格帯(JPY)
      </Typography>
      <Slider
        value={value}
        onValueChange={handleChange}
        max={5000}
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
