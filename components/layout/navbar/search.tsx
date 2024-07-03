'use client';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import { useIsPc } from '@/hooks/use-is-pc';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { PopularSearch } from './popular-search';
import { RecentSearch } from './recent-search';
import { SearchResuts } from './search-results';
import { useRecentSearches } from './use-recent-search';

export function Search() {
  const [searchValue, setSearchValue] = useState('');
  const { search } = useRecentSearches();

  const isPc = useIsPc();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Command
      className={
        (isOpen
          ? 'fixed left-0 top-0 h-screen w-screen md:h-fit md:max-h-[300px]'
          : 'absolute left-[35vw] top-3 h-[48px] w-[171px]') +
        ' md:static md:left-auto md:top-auto md:flex md:w-[456px]'
      }
      value={searchValue}
    >
      <div className="flex">
        <button
          className={(isOpen ? 'm-2' : 'hidden') + ' md:hidden'}
          onClick={() => {
            setSearchValue('');
            setIsOpen(false);
          }}
        >
          <ChevronLeft size={32} />
        </button>
        <CommandInput
          placeholder={isPc ? 'アゼライン酸10美容液' : 'アゼライン酸10...'}
          className={
            (isOpen ? 'rounded-[22px]' : 'rounded-[44px]') +
            ' w-full border-2 border-bibinBlue-100 '
          }
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
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
      <CommandList className="mt-2 border-t-2">
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
