import { User } from '@/features/users/types';
import UserDetailProfile from './user-detail-profile';
import { UserDetailTabs } from './user-detail-tabs';

export async function UserDetail({ userDetail }: { userDetail: User }) {
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center bg-paleFrostBlue pb-[48px] pt-[73px] md:px-32 md:pt-[128px]">
      <UserDetailProfile userDetail={userDetail} />
      <UserDetailTabs tabState="review" currentPage={1} userDetail={userDetail} />
    </div>
  );
}
