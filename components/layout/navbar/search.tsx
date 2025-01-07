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

  const handleSearch = (text: string) => {
    setSearchValue(text);
    search(text);
    setIsOpen(false);
  };

  return (
    <Command
      className={
        (isOpen
          ? `absolute left-0 top-0 z-50 h-screen w-screen pt-[15px] md:h-fit md:max-h-[300px] md:w-[462px] md:pt-[0px]`
          : `absolute ${isSignedIn ? 'top-3' : 'top-9 md:mt-[20px]'} z-50  h-[48px] w-[172px]`) +
        ` md:left-auto md:top-3 md:flex md:w-[456px] ${isSignedIn ? '' : 'md:mt-[20px]'}`
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
          value={searchValue}
          onFocus={() => setIsOpen(true)}
          onBlur={() => (isPc ? setTimeout(() => setIsOpen(false), 150) : () => {})}
          onValueChange={(v) => {
            setSearchValue(v);
          }}
          disableButton={searchValue === ''}
          onHandleClick={() => handleSearch(searchValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchValue !== '') {
              handleSearch(searchValue);
            }
          }}
        />
      </div>
      <CommandList className="mt-2 rounded-b-[4px] border-b-[2px] border-l-[2px] border-r-[2px]">
        {isOpen && (
          <>
            <div className="absolute left-0 top-8 h-[50px] w-[2px] bg-gray-200" />
            <div className="absolute right-0 top-8 h-[50px] w-[2px] bg-gray-200" />
          </>
        )}
        {searchValue ? (
          <SearchResuts text={searchValue} />
        ) : (
          <div className="px-4 pb-2">
            <RecentSearch onSearch={handleSearch} />
            <PopularSearch onSearch={handleSearch} />
          </div>
        )}
      </CommandList>
    </Command>
  );
}
