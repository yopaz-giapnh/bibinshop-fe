'use client';

import Edit from '@/assets/edit.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeAlert, Check } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { getAccount } from '../../profile/actions';
import { updateAccountSecurity } from '../actions';
import { FormValues, formSchema } from '../types/security-detail';
import TogglePasswordInput from './toggle-password-input';

type Props = {
  getAccount: ReturnType<typeof getAccount>;
};

/**
 * アカウントセキュリティ画面
 * @returns JSX.Element
 */
export default function SecurityDetail({ getAccount }: Props) {
  const account = use(getAccount);
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: ''
    },
    mode: 'onBlur'
  });

  const { control } = form;

  const [state, formAction] = useFormState(updateAccountSecurity, null);
  const action = formAction.bind(null, form.getValues());

  const { toast } = useToast();

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state?.success) {
      form.reset();
      toast({
        title: state.message,
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: state.message,
        description: state.description,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [form, state, toast]);

  return (
    <div className="w-full rounded-[6px] bg-white-base px-[18px] py-3 shadow-base md:px-[48px] md:py-6">
      <Typography
        as="bold"
        element="p"
        className="mb-[8px] text-[16px] text-black-90 md:text-[20px]"
      >
        メール
      </Typography>
      <Typography as="small" element="p" className="text-[14px] text-gray-700 md:text-[16px]">
        {account.attributes.email}
      </Typography>
      <div className="my-[16px] border-t-[1px]" />
      <div className="flex justify-between">
        <div>
          <Typography
            as="bold"
            element="p"
            className="mb-[8px] text-[16px] text-black-90 md:text-[20px]"
          >
            パスワードの変更
          </Typography>
          <Typography as="small" element="p" className="text-[16px] text-black-90">
            ***********
          </Typography>
        </div>
        {!showEditPasswordForm && (
          <ButtonWithIcon
            buttonProps={{
              className:
                'h-10 flex justify-center px-5 py-4 border border-bibinBlue-100 rounded-[100px]',
              onClick: () => setShowEditPasswordForm(true)
            }}
            icon={<Edit />}
            text="編集"
            textProps={{ className: 'text-bibinBlue-100' }}
          />
        )}
      </div>
      {showEditPasswordForm && (
        <Form {...form}>
          <form action={action}>
            <div className="mt-[16px] w-full md:w-2/5">
              <TogglePasswordInput
                label="古いパスワード"
                showPassword={showCurrentPassword}
                toggleShowPassword={() => setShowCurrentPassword((prev) => !prev)}
                control={control}
                name="password"
              />
              <TogglePasswordInput
                label="新しいパスワード"
                showPassword={showNewPassword}
                toggleShowPassword={() => setShowNewPassword((prev) => !prev)}
                control={control}
                name="newPassword"
              />

              <TogglePasswordInput
                label="新しいパスワードの再入力"
                showPassword={showNewPasswordConfirm}
                toggleShowPassword={() => setShowNewPasswordConfirm((prev) => !prev)}
                control={control}
                name="newConfirmPassword"
              />
            </div>
            <div className="mt-[16px] flex gap-2">
              <Button
                className="w-[200px] border border-bibinBlue-100 bg-white-base"
                onClick={() => setShowEditPasswordForm(false)}
              >
                <Typography as="bold" element="p" className="text-bibinBlue-100">
                  キャンセル
                </Typography>
              </Button>
              <SaveButton disabled={false} />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

type SaveButtonProps = {
  disabled: boolean;
};

function SaveButton({ disabled }: SaveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-[200px]" disabled={disabled || pending}>
      {pending ? <LoadingSpinner /> : '確認'}
    </Button>
  );
}
