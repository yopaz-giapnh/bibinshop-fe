'use client';

/**
 * ユーザープロフィール編集モーダル
 * @returns JSX.Element
 */
import RoundedWhiteCamera from '@/assets/round_white_camera.svg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilRuler } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { updateAccount } from '../actions';
import { FormValues, User, UserSex, formSchema } from '../types';
import { isUserSex } from '../utils';

type Props = {
  account: User;
};

export default function ProfileEditModal({ account }: Props) {
  const { nickname, sex } = account.attributes;

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname || ''
    }
  });

  const [selectedSex, setSelectedSex] = useState<UserSex>(sex);

  const [state, formAction] = useFormState(updateAccount, null);
  const action = formAction.bind(null, { ...form.getValues(), sex: selectedSex });

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogTrigger asChild>
          <button
            type="button"
            className="ml-[24px] flex w-full items-center justify-center gap-2 rounded-[100px] border border-bibinBlue-100 bg-inherit px-[16px] py-[8px]"
          >
            <PencilRuler className="h-6 w-6" color="#51B7FF" />
            <Typography as="bold" element="p" className="text-bibinBlue-100">
              編集
            </Typography>
          </button>
        </DialogTrigger>
        <Form {...form}>
          <DialogContent className="flex w-[640px] flex-col items-center justify-center">
            <DialogHeader>
              <DialogTitle>プロフィール編集</DialogTitle>
            </DialogHeader>
            <div className="relative flex">
              <div className="relative h-[100px] w-[100px]">
                <Image
                  src={account.avatar?.url || '/placeholder-product-image.png'}
                  className="rounded-[100px]"
                  layout="fill"
                  objectFit="cover"
                  alt={''}
                />
              </div>
              <RoundedWhiteCamera className="absolute bottom-0 right-0" />
            </div>
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Typography as="bold" element="p" className="mb-[8px] text-[14px] text-black-90">
                性別
              </Typography>
              <RadioGroup
                value={selectedSex}
                onValueChange={(value) => {
                  if (isUserSex(value)) {
                    setSelectedSex(value);
                  }
                }}
                className="mt-[4px] flex"
              >
                <div className="mr-[40px] flex items-center">
                  <RadioGroupItem value="female" id="r1" className=" focus" />
                  <Typography
                    as="xSmall"
                    element="p"
                    className="ml-[8px] text-[14px] text-black-90"
                  >
                    女性
                  </Typography>
                </div>
                <div className="mr-[40px] flex items-center">
                  <RadioGroupItem value="male" id="r2" />
                  <Typography
                    as="xSmall"
                    element="p"
                    className="ml-[8px] text-[14px] text-black-90"
                  >
                    男性
                  </Typography>
                </div>
                <div className="mr-[40px] flex items-center">
                  <RadioGroupItem value="not_applicable" id="r3" />
                  <Typography
                    as="xSmall"
                    element="p"
                    className="ml-[8px] text-[14px] text-black-90"
                  >
                    その他
                  </Typography>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full">
              <form action={action}>
                <SaveButton disabled={!form.formState.isValid} />
              </form>
            </div>
          </DialogContent>
        </Form>
      </DialogDescription>
    </Dialog>
  );
}

function SaveButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" variant="lg" className="w-full" disabled={pending || disabled}>
      {pending ? <LoadingSpinner /> : '保存'}
    </Button>
  );
}
