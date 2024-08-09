'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getUsers } from '@/features/users/actions';
import { User } from '@/features/users/types';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers({
          page: 1,
          perPage: 50,
          sortBy,
          filter
        });
        setUsers((fetchedUsers as User[]) || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers().then(() => setLoading(false));
  }, [sortBy, filter]);

  const haveRecommendedProductsUsers = users.filter(
    (user: User) => user.recommendedProducts && user.recommendedProducts.length > 0
  );

  return (
    <>
      <SnsInputSortBar onSortChange={setSortBy} onFilterChange={setFilter} />
      {loading ? (
        <LoadingSpinner size={24} className="mx-auto mt-8" />
      ) : haveRecommendedProductsUsers.length > 0 ? (
        <div className="mt-[24px] w-full space-y-4 overflow-y-auto">
          {haveRecommendedProductsUsers.map((user: User) => (
            <SnsUserListDetailCard
              key={user.id}
              user={user}
              products={user.recommendedProducts || []}
            />
          ))}
        </div>
      ) : (
        <SnsUserListEmptyView />
      )}
    </>
  );
}
