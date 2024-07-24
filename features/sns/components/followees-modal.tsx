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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { useEffect, useMemo, useState } from 'react';
import { getFollowees } from '../actions';
import UserRow from './user-row';

type Props = {
  unique_key: string;
};
export default function FolloweesModal({ unique_key }: Props) {
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
  }, [page, unique_key]);

  return (
    <Dialog
      onOpenChange={(opened) => {
        if (opened) {
          setPage(-1);
          setPages([]);
          setLoading(false);
          setHasMore(true);
        }
      }}
    >
      <DialogDescription>
        <DialogTrigger asChild>
          <Button className="border border-bibinBlue-100 bg-white-base">
            <Typography as="boldSmall" element="p" className="text-bibinBlue-100">
              フォロー中
            </Typography>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[90%] flex-col items-center justify-center md:w-[592px]">
          <DialogHeader>
            <DialogTitle>フォロー中</DialogTitle>
          </DialogHeader>
          <ScrollArea
            className="mb-auto w-[343px] md:h-[570px] md:w-[592px]"
            onScrollCapture={(e) => {
              if (loading) return;
              if (!hasMore) return;
              const target = e.target as HTMLDivElement;
              if (target.scrollTop + target.clientHeight > target.scrollHeight - 200) {
                setPage((prev) => prev + 1);
              }
            }}
          >
            <div className="grid grid-cols-1 divide-y divide-gray-200">
              {data.map((item, idx) => (
                <UserRow
                  avatar={item?.relationships?.user_profile?.data?.id ?? ''}
                  firstName={item?.attributes?.first_name ?? ''}
                  lastName={item?.attributes?.last_name ?? ''}
                  unique_key={item?.attributes?.unique_key ?? ''}
                  isFollowee={item?.attributes?.followed_by_me ?? false}
                  tags={['tag1', 'tag2', 'tag3']}
                  key={idx}
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
