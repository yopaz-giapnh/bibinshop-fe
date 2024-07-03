'use client';

import { Typography } from '@/components/ui/typography';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRecentSearches } from './use-recent-search';

type Props = {
  text: string;
};
export function SearchResuts({ text }: Props) {
  const { search } = useRecentSearches();

  const [searchResults, setSearchResults] = useState<Array<string>>([]);
  useEffect(() => {
    //todo: fetch from server.
    const arr = new Array(5).fill(0);
    const res = arr.map((v, i) => `${text}-${i}`);
    res.push('testing');
    setSearchResults(res);
  }, [text]);

  return (
    <div className="my-2 flex w-full flex-col justify-start gap-2 px-4 pb-2">
      {searchResults.map((res, idx) => {
        let start = res.indexOf(text);
        if (start < 0) start = res.length;
        const end = start + text.length;
        return (
          <div className="boder-2 flex border-b-2 pb-2" key={idx} onClick={() => search(res)}>
            <SearchIcon size={24} className="mr-2" />
            <Typography element="p">{res.substring(0, start)}</Typography>
            <Typography element="p" as="bold">
              {res.substring(start, end)}
            </Typography>
            <Typography element="p">{res.substring(end)}</Typography>
          </div>
        );
      })}
    </div>
  );
}
