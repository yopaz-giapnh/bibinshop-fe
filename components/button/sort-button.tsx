'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onValueChange(value: string) {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set('sort_by', value);
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[210px] rounded-full border border-bibinBlue-100 text-bibinBlue-100 focus:outline-none focus:ring-0">
        <SelectValue placeholder="並び替え" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest-first" className=" w-[180px] text-bibinBlue-100">
            並び替え：新着
          </SelectItem>
          <SelectItem value="price-high-to-low" className="w-[180px] text-bibinBlue-100">
            並び替え：価格高い
          </SelectItem>
          <SelectItem value="price-low-to-high" className="w-[180px] text-bibinBlue-100">
            並び替え：価格安い
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
