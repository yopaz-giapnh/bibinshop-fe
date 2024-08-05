'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { getFollowees } from '../actions';
import { getConcernTags, isUserProfile } from '../utils';
import UserRow from './user-row';

type Props = {
  unique_key: string;
  onClosed?: () => void;
};

export type FolloweesModalRef = {
  open: () => void;
  close: () => void;
};

export const FolloweesModal = forwardRef<FolloweesModalRef, Props>(
  ({ unique_key, onClosed }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState<Array<Awaited<ReturnType<typeof getFollowees>>>>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const data = useMemo(() => {
      return pages.flatMap((p) => p.data);
    }, [pages]);

    useEffect(() => {
      if (loading) return;
      if (page < 0) {
        setPage(0);
        return;
      }
      setLoading(true);
      const idx = page;
      const loadNextPage = async () => {
        const response = await getFollowees({ page, unique_key });
        setPages((prev) => {
          const res = [...prev];
          // avoid duplicated data
          res[idx] = response;
          return res;
        });
        setHasMore(response.meta?.total_pages ? response.meta.total_pages >= page : true);
        setLoading(false);
      };
      loadNextPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, unique_key]);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      }
    }));

    return (
      <Dialog
        onOpenChange={(opened) => {
          setIsOpen(opened);
          if (!opened) {
            onClosed?.();
            setPage(-1);
            setPages([]);
            setLoading(false);
            setHasMore(true);
          }
        }}
        open={isOpen}
      >
        <DialogDescription>
          <DialogContent className="flex h-[90%] flex-col items-center justify-center md:w-[592px]">
            <DialogHeader>
              <DialogTitle>フォロー中</DialogTitle>
            </DialogHeader>
            <ScrollArea
              className="mb-auto w-full md:h-[570px] md:w-[592px]"
              onScrollCapture={(e) => {
                if (loading) return;
                if (!hasMore) return;
                const target = e.target as HTMLDivElement;
                if (target.scrollTop + target.clientHeight > target.scrollHeight - 200) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              <div className="grid grid-cols-1 divide-y divide-gray-200 md:mx-[16px]">
                {data.map((item, idx) => {
                  const userProfile = item?.userProfile;
                  const tags =
                    userProfile && isUserProfile(userProfile)
                      ? getConcernTags(userProfile.attributes)
                      : [];

                  return (
                    <UserRow
                      avatar={item?.avatar?.url || '/placeholder-product-image.png'}
                      nickname={item?.attributes?.nickname ?? '名無し'}
                      unique_key={item?.attributes?.unique_key ?? ''}
                      isFollowee={item?.attributes?.followed_by_me ?? false}
                      tags={tags}
                      key={idx}
                      userType={item?.type || ''}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    );
  }
);

FolloweesModal.displayName = 'FolloweesModal';
