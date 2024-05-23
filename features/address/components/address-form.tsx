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
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { addItem } from '../actions';
import { FormValues, formSchema } from '../types/address-form';

type Props = {
  buttonText?: string;
  defaultValues?: FormValues;
};

export function AddressForm({ buttonText = '保存する', defaultValues }: Props) {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [message, formAction] = useFormState(addItem, null);
  const actionWithProduct = formAction.bind(null, { ...form.getValues(), isDefaultAddress });
  console.log('AddressForm', message);

  return (
    <Form {...form}>
      <form action={actionWithProduct} className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full gap-4">
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

        <div className="flex w-full gap-4">
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
                  <Input {...field} autoComplete="username" placeholder="例：123-4567" />
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
                  <Input {...field} autoComplete="username" placeholder="例：山田" />
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
                  <Input {...field} autoComplete="username" placeholder="例：OO区" />
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
                  <Input {...field} autoComplete="username" placeholder="例：1-2-3" />
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
                    placeholder="例：0712345678 (ハイフンなし)"
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

        <SaveButton buttonText={buttonText} />
      </form>
    </Form>
  );
}

type ButtonProps = Pick<Props, 'buttonText'>;

function SaveButton({ buttonText }: ButtonProps) {
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const handleOpenToast = () => {
    toast({
      title: '住所が追加されました。'
    });
  };

  return (
    <Button
      size="lg"
      variant="lg"
      className="w-[392px]"
      disabled={pending}
      onClick={handleOpenToast}
    >
      {pending ? <LoadingSpinner /> : buttonText}
    </Button>
  );
}
