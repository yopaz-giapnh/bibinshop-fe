'use client';

import BibiBubbleEmail from '@/assets/bibincban/bubble-email.svg';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';
import { ChevronLeft } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useCountdown } from 'usehooks-ts';
import { sendResetPasswordEmail } from '../actions';

export type PasswordReserSendLinkModalRef = {
  open: (email: string) => void;
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
  const [email, setEmail] = useState('');
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

  const handleResend = () => {
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
    open: (email: string) => {
      setIsOpen(true);
      setEmail(email);
    },
    close: () => {
      setIsOpen(false);
      handleTimerReset();
    }
  }));

  const [state, formAction] = useFormState(sendResetPasswordEmail, undefined);
  const action = formAction.bind(null, email);

  useEffect(() => {
    if (!state) {
      return;
    }

    handleResend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
          <form action={action}>
            <ResendButton disabled={isButtonDisabled} text={buttonText} count={count} />
          </form>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

PasswordReserSendLinkModal.displayName = 'PasswordReserSendLinkModal';

function ResendButton({
  disabled,
  text,
  count
}: {
  disabled: boolean;
  text: string;
  count: number;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`text-[14px] font-bold ${disabled ? 'text-gray-500' : 'text-bibinBlue-100'}`}
      disabled={disabled || pending}
    >
      {pending ? <LoadingSpinner /> : text}
      {disabled && <span className="text-bibinBlue-100">{`${count}s`}</span>}
    </button>
  );
}
