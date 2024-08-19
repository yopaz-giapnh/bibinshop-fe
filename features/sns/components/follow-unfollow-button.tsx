'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { startTransition, useCallback, useRef, useState } from 'react';
import { follow, unfollow } from '../actions';
import {
  NewRegistrationMediationModal,
  NewRegistrationMediationModalRef
} from './new-registration-mediation-modal';

type Props = {
  username: string;
  unique_key: string;
  isFollowing: boolean;
};

export default function FollowUnfollowButton({ username, unique_key, isFollowing }: Props) {
  const [following, setFollowing] = useState(isFollowing);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const newRegistrationMediationModalRef = useRef<NewRegistrationMediationModalRef>(null);

  const refreshUserDetails = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  const handleFollow = async () => {
    if (!isLoggedIn) {
      newRegistrationMediationModalRef.current?.open();
      return;
    }

    await follow({ unique_key }).then(
      () => {
        setFollowing(true);
        refreshUserDetails();
      },
      () => {}
    );
  };

  if (!following) {
    return (
      <>
        <Button className="ml-auto" onClick={handleFollow}>
          フォローする
        </Button>
        <NewRegistrationMediationModal ref={newRegistrationMediationModalRef} />
      </>
    );
  }
  return (
    <Dialog>
      <DialogDescription className="ml-auto">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-[100px] border-bibinBlue-100 font-medium not-italic leading-normal tracking-[0.42px] text-bibinBlue-100"
          >
            フォロー中
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-[592px] flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>{username}さんをフォロー解除しますか？</DialogTitle>
          </DialogHeader>
          <div className="flex-row items-center justify-center ">
            <DialogClose>
              <Button
                variant="outline"
                className="mx-1 rounded-[100px] border-bibinBlue-100 px-6 font-medium not-italic leading-normal tracking-[0.42px] text-bibinBlue-100"
              >
                キャンセル
              </Button>
            </DialogClose>
            <Button
              className="mx-1 px-6"
              onClick={async () =>
                await unfollow({ unique_key: unique_key }).then(
                  () => {
                    setFollowing(false);
                    refreshUserDetails();
                  },
                  () => {}
                )
              }
            >
              フォロー解除
            </Button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
