'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeAlert, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { addAccountAddress, updateAccountAddress } from '../actions';
import { Address } from '../types';
import { FormValues, formSchema } from '../types/address-form';

type Props = {
  buttonText?: string;
  address?: Address;
  onSaved?: () => void;
};

export function AddressForm({ buttonText = '保存する', address, onSaved }: Props) {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const isEdit = !!address;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: address?.attributes.lastname || '',
      firstName: address?.attributes.firstname || '',
      lastNameKana: address?.attributes.lastname || '',
      firstNameKana: address?.attributes.firstname || '',
      postalCode: address?.attributes.zipcode || '',
      prefecture: address?.attributes.state_name || '',
      city: address?.attributes.city || '',
      address1: address?.attributes.address1 || '',
      address2: address?.attributes.address2 || '',
      phoneNumber: address?.attributes.phone || ''
    }
  });

  const [state, formAction] = useFormState(isEdit ? updateAccountAddress : addAccountAddress, null);
  const formData = { ...form.getValues(), isDefaultAddress };
  const action = formAction.bind(null, isEdit ? { ...formData, id: address?.id } : formData);

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
      onSaved?.();
    } else {
      toast({
        title: state.message,
        description: state.description,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  }, [form, state, toast, onSaved]);

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-4 md:items-center md:justify-center">
        <div className="w-full gap-4 md:flex">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>姓</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：山田" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>名</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：太郎" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full gap-4 md:flex">
          <FormField
            control={form.control}
            name="lastNameKana"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>セイ</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：ヤマダ" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstNameKana"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>メイ</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：タロウ" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>郵便番号</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：1234567" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button className="mt-[28px] flex flex-1 items-center" type="button">
            <Typography as="linkSmall" element="p" className="text-left text-bibinBlue-100">
              郵便番号から住所入力
            </Typography>
          </button>
        </div>

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="prefecture"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>都道府県</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：東京都" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>市区郡町村</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：港区" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>番地</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：赤坂1-2-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>アパート・マンション・部屋番号</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" placeholder="例：OOビル101" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>電話番号</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="username"
                    placeholder="例：07012345678 (ハイフンなし)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <label key="isDefaultAddress" className="flex cursor-pointer items-center">
            <div className="flex h-[46px] w-[46px] items-center justify-center">
              {/* TODO: チェックボックスがtrueの状態で住所一覧に新しい住所を追加(update)するAPIを叩いた場合、main addoressに設定 */}
              <Checkbox
                id="isDefaultAddress"
                onCheckedChange={(checked: boolean) => {
                  setIsDefaultAddress(checked);
                }}
              />
            </div>
            <Typography as="caption" element="h2" className="text-black-90">
              いつもこの住所に届ける
            </Typography>
          </label>
        </div>

        <SaveButton buttonText={buttonText} disabled={!form.formState.isValid} />
      </form>
    </Form>
  );
}

type ButtonProps = Pick<Props, 'buttonText'> & {
  disabled?: boolean;
};

function SaveButton({ buttonText, disabled }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" variant="lg" className="md:w-[392px]" disabled={pending || disabled}>
      {pending ? <LoadingSpinner /> : buttonText}
    </Button>
  );
}
