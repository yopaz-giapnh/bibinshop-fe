'use client';

import { Typography } from '@/components/ui/typography';
import { getPopularSearches } from '@/features/search/actions';
import { useEffect, useState } from 'react';
import { useRecentSearches } from './use-recent-search';

type Props = {
  onSearch?: (text: string) => void;
};

export function PopularSearch({ onSearch }: Props) {
  const { search } = useRecentSearches();

  const handleSearch = (text: string) => {
    if (onSearch) {
      onSearch(text);
    }
    search(text);
  };

  const [popularSearches, setPopularSearches] = useState<
    Awaited<ReturnType<typeof getPopularSearches>>
  >([]);

  useEffect(() => {
    const fn = async () => {
      const res = await getPopularSearches();
      setPopularSearches(res);
    };
    fn();
  }, []);

  return (
    <>
      <Typography element="p" as="bold" className="m-2">
        人気ワード
      </Typography>
      <div className="flex flex-wrap text-xs">
        {popularSearches.map((item, idx) => (
          <div
            key={idx}
            className="text-black/50 mx-1 my-1 flex w-fit min-w-fit flex-row items-center rounded-full bg-[#000000]/[0.08] p-1"
            onClick={() => handleSearch(item.term)}
            style={{ cursor: 'pointer' }}
          >
            <Typography element="p" className="mx-1">
              {item.isHot && '🔥'}
              {item.term}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
}
