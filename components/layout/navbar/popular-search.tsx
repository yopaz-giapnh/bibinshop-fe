'use client';

import { Typography } from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { useRecentSearches } from './use-recent-search';

export function PopularSearch() {
  const [tags, setTags] = useState<Array<string>>([]);
  const { search } = useRecentSearches();

  useEffect(() => {
    //load popular keywords here.
    setTags(['word1', 'word2', 'word3']);
  }, []);

  return (
    <>
      <Typography element="p" as="bold" className="m-2">
        人気ワード
      </Typography>
      <div className="flex flex-row text-xs">
        {tags.map((t, idx) => (
          <div
            key={idx}
            className="text-black/50 mx-1 my-1 flex w-fit min-w-fit flex-row items-center rounded-full bg-[#000000]/[0.08] p-1"
            onClick={() => search(t)}
            style={{ cursor: 'pointer' }}
          >
            <Typography element="p" className="mx-1">
              {t}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
}
