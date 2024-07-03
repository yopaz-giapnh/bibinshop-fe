'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useRecentSearches = () => {
  // should add user name as prefix?
  // should delete on logout?
  const key = 'bibin-search-history';

  const route = useRouter();
  const searchParams = useSearchParams();
  const [history, setHistory, removeHistory] = useLocalStorage<Array<string>>(key, []);

  const append = useCallback(
    (text: string) => {
      setHistory((prev) => {
        if (prev) return [text, ...prev.filter((t) => t != text)];
        else return [text];
      });
    },
    [setHistory]
  );
  const remove = useCallback(
    (text: string) => {
      setHistory((prev) => {
        return prev?.filter((t) => t != text);
      });
    },
    [setHistory]
  );

  const search = useCallback(
    (text: string) => {
      append(text);
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.set('key', text);
      route.push(`/search?${currentQuery.toString()}`);
    },
    [append, route, searchParams]
  );

  return {
    entries: history,
    clear: removeHistory,
    append,
    remove,
    search
  };
};
