'use client';

import TrashIcon from '@/assets/trash-mobile-gray.svg';
import { Typography } from '@/components/ui/typography';
import { useRecentSearches } from './use-recent-search';

export function RecentSearch() {
  const { entries, search, clear } = useRecentSearches();

  return (
    <>
      {entries.length ? (
        <>
          <div className="flex w-full flex-row">
            <Typography element="p" as="bold" className="m-2">
              検索履歴
            </Typography>
            <Typography
              element="p"
              as="bold"
              className="text-black/50 align-center m-2 ml-auto flex justify-center "
              style={{ cursor: 'pointer' }}
              onClick={() => clear()}
            >
              <TrashIcon />
              削除
            </Typography>
          </div>
          <div className="flex flex-row text-xs">
            {entries.map((t, idx) => (
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
      ) : null}
    </>
  );
}
