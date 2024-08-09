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
import { toast } from '@/components/ui/use-toast';
import { Concerns } from '@/features/sns/constants';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType
} from '@/features/sns/utils';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, PencilRuler } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm, useFormState } from 'react-hook-form';
import { deleteSocialLink, updateAccount, updateProfile, updateSocialLink, uploadAvatar } from '../actions';
import { FormValues, User, UserSex, formSchema } from '../types';
import { isUserSex } from '../utils';
import ProfileFormHairModal from './profile-form-hair-modal';
import ProfileFormModal from './profile-form-modal';

type Props = {
  account: User;
  concerns?: Concerns;
  skinTags: string[];
  hairTags: string[];
};

export default function ProfileEditModal({ account, skinTags, hairTags, concerns }: Props) {
  const { nickname, sex } = account.attributes;
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [openProfileFormHairModal, setOpenProfileFormHairModal] = useState(false);
  const [openProfileFormModal, setOpenProfileFormModal] = useState(false);
  const [selectedSex, setSelectedSex] = useState<UserSex>(sex);
  const [skinType, setSkinType] = useState<SkinType | undefined>(concerns?.skinType);
  const [personalColor, setPersonalColor] = useState<PersonalColor | undefined>(
    concerns?.personalColor
  );
  const [skinConcerns, setSkinConcerns] = useState<SkinConcern>(concerns?.skinConcerns || []);
  const [hairConcerns, setHairConcerns] = useState<HairConcern>(concerns?.hairConcerns || []);
  const [healthConcerns, setHealthConcerns] = useState<HealthConcern>(
    concerns?.healthConcerns || []
  );
  const [birthyear, setBirthyear] = useState<number | undefined>(concerns?.birthyear);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname || '',
      birthyear: concerns?.birthyear?.toString() || ''
    },
    mode: 'onBlur'
  });

  const resetForm = useCallback(() => {
    form.reset({
      nickname: nickname || '',
      sex: selectedSex,
      instagram: socialLinks.instagram || '',
      x: socialLinks.x || '',
      birthyear: birthyear?.toString() || '',
      facebook: socialLinks.facebook || ''
    });
  }, [form, nickname, selectedSex, socialLinks, birthyear]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    const links: Record<string, string> = {};
    account.socialLinks?.forEach((link) => {
      if (link && link.attributes && link.attributes.platform) {
        links[link?.attributes?.platform?.toLowerCase()] = link.attributes.url ?? '';
      }
    });
    setSocialLinks(links);
    form.setValue('instagram', links.instagram || '');
    form.setValue('x', links.x || '');
    form.setValue('facebook', links.facebook || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.socialLinks]);

  const handleSubmit = async (formData: FormValues) => {
    const accountUpdateResult = await updateAccount(null, formData);
    const profileUpdateResult = await updateProfile(null, {
      birthyear: birthyear,
      skin_type: skinType,
      personal_color: personalColor,
      health_concerns: healthConcerns,
      scalp_hair_concerns: hairConcerns,
      skin_concerns: skinConcerns
    });
    if (accountUpdateResult.success && profileUpdateResult.success) {
      if (formData.instagram) {
        updateSocialLink(formData.instagram, 'INSTAGRAM');
      } else {
        account.socialLinks?.forEach(async (link) => {
          if (link && link.id && link.attributes && link.attributes.platform === 'INSTAGRAM') {
            await deleteSocialLink(link.id);
          }
        });
      }
      if (formData.x) {
        await updateSocialLink(formData.x, 'X');
      } else {
        account.socialLinks?.forEach(async (link) => {
          if (link && link.id && link.attributes && link.attributes.platform === 'X') {
            await deleteSocialLink(link.id);
          }
        });
      }
      if (formData.facebook) {
        await updateSocialLink(formData.facebook, 'FACEBOOK');
      } else {
        account.socialLinks?.forEach(async (link) => {
          if (link && link.id && link.attributes && link.attributes.platform === 'FACEBOOK') {
            await deleteSocialLink(link.id);
          }
        });
      }

      setIsOpen(false);
      resetForm();
      toast({
        title: 'プロフィールを更新しました',
        icon: <Check className="h-6 w-6" />
      });
    }
  };

  // URLからクエリパラメータを除去する関数
  const removeQueryParams = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.origin}${parsedUrl.pathname}`;
    } catch (error) {
      // URLのパースに失敗した場合は元の文字列をそのまま返す
      return url;
    }
  };

  const Tag = ({ text }: { text: string }) => (
    <Typography
      as="small"
      element="p"
      className="mr-2 mt-2 rounded-full bg-blue-200 px-2 py-1 text-sm"
    >
      {text}
    </Typography>
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
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
          <DialogContent className="flex h-[calc(150vw-80px)] w-full flex-col items-center justify-center overflow-y-auto md:h-modal-screen-calc md:w-[640px]">
            <div className="flex max-h-[80vh] w-full flex-col items-center overflow-y-auto px-1">
              <DialogHeader>
                <DialogTitle className="text-[16px] md:text-[20px]">プロフィール編集</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                {/* プロフィール写真 */}
                <form className="relative mt-[16px] flex" action={uploadAvatar}>
                  <AvatarUpload account={account} />
                </form>

                {/* ニックネーム */}
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>名前</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="username"
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger('nickname');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 性別 */}
                <div className="mt-[16px] w-full">
                  <Typography as="bold" element="p" className="mb-[8px] text-[14px] text-black-90">
                    性別
                  </Typography>
                  <RadioGroup
                    value={selectedSex}
                    onValueChange={(value) => {
                      if (isUserSex(value)) {
                        setSelectedSex(value);
                        form.setValue('sex', value);
                        form.trigger('sex');
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

                {/* 生まれた年 */}
                <div className="mt-[16px] w-full">
                  <FormField
                    control={form.control}
                    name="birthyear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>生まれた年</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                              field.onChange(value);
                              setBirthyear(value ? parseInt(value, 10) : undefined);
                            }}
                            onBlur={() => {
                              field.onBlur();
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Instagram URL */}
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
                            defaultValue={socialLinks.instagram}
                            // HACK: インスタの共有リンクはデフォルトでクエリパラメータがついてるためクエリを削除する処理を追加した
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              const cleanedValue = rawValue ? removeQueryParams(rawValue) : '';
                              form.setValue('instagram', cleanedValue);
                              form.trigger('instagram');
                            }}
                            onBlur={(e) => {
                              const rawValue = e.target.value;
                              const cleanedValue = rawValue ? removeQueryParams(rawValue) : '';
                              e.target.value = cleanedValue;
                              field.onBlur();
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* X URL */}
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
                            defaultValue={socialLinks.x}
                            onChange={(e) => {
                              form.setValue('x', e.target.value);
                              form.trigger('x');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Facebook URL */}
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
                            defaultValue={socialLinks.facebook}
                            onChange={(e) => {
                              form.setValue('facebook', e.target.value);
                              form.trigger('facebook');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 肌の悩み */}
                <div className="mt-[16px] w-full">
                  <div className="flex h-[24px] items-center">
                    <Typography as="bold" element="p" className="text-[14px] text-black-90">
                      肌の悩み
                    </Typography>
                    <div
                      className="flex items-center"
                      onClick={() => setOpenProfileFormModal(true)}
                    >
                      <PencilSquareIcon className="ml-2" width={24} height={24} color="#51B7FF" />
                      <Typography className="text-bibinBlue-100" element="p">
                        編集
                      </Typography>
                    </div>
                  </div>
                  <div className="mx-[8px] mb-4 flex max-w-screen-sm flex-wrap md:mx-0">
                    {skinTags.map((tag, index) => (
                      <Tag key={index} text={tag} />
                    ))}
                  </div>
                </div>

                {/* 頭皮・毛髪の悩み、健康の悩み */}
                <div className="mt-[16px] w-full">
                  <div className="mt-[16px] w-full">
                    <div className="flex h-[24px] items-center">
                      <Typography as="bold" element="p" className="text-[14px] text-black-90">
                        頭皮・毛髪の悩み、健康の悩み
                      </Typography>
                      <div
                        className="flex items-center"
                        onClick={() => setOpenProfileFormHairModal(true)}
                      >
                        <PencilSquareIcon className="ml-2" width={24} height={24} color="#51B7FF" />
                        <Typography className="text-bibinBlue-100" element="p">
                          編集
                        </Typography>
                      </div>
                    </div>
                    <div className="mx-[8px] mb-4 flex max-w-screen-sm flex-wrap md:mx-0">
                      {hairTags.map((tag, index) => (
                        <Tag key={index} text={tag} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-[16px] w-full">
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <SaveButton />
                  </form>
                </div>
              </Form>
            </div>
          </DialogContent>
        </DialogDescription>
      </Dialog>
      <ProfileFormModal
        isOpen={openProfileFormModal}
        setIsOpen={setOpenProfileFormModal}
        isProfileEdit
        setSkinType={setSkinType}
        setPersonalColor={setPersonalColor}
        setSkinConcerns={setSkinConcerns}
        skinType={skinType}
        personalColor={personalColor}
        skinConcerns={skinConcerns}
        nextTo={() => {
          setOpenProfileFormModal(false);
        }}
        hairConcerns={hairConcerns}
        healthConcerns={healthConcerns}
        concerns={concerns}
      />
      <ProfileFormHairModal
        isOpen={openProfileFormHairModal}
        setIsOpen={setOpenProfileFormHairModal}
        goToBack={() => {
          setOpenProfileFormHairModal(false);
        }}
        goToNext={() => {
          setOpenProfileFormHairModal(false);
        }}
        setHairConcerns={setHairConcerns}
        hairConcerns={hairConcerns}
        setHealthConcerns={setHealthConcerns}
        healthConcerns={healthConcerns}
        skinType={skinType}
        personalColor={personalColor}
        skinConcerns={skinConcerns}
        isProfileEdit
        concerns={concerns}
      />
    </>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  const formState = useFormState();

  return (
    <Button
      type="submit"
      size="lg"
      variant="lg"
      className="h-[48px] w-full md:h-[55px]"
      disabled={pending || Object.keys(formState.errors).length > 0}
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
        accept="image/"
        className="hidden"
        name="file"
      />
      <button ref={imageFormButtonRef} type="submit" className="hidden" />
    </>
  );
}
