'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useState } from 'react';

interface SnsInputSortBarProps {
  onSortChange: (sortBy: 'followers_asc' | 'followers_desc') => void;
}

export function SnsInputSortBar({ onSortChange }: SnsInputSortBarProps) {
  const [sortOption, setSortOption] = useState('フォロワー数(昇順)');

  const handleSortChange = (value: string) => {
    const newSortOption = value === '1' ? 'フォロワー数(昇順)' : 'フォロワー数(降順)';
    setSortOption(newSortOption);
    onSortChange(value === '1' ? 'followers_asc' : 'followers_desc');
  };

  return (
    <div className="mt-[24px] flex w-full flex-col items-center justify-center px-[8px] md:flex-row md:justify-between">
      <Command className="w-full bg-paleFrostBlue">
        <CommandInput
          placeholder="例：普通肌・ニキビ・毛穴"
          className="rounded-[44px] border-2 border-bibinBlue-100 bg-white-base md:w-2/3"
        />
      </Command>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="mt-[8px] h-[48px] w-[300px] rounded-full border-[1px] border-bibinBlue-100 bg-paleFrostBlue px-[24px] py-[4px] text-[14px] text-bibinBlue-100 md:mt-0">
          {`並べ替え: ${sortOption}`}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">フォロワー数(昇順)</SelectItem>
          <SelectItem value="2">フォロワー数(降順)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
