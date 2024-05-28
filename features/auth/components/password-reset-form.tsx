'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { updateAccountSecurity } from '@/features/account/security/actions';
import TogglePasswordInput from '@/features/account/security/components/toggle-password-input';
import { FormValues, formSchema } from '@/features/account/security/types/security-detail';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import CompleteModal from './complete-modal';

/**
 * 新しいパスワードを設定フォーム
 * @returns JSX.Element
 */
export default function PasswordResetForm() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: ''
    }
  });

  const [formState, formAction] = useFormState(updateAccountSecurity, null);
  const dispatch = formAction.bind(null, form.getValues());

  useEffect(() => {
    if (formState?.result) {
      form.reset();
    }
  }, [form, formState]);

  const handleGotoHome = () => {
    setShowCompleteModal(false);
    router.push('/');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography as="boldXLarge" element="p" className="mb-[16px] text-[24px] text-black-90">
        新しいパスワードを設定
      </Typography>
      <Typography as="caption" element="p" className="mb-[16px] text-[16px] text-black-90">
        新しいパスワードを設定してください
      </Typography>
      <div className="w-full">
        <Form {...form}>
          <form action={dispatch}>
            <TogglePasswordInput
              label="パスワード"
              showPassword={showNewPassword}
              toggleShowPassword={() => setShowNewPassword((prev) => !prev)}
              control={form.control}
              name="newPassword"
            />
            <TogglePasswordInput
              label="新しいパスワードの再入力"
              showPassword={showNewPasswordConfirm}
              toggleShowPassword={() => setShowNewPasswordConfirm((prev) => !prev)}
              control={form.control}
              name="newConfirmPassword"
            />
            <div className="mt-[16px] flex gap-2">
              <SaveButton
                disabled={!form.formState.isValid}
                onClick={() => {
                  setShowCompleteModal(true);
                }}
              />
            </div>
          </form>
        </Form>
      </div>
      <CompleteModal
        open={showCompleteModal}
        setOpen={setShowCompleteModal}
        title="パスワードは更新されました"
        onClick={handleGotoHome}
      />
    </div>
  );
}

type SaveButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

function SaveButton({ disabled, onClick }: SaveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      variant="lg"
      type="submit"
      className="w-full"
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? <LoadingSpinner /> : '保存'}
    </Button>
  );
}
