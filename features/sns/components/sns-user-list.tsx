'use client';

import { getUsers } from '@/features/users/actions';
import { User } from '@/features/users/types';
import { useEffect, useState } from 'react';
import { SnsInputSortBar } from './sns-input-sort-bar';
import { SnsUserListDetailCard } from './sns-user-list-detail-card';

export function SnsUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<'followers_asc' | 'followers_desc'>('followers_asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers({
          page: 1,
          perPage: 25,
          sortBy: sortBy,
          filter: {
            withoutSelf: false
          }
        });
        setUsers(fetchedUsers || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [sortBy]);

  // recommendedProductsが空でないユーザーのみをフィルタリング
  const haveRecommendedProductsUsers = users.filter(
    (user: User) => user.recommendedProducts && user.recommendedProducts.length > 0
  );

  return (
    <>
      <SnsInputSortBar onSortChange={setSortBy} />
      <div className="mt-[24px] w-full space-y-4 overflow-y-auto">
        {haveRecommendedProductsUsers.map((user: User) => (
          <SnsUserListDetailCard
            key={user.id}
            user={user}
            products={user.recommendedProducts || []}
          />
        ))}
      </div>
    </>
  );
}
