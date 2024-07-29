'use client';

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
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilRuler } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { updateAccount, updateSocialLink, uploadAvatar } from '../actions';
import { FormValues, User, UserSex, formSchema } from '../types';
import { isUserSex } from '../utils';

type Props = {
  account: User;
};

export default function ProfileEditModal({ account }: Props) {
  const { nickname, sex } = account.attributes;

  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname || ''
    },
    mode: 'onBlur'
  });

  const [selectedSex, setSelectedSex] = useState<UserSex>(sex);
  const [skinType, setSkinType] = useState<string | undefined>(undefined);
  const [personalColor, setPersonalColor] = useState<string | undefined>(undefined);
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
  const [scalpConcerns, setScalpConcerns] = useState<string[]>([]);
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);

  useEffect(() => {
    form.setValue('sex', selectedSex);
    form.setValue('skinType', skinType);
    form.setValue('personalColor', personalColor);
    form.setValue('skinConcerns', skinConcerns);
    form.setValue('scalpConcerns', scalpConcerns);
    form.setValue('healthConcerns', healthConcerns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex, skinType, personalColor, skinConcerns, scalpConcerns, healthConcerns]);

  useEffect(() => {
    const links: Record<string, string> = {};
    account.socialLinks?.forEach((link) => {
      if (link.attributes) {
        links[link.attributes.platform.toLowerCase()] = link.attributes.url;
      }
    });
    setSocialLinks(links);

    // フォームの初期値を設定
    form.setValue('instagram', links.instagram || '');
    form.setValue('x', links.x || '');
    form.setValue('facebook', links.facebook || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.socialLinks]);

  const handleSubmit = async (formData: FormValues) => {
    const accountUpdateResult = await updateAccount(null, formData);

    if (accountUpdateResult.success) {
      if (formData.instagram) {
        updateSocialLink(formData.instagram, 'INSTAGRAM');
      }
      if (formData.x) {
        await updateSocialLink(formData.x, 'X');
      }
      if (formData.facebook) {
        await updateSocialLink(formData.facebook, 'FACEBOOK');
      }
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-[100px] border border-bibinBlue-100 bg-inherit px-[16px] py-[8px]"
          >
            <PencilRuler className="h-6 w-6" color="#51B7FF" />
            <Typography as="bold" element="p" className="text-bibinBlue-100">
              編集
            </Typography>
          </button>
        </DialogTrigger>
        <DialogContent className="flex h-[calc(150vw-80px)] w-11/12 flex-col items-center justify-center overflow-y-auto md:h-modal-screen-calc md:w-[640px]">
          <div className="flex max-h-[80vh] w-full flex-col items-center overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[16px] md:text-[20px]">プロフィール編集</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form className="relative mt-[16px] flex" action={uploadAvatar}>
                <AvatarUpload account={account} />
              </form>
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
              <div className="mt-[16px] w-full">
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
                  className="mt-[4px] flex justify-between md:justify-normal"
                >
                  <div className="flex items-center md:mr-[40px]">
                    <RadioGroupItem value="female" id="r1" className=" focus" />
                    <Typography
                      as="xSmall"
                      element="p"
                      className="ml-[8px] text-[14px] text-black-90"
                    >
                      女性
                    </Typography>
                  </div>
                  <div className="flex items-center md:mr-[40px]">
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
              <div className="mt-[16px] w-full">
                <FormField
                  control={form.control}
                  name="birthyear"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>生まれた年</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            form.setValue('birthyear', value ? Number(value) : undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[16px] w-full">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          defaultValue={socialLinks.instagram || ''}
                          onChange={(e) =>
                            form.setValue('instagram', e.target.value ? e.target.value : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[16px] w-full">
                <FormField
                  control={form.control}
                  name="x"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>X URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          defaultValue={socialLinks.x || ''}
                          onChange={(e) =>
                            form.setValue('x', e.target.value ? e.target.value : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[16px] w-full">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          defaultValue={socialLinks.facebook || ''}
                          onChange={(e) =>
                            form.setValue('facebook', e.target.value ? e.target.value : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[16px] w-full">
                <FormItem className="w-full">
                  <FormLabel className="flex h-[24px] items-center">
                    肌の悩み
                    <PencilSquareIcon className="ml-2" width={24} height={24} color="#51B7FF" />
                    <Typography className="text-bibinBlue-100" element="p">
                      編集
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap">
                      {skinType && (
                        <div className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold">
                          {skinType}
                        </div>
                      )}
                      {personalColor && (
                        <div className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold">
                          {personalColor}
                        </div>
                      )}
                      {skinConcerns.map((concern, i) => (
                        <div
                          key={i}
                          className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold"
                        >
                          {concern}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="mt-[16px] w-full">
                <FormItem className="w-full">
                  <FormLabel className="flex h-[24px] items-center">
                    頭皮・毛髪の悩み、健康の悩み
                    <PencilSquareIcon className="ml-2" width={24} height={24} color="#51B7FF" />
                    <Typography className="text-bibinBlue-100" element="p">
                      編集
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap">
                      {scalpConcerns.map((concern, i) => (
                        <div
                          key={i}
                          className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold"
                        >
                          {concern}
                        </div>
                      ))}
                      {healthConcerns.map((concern, i) => (
                        <div
                          key={i}
                          className="m-1 rounded-[16px] bg-[#D9F0FF] px-3 py-1 text-xs font-bold"
                        >
                          {concern}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div className="mt-[16px] w-full">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <SaveButton disabled={!form.formState.isValid} />
                </form>
              </div>
            </Form>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}

function SaveButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      variant="lg"
      className="h-[48px] w-full md:h-[55px]"
      disabled={pending || disabled}
    >
      {pending ? <LoadingSpinner /> : '保存'}
    </Button>
  );
}

function AvatarUpload({ account }: { account: User }) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageFormButtonRef = useRef<HTMLButtonElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      imageFormButtonRef.current?.click();
    }
  };

  return (
    <>
      <button className="relative h-[100px] w-[100px]" onClick={handleImageClick} type="button">
        <Image
          src={
            avatar
              ? URL.createObjectURL(avatar)
              : account.avatar?.url || '/placeholder-product-image.png'
          }
          className="rounded-[100px]"
          fill
          alt={''}
        />
      </button>
      <RoundedWhiteCamera className="absolute bottom-0 right-0" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        name="file"
      />
      <button ref={imageFormButtonRef} type="submit" className="hidden" />
    </>
  );
}
