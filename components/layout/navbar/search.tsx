'use client';

import { Command, CommandInput, CommandList } from '@/components/ui/command';
import { useIsPc } from '@/hooks/use-is-pc';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { PopularSearch } from './popular-search';
import { SearchResuts } from './search-results';
import { useRecentSearches } from './use-recent-search';

import dynamic from 'next/dynamic';

const RecentSearch = dynamic(() => import('./recent-search'), { ssr: false });

type Props = {
  isSignedIn: boolean;
};

export function Search({ isSignedIn }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const { search } = useRecentSearches();

  const isPc = useIsPc();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Command
      className={
        (isOpen
          ? 'absolute left-0 top-0 z-50 h-screen w-screen pt-[15px] md:h-fit md:max-h-[300px] md:w-[462px] md:pt-[0px]'
          : `absolute ${isSignedIn ? 'top-3' : 'top-9'} z-50 h-[48px] w-[172px]`) +
        ' md:left-auto md:top-3 md:flex md:w-[456px]'
      }
      value={searchValue}
    >
      <div className={`flex ${isOpen && 'px-[8px] md:px-0'}`}>
        <button
          className={(!isOpen && 'hidden') + ' md:hidden'}
          onClick={() => {
            setSearchValue('');
            setIsOpen(false);
          }}
        >
          <ChevronLeft size={32} />
        </button>
        <CommandInput
          placeholder={isPc ? 'アゼライン酸10美容液' : 'アゼライン酸'}
          className="w-full rounded-[44px] border-2 border-bibinBlue-100"
          onFocus={() => setIsOpen(true)}
          onBlur={() => (isPc ? setTimeout(() => setIsOpen(false), 150) : () => {})}
          onValueChange={(v) => {
            setSearchValue(v);
          }}
          disableButton={searchValue === ''}
          onHandleClick={() => search(searchValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchValue !== '') {
              search(searchValue);
              setIsOpen(false);
            }
          }}
        />
      </div>
      <CommandList className="mt-2 border-t-[1px]">
        {searchValue ? (
          <SearchResuts text={searchValue} />
        ) : (
          <div className="px-4 pb-2">
            <RecentSearch />
            <PopularSearch />
          </div>
        )}
      </CommandList>
    </Command>
  );
}
