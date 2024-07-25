import { getUsers } from '@/features/users/actions';
import { User } from '@/features/users/types';
import { notFound } from 'next/navigation';
import { SnsUserListDetailCard } from './sns-user-list-detail-card';

export async function SnsUserList() {
  const currentPage = 1;

  const users = await getUsers({
    page: currentPage,
    perPage: 25,
    sortBy: 'followers_desc',
    filter: {
      withoutSelf: false
    }
  });

  if (!users || users.length === 0) {
    return notFound();
  }

  // recommendedProductsが空でないユーザーのみをフィルタリング
  const haveRecommendedProductsUsers = users.filter(
    (user: User) => user.recommendedProducts && user.recommendedProducts.length > 0
  );

  return (
    <div className="mt-[24px] w-full space-y-4 overflow-y-auto">
      {haveRecommendedProductsUsers.map((user: User) => (
        <SnsUserListDetailCard
          key={user.id}
          user={user}
          products={user.recommendedProducts || []}
        />
      ))}
    </div>
  );
}
