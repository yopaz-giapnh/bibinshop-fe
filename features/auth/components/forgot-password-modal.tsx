'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type ForgotPasswordModalRef = {
  open: () => void;
  close: () => void;
};

/**
 * パスワードを忘れてしまいましたかモーダル
 * @returns JSX.Element
 */
export const ForgotPasswordModal = forwardRef<
  ForgotPasswordModalRef,
  { handleNextModalOpen: () => void }
>(({ handleNextModalOpen }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-[640px] flex-col items-center justify-center">
          <Typography as="bold" element="p" className="mb-[24px] text-[20px] text-black-90">
            パスワードを忘れた
          </Typography>
          <div>
            <Typography as="caption" element="p" className="text-[14px] text-black-90">
              パスワードを忘れてしまった場合は、ご登録のメールアドレスを入力してください。
            </Typography>
            <Typography as="caption" element="p" className="mb-[24px] text-[14px] text-black-90">
              パスワードを再設定するためのリンクをお送りします。
            </Typography>
          </div>
          <div className="w-full">
            <Typography as="boldSmall" element="p" className="mb-[8px] text-[14px] text-black-90">
              メールアドレス
            </Typography>
            <input
              type="email"
              placeholder="メールアドレス"
              className="w-full rounded-[6px] border border-black-10 p-4"
            />
          </div>
          <div className="flex w-[348px] justify-between pt-[12px]">
            <DialogClose asChild>
              <button
                type="button"
                className="w-[170px] rounded-[100px] border-[1px] border-bibinBlue-100 text-bibinBlue-100"
              >
                キャンセル
              </button>
            </DialogClose>
            <Button type="submit" variant="lg" className="w-[170px]" onClick={handleNextModalOpen}>
              <Typography as="bold" element="p" className="text-white text-[14px]">
                確認
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

ForgotPasswordModal.displayName = 'ForgotPasswordModal';
