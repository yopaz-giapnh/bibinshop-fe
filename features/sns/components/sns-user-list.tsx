'use client';

import { getUsers } from '@/features/users/actions';
import { User } from '@/features/users/types';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SnsListSkeleton } from './skeletons/sns-list-skeleton';
import { SnsInputSortBar } from './sns-input-sort-bar';
import { SnsUserListDetailCard } from './sns-user-list-detail-card';
import SnsUserListEmptyView from './sns-user-list-empty-view';

export function SnsUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<'followers_asc' | 'followers_desc'>('followers_asc');
  const [filter, setFilter] = useState({
    withoutSelf: true,
    skinType: '',
    personalColor: '',
    skinConcern: '',
    scalpHairConcern: ''
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadUsers = useCallback(
    async (isInitial: boolean = false) => {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const fetchedUsers = (await getUsers({
          page,
          perPage: 20,
          sortBy,
          filter
        })) as User[];

        const newUsers = fetchedUsers || [];

        if (isInitial) {
          setUsers(newUsers || []);
        } else {
          setUsers((prev) => {
            const existingIds = new Set(prev.map((user) => user.id));
            const uniqueNewUsers = newUsers.filter((user) => !existingIds.has(user.id));
            return [...prev, ...uniqueNewUsers];
          });
        }

        setHasMore((newUsers?.length || 0) === 20);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [page, sortBy, filter]
  );

  useEffect(() => {
    setPage(1);
    loadUsers(true);
  }, [sortBy, filter, loadUsers]);

  useEffect(() => {
    if (page > 1) {
      loadUsers();
    }
  }, [page, loadUsers]);

  const debouncedHandleScroll = useMemo(
    () =>
      debounce(() => {
        if (loading || loadingMore || !hasMore) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.documentElement.scrollHeight - 800;

        if (scrollPosition > threshold) {
          setPage((prev) => prev + 1);
        }
      }, 150),
    [loading, loadingMore, hasMore]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      debouncedHandleScroll.cancel();
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <>
      <SnsInputSortBar onSortChange={setSortBy} onFilterChange={setFilter} />
      {loading ? (
        <SnsListSkeleton />
      ) : users.length > 0 ? (
        <div className="mt-[24px] w-full space-y-4 overflow-y-auto">
          {users.map((user: User) => (
            <SnsUserListDetailCard
              key={user.id}
              user={user}
              products={user.recommendedProducts || []}
            />
          ))}
          {loadingMore && <SnsListSkeleton />}
        </div>
      ) : (
        <SnsUserListEmptyView />
      )}
    </>
  );
}
