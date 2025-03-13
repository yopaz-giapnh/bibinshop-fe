'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import BibismilingFace from '@/assets/bibincban/smiling-face.svg';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useIsPc } from '@/hooks/use-is-pc';

type Props = {
  open: boolean;
  title: string;
  onClick: () => void;
};

export default function CompleteReviewModal({ open, title, onClick }: Props) {
  const isPc = useIsPc();

  return (
    <Dialog open={open}>
      <DialogDescription>
        <DialogContent
          className="flex w-[540px] flex-col items-center justify-center gap-1 px-1 pb-[24px]"
          hideCloseButton
        >
          <DialogHeader>
            <DialogTitle className="text-[20px] text-black-90">
              レビューが完了しました！
            </DialogTitle>
          </DialogHeader>
          <Typography
            as="title"
            element="div"
            className="mb-[20px] flex flex-row text-[20px] text-black-90"
          >
            <p className="text-bibinGreen-100">{title}</p>
            <p>獲得予定です！</p>
          </Typography>
          <div className="mb-[24px] flex flex-row items-start gap-2">
            <ExclamationCircleIcon className="h-5 w-5 text-black-base" />
            {isPc ? (
              <Typography as="subCaption" element="div" className="text-black-90">
                <p>レビューの内容が不適切な場合、ポイントの付与⁨⁩がされません。不適切と判</p>
                <p>断された場合、再度適切なレビューを投稿してください。</p>
              </Typography>
            ) : (
              <div className="flex flex-col items-start gap-1">
                <Typography as="subCaption" element="p" className="text-black-90">
                  レビューの内容が不適切な場合、ポイントの付与⁨⁩が
                </Typography>
                <Typography as="subCaption" element="p" className="text-black-90">
                  されません。不適切と判断された場合、再度適切な
                </Typography>
                <Typography as="subCaption" element="p" className="text-black-90">
                  レビューを投稿してください。
                </Typography>
              </div>
            )}
          </div>
          <BibismilingFace />
          <Button
            size="lg"
            variant="lg"
            type="submit"
            className="mt-[24px] w-full md:w-3/4"
            onClick={onClick}
          >
            注文履歴に戻る
          </Button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
