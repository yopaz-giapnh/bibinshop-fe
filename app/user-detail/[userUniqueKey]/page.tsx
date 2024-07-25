import { UserDetail } from '@/features/sns/components/user-detail';
import { getUserDetails } from '@/features/users/actions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { userUniqueKey: string } }) {
  const userDetail = await getUserDetails(params.userUniqueKey);

  if (!userDetail || !userDetail.id) return notFound();

  return (
    <div className="bg-paleFrostBlues h-full w-full">
      <UserDetail userDetail={userDetail} />
    </div>
  );
}
