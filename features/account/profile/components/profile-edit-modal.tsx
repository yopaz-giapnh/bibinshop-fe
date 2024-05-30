'use client';

/**
 * ユーザープロフィール編集モーダル
 * @returns JSX.Element
 */
import RoundedWhiteCamera from '@/assets/round_white_camera.svg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { PencilRuler } from 'lucide-react';
import Image from 'next/image';

export default function ProfileEditModal() {
  // TODO: ユーザー情報を取得するAPIを叩いてデータを取得する(profile-detailからpropsで受け取る？)

  return (
    <Dialog>
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
        <DialogContent className="flex w-[640px] flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>プロフィール編集</DialogTitle>
          </DialogHeader>
          <div className="relative flex">
            {/* TODO: 写真をアップロードできるようにする */}
            <Image
              src={'/yamada_yuka_demo.png'}
              width={100}
              height={100}
              className="rounded-[100px]"
              alt={''}
            />
            <RoundedWhiteCamera className="absolute bottom-0 right-0" />
          </div>
          <div className="w-full">
            <Typography as="bold" element="p" className="mb-[8px] text-[14px] text-black-90">
              名前
            </Typography>
            <Input defaultValue="yamada_yuka183" />
          </div>
          <div className="w-full">
            <Typography as="bold" element="p" className="mb-[8px] text-[14px] text-black-90">
              性別
            </Typography>
            <RadioGroup defaultValue="female" className="mt-[4px] flex">
              <div className="mr-[40px] flex items-center">
                <RadioGroupItem value="female" id="r1" className=" focus" />
                <Typography as="xSmall" element="p" className="ml-[8px] text-[14px] text-black-90">
                  女性
                </Typography>
              </div>
              <div className="mr-[40px] flex items-center">
                <RadioGroupItem value="male" id="r2" />
                <Typography as="xSmall" element="p" className="ml-[8px] text-[14px] text-black-90">
                  男性
                </Typography>
              </div>
              <div className="mr-[40px] flex items-center">
                <RadioGroupItem value="other" id="r3" />
                <Typography as="xSmall" element="p" className="ml-[8px] text-[14px] text-black-90">
                  その他
                </Typography>
              </div>
            </RadioGroup>
          </div>
          <div className="w-full">
            <DialogClose asChild>
              {/* TODO: ユーザー情報を更新するAPIを叩く*/}
              <Button type="submit" size="lg" variant="lg" className="w-full">
                保存
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
