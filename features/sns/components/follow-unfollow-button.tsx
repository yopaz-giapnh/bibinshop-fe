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
import { useState } from 'react';
import { follow, unfollow } from '../actions';

type Props = {
  username: string;
  unique_key: string;
  isFollowing: boolean;
};
export default function FollowUnfollowButton({ username, unique_key, isFollowing }: Props) {
  const [following, setFollowing] = useState(isFollowing);

  if (!following) {
    return (
      <Button
        className="ml-auto md:self-center"
        onClick={async () =>
          await follow({ unique_key: unique_key }).then(
            () => setFollowing(true),
            () => {}
          )
        }
      >
        フォローする
      </Button>
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
            フォロー解除
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-[592px] flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>{username}さんをフォロー解除しますか？</DialogTitle>
          </DialogHeader>
          <div className="flex-row items-center justify-center ">
            <Button
              variant="outline"
              className="mx-1 rounded-[100px] border-bibinBlue-100 px-6 font-medium not-italic leading-normal tracking-[0.42px] text-bibinBlue-100"
            >
              キャンセル
            </Button>
            <Button
              className="mx-1 px-6"
              onClick={async () =>
                await unfollow({ unique_key: unique_key }).then(
                  () => setFollowing(false),
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
