import BibiBubbleEmail from '@/assets/bibincban/bubble-email.svg';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

export type SentEmailModalRef = {
  open: () => void;
  close: () => void;
};

/**
 * 登録メール送信完了モーダル
 * @returns JSX.Element
 */
export const SentEmailModal = forwardRef<SentEmailModalRef, { email: string }>(({ email }, ref) => {
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

  const handleResendEmail = () => {
    setIsButtonDisabled(true);
    setButtonText('メールを再送信しました！');
    startCountdown();

    setTimeout(() => {
      handleTimerReset();
    }, 60000);

    // メール再送信のロジックをここに追加
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
        <DialogContent className="flex w-[472px] flex-col items-center justify-center">
          <BibiBubbleEmail />
          <Typography as="bold" element="p" className="mb-[24px] text-[20px] text-black-90">
            入力したアドレスにメールを送信しました
          </Typography>
          <Typography as="bold" element="p" className="mb-[24px] text-[14px] text-bibinGreen-100">
            {email}
          </Typography>
          <Typography as="caption" element="p" className="mb-[24px] text-[14px] text-black-90">
            入力いただいたメールアドレスに確認のメールが送信されます。メールが届いていない場合は、迷惑メールフォルダをご確認ください。
          </Typography>
          <Button
            type="button"
            size="lg"
            variant="lg"
            className={`w-4/5 ${isButtonDisabled ? 'bg-gray-400' : ''}`}
            onClick={handleResendEmail}
            disabled={isButtonDisabled}
          >
            {buttonText} {isButtonDisabled && `${count}s`}
          </Button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

SentEmailModal.displayName = 'SentEmailModal';
