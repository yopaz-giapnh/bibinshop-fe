'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../actions';
import { FormValues, formSchema } from '../types/password-reset-form';
import CompleteModal from './complete-modal';
import TogglePasswordInput from './toggle-password-input';

type Props = {
  resetPasswordToken: string;
};

/**
 * 新しいパスワードを設定フォーム
 * @returns JSX.Element
 */
export default function PasswordResetForm({ resetPasswordToken }: Props) {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur'
  });

  const [state, formAction] = useFormState(resetPassword, null);
  const payload = {
    ...form.getValues(),
    resetPasswordToken
  };
  const action = formAction.bind(null, payload);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      setShowCompleteModal(true);
    } else {
      toast({
        title: state.message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [state]);

  const onCompleteModalOpen = () => {
    setShowCompleteModal(true);
  };
  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
    router.replace('/login');
  };

  return (
    <div className="flex w-[calc(100vw-32px)] flex-col items-center justify-center rounded-[6px] bg-white-base p-6 shadow-base md:w-full">
      <Typography as="boldXLarge" element="p" className="mb-[16px] text-[24px] text-black-90">
        新しいパスワードを設定
      </Typography>
      <Typography as="caption" element="p" className="mb-[16px] text-[16px] text-black-90">
        新しいパスワードを設定してください
      </Typography>
      <div className="w-full">
        <Form {...form}>
          <form action={action}>
            <TogglePasswordInput
              label="パスワード"
              showPassword={showNewPassword}
              toggleShowPassword={() => setShowNewPassword((prev) => !prev)}
              control={form.control}
              name="password"
            />
            <TogglePasswordInput
              label="新しいパスワードの再入力"
              showPassword={showNewPasswordConfirm}
              toggleShowPassword={() => setShowNewPasswordConfirm((prev) => !prev)}
              control={form.control}
              name="confirmPassword"
            />
            <div className="mt-[16px] flex gap-2">
              <SaveButton disabled={!form.formState.isValid} />
            </div>
          </form>
        </Form>
      </div>
      <CompleteModal
        open={showCompleteModal}
        setOpen={(open) => {
          if (open) {
            onCompleteModalOpen();
          } else {
            handleCompleteModalClose();
          }
        }}
        title="パスワードは更新されました"
        onClick={handleCompleteModalClose}
      />
    </div>
  );
}

function SaveButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="w-full" disabled={disabled || pending}>
      {pending ? <LoadingSpinner /> : '保存'}
    </Button>
  );
}
