import BibiBubbleEmail from '@/assets/bibincban/bubble-email.svg';
import EmailSentGif from '@/assets/bibincban/email_sent.gif';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { useIsPc } from '@/hooks/use-is-pc';
import { BadgeAlert } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useCountdown } from 'usehooks-ts';
import { resendEmail } from '../actions';

export type SentEmailModalRef = {
  open: () => void;
  close: () => void;
};

/**
 * 登録メール送信完了モーダル
 * @returns JSX.Element
 */
export const SentEmailModal = forwardRef<SentEmailModalRef, { email: string }>(({ email }, ref) => {
  const isPc = useIsPc();
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

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      handleTimerReset();
    }
  }));

  const [state, formAction] = useFormState(resendEmail, undefined);
  const action = formAction.bind(null, { email });

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      setIsButtonDisabled(true);
      setButtonText('メールを再送信しました！');
      startCountdown();

      setTimeout(() => {
        handleTimerReset();
      }, 60000);
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        {isPc ? (
          <DialogContent className="hidden w-[472px] flex-col items-center justify-center md:flex">
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
            <form action={action} className="w-full">
              <ResendButton
                disabled={isButtonDisabled}
                text={`${buttonText} ${isButtonDisabled ? `${count}s` : ''}`}
              />
            </form>
          </DialogContent>
        ) : (
          <DialogContent
            className="flex w-11/12 flex-col items-center justify-center md:hidden"
            hideCloseButton
          >
            <img src={EmailSentGif.src} />
            <Typography
              as="bold"
              element="p"
              className="mb-[24px] text-center text-[20px] text-black-90"
            >
              入力したアドレスにメールを送信しました
            </Typography>
            <Typography as="bold" element="p" className="mb-[24px] text-[14px] text-bibinGreen-100">
              {email}
            </Typography>
            <Typography as="caption" element="p" className="mb-[24px] text-[14px] text-black-90">
              入力いただいたメールアドレスに確認のメールが送信されます。メールが届いていない場合は、迷惑メールフォルダをご確認ください。
            </Typography>
            <form action={action} className="w-full">
              <ResendButton
                disabled={isButtonDisabled}
                text={`${buttonText} ${isButtonDisabled ? `${count}s` : ''}`}
              />
            </form>
          </DialogContent>
        )}
      </DialogDescription>
    </Dialog>
  );
});

SentEmailModal.displayName = 'SentEmailModal';

function ResendButton({ disabled, text }: { disabled: boolean; text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      variant="lg"
      className={`w-full ${disabled ? 'bg-gray-400' : ''}`}
      disabled={disabled}
    >
      {pending ? <LoadingSpinner /> : text}
    </Button>
  );
}
