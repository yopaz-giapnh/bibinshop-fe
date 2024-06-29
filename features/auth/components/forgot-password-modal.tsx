'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { BadgeAlert } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { sendResetPasswordEmail } from '../actions';
import { FormValues, formSchema } from '../types/forgot-password-form';

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
  { handleNextModalOpen: (email: string) => void }
>(({ handleNextModalOpen }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showError, setShowError] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    }
  }));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const [state, formAction] = useFormState(sendResetPasswordEmail, undefined);
  const action = formAction.bind(null, form.getValues('email'));

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      handleNextModalOpen(form.getValues('email'));
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
        <DialogContent className="flex w-[640px] flex-col items-center justify-center">
          <Form {...form}>
            <form action={action}>
              <Typography
                as="bold"
                element="p"
                className="mb-[24px] text-center text-[20px] text-black-90"
              >
                パスワードを忘れた
              </Typography>
              <div>
                <Typography as="caption" element="p" className="text-[14px] text-black-90">
                  パスワードを忘れてしまった場合は、ご登録のメールアドレスを入力してください。
                </Typography>
                <Typography
                  as="caption"
                  element="p"
                  className="mb-[24px] text-[14px] text-black-90"
                >
                  パスワードを再設定するためのリンクをお送りします。
                </Typography>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mx-auto flex w-[348px] justify-between pt-[12px]">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="w-[170px] rounded-[100px] border-[1px] border-bibinBlue-100 text-bibinBlue-100"
                  >
                    キャンセル
                  </button>
                </DialogClose>

                <ForgotPasswordButton disabled={!form.formState.isValid} />
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

ForgotPasswordModal.displayName = 'ForgotPasswordModal';

function ForgotPasswordButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button variant="lg" className="w-[170px]" disabled={pending || disabled}>
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography as="bold" element="p" className="text-white text-[14px]">
            確認
          </Typography>
        </>
      )}
    </Button>
  );
}
