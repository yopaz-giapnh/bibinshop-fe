'use client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command';
import { useIsPc } from '@/hooks/use-is-pc';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function Search() {
  const [searchValue, setSearchValue] = useState('');
  const route = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const currentQuery = new URLSearchParams(searchParams.toString());
    currentQuery.set('key', searchValue);
    const newQueryString = `?${currentQuery.toString()}`;
    route.push(`/search${newQueryString}`);
  };
  const isPc = useIsPc();

  return (
    <Command
      className="h-[48px] w-[171px] rounded-[44px] border-2 border-bibinBlue-100 md:w-[456px]"
      value={searchValue}
    >
      <CommandInput
        placeholder={isPc ? 'アゼライン酸10美容液' : 'アゼライン酸10...'}
        onValueChange={(v) => {
          setSearchValue(v);
        }}
        disableButton={searchValue === ''}
        onHandleClick={handleSearch}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && searchValue !== '') {
            handleSearch();
          }
        }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {/* TODO: API ができたら繋ぎこむ */}
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
