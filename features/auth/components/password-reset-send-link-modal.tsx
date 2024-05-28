'use client';

import BibiBubbleEmail from '@/assets/bibincban/bubble-email.svg';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { ChevronLeft } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

export type PasswordReserSendLinkModalRef = {
  open: () => void;
  close: () => void;
};

/**
 * パスワードリセット後のメール送信完了モーダル
 * @returns JSX.Element
 */
export const PasswordReserSendLinkModal = forwardRef<
  PasswordReserSendLinkModalRef,
  { handleGoBack: () => void }
>(({ handleGoBack }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('メールを再送する');
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000
  });

  const handleTimerReset = () => {
    setIsButtonDisabled(false);
    setButtonText('メールを再送する');
    stopCountdown();
    resetCountdown();
  };

  const handleResendClick = () => {
    setIsButtonDisabled(true);
    setButtonText('メールを再送しました！');
    startCountdown();

    setTimeout(() => {
      handleTimerReset();
    }, 60000);
  };

  const goBack = () => {
    handleTimerReset();
    handleGoBack();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      handleTimerReset();
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-[540px] flex-col items-center justify-center">
          <button
            type="button"
            className="absolute left-6 top-4 flex items-center"
            onClick={goBack}
          >
            <ChevronLeft />
            <Typography as="bold" element="p" className="text-[14px] text-black-90">
              戻る
            </Typography>
          </button>
          <div className="flex flex-col items-center">
            <Typography as="bold" element="p" className="text-[20px] text-black-90">
              パスワード再設定のリンクを
            </Typography>
            <Typography as="bold" element="p" className="mb-[24px] text-[20px] text-black-90">
              送信しました
            </Typography>
            <BibiBubbleEmail />
          </div>
          <Typography as="caption" element="p" className="text-[14px] text-black-90">
            メールが届いていない場合は、迷惑メールフォルダをご確認ください。
          </Typography>
          <button
            type="button"
            className={`text-[14px] font-bold ${isButtonDisabled ? 'text-gray-500' : 'text-bibinBlue-100'}`}
            onClick={handleResendClick}
            disabled={isButtonDisabled}
          >
            {buttonText}{' '}
            {isButtonDisabled && <span className="text-bibinBlue-100">{`${count}s`}</span>}
          </button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

PasswordReserSendLinkModal.displayName = 'PasswordReserSendLinkModal';
