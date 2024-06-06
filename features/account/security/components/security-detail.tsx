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
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { updateAccountSecurity } from '../actions';
import { FormValues, formSchema } from '../types/security-detail';
import TogglePasswordInput from './toggle-password-input';

/**
 * アカウントセキュリティ画面
 * @returns JSX.Element
 */
export default function SecurityDetail() {
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false);
  // TODO:BE側のRequest bodyに無いため一旦コメントアウト
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newConfirmPassword: ''
    }
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
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        アカウントセキュリティ
      </Typography>
      <div className="w-full px-[48px]">
        <Typography as="bold" element="p" className="mb-[8px] text-[20px] text-black-90">
          メール
        </Typography>
        <Typography as="small" element="p" className="text-[16px] text-black-90">
          yamada_taro183@gmail.com
        </Typography>
        <div className="my-[16px] border-t-[1px]" />
        <div className="flex justify-between">
          <div>
            <Typography as="bold" element="p" className="mb-[8px] text-[20px] text-black-90">
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
              <div className="mt-[16px] w-2/5">
                {/* TODO:BE側のRequest bodyに無いため一旦コメントアウト */}
                {/* <TogglePasswordInput
                  label="古いパスワード"
                  showPassword={showCurrentPassword}
                  toggleShowPassword={() => setShowCurrentPassword((prev) => !prev)}
                  control={control}
                  name="password"
                /> */}
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
    </>
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
