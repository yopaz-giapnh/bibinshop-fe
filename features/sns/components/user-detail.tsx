import { User } from '@/features/users/types';
import UserDetailProfile from './user-detail-profile';
import { UserDetailTabs } from './user-detail-tabs';

type Props = {
  userDetail: User;
  searchParams?: {
    state?: string;
    page?: string;
  };
};

export async function UserDetail({ userDetail, searchParams }: Props) {
  const tabState = searchParams?.state || 'review';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center bg-paleFrostBlue pb-[48px] pt-[73px] md:px-32 md:pt-[128px]">
      <UserDetailProfile userDetail={userDetail} />
      <UserDetailTabs tabState={tabState} currentPage={currentPage} userDetail={userDetail} />
    </div>
  );
}
