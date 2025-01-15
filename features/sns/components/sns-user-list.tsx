'use client';

import { getUsers } from '@/features/users/actions';
import { User } from '@/features/users/types';
import { useEffect, useState } from 'react';
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

  const loadUsers = async (isInitial: boolean = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const fetchedUsers = (await getUsers({
        page,
        perPage: 10,
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

      // If we got less users than requested, there are no more pages
      setHasMore((newUsers?.length || 0) === 10);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadUsers(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, filter]);

  useEffect(() => {
    if (page > 1) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loading || loadingMore || !hasMore) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800; // Load more when 800px from bottom

      if (scrollPosition > threshold) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, hasMore]);

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
