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
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Search() {
  const [searchValue, setSearchValue] = useState('');
  const route = useRouter();
  return (
    <Command
      className="h-[48px] w-[456px] rounded-[44px] border-2 border-bibinBlue-100"
      value={searchValue}
    >
      <CommandInput
        placeholder="アゼライン酸10美容液"
        onValueChange={(v) => {
          setSearchValue(v);
        }}
        disableButton={searchValue === ''}
        onHandleClick={() => {
          route.push(`/search?key=${searchValue}`);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && searchValue !== '') {
            route.push(`/search?key=${searchValue}`);
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
