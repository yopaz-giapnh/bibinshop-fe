'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { createUserProfile, updateUserProfile } from '@/features/sns/actions';
import {
  Concerns,
  colors,
  skinConcerns as skinConcernOptions,
  skinTypes
} from '@/features/sns/constants';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType
} from '@/features/sns/utils';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { BadgeAlert, ChevronLeft } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  nextTo: () => void;
  setSkinType: Dispatch<SetStateAction<SkinType | undefined>>;
  setPersonalColor: Dispatch<SetStateAction<PersonalColor | undefined>>;
  setSkinConcerns: Dispatch<SetStateAction<SkinConcern>>;
  skinType: SkinType | undefined;
  personalColor: PersonalColor | undefined;
  skinConcerns: SkinConcern;
  hairConcerns: HairConcern;
  healthConcerns: HealthConcern;
  isProfileEdit?: boolean;
  concerns: Concerns | undefined;
};

const ProfileFormModal = ({
  isOpen,
  setIsOpen,
  nextTo,
  setSkinType,
  setPersonalColor,
  setSkinConcerns,
  skinType,
  personalColor,
  skinConcerns,
  isProfileEdit,
  hairConcerns,
  healthConcerns,
  concerns
}: Props) => {
  const { toast } = useToast();

  const personalColors = [
    ...colors,
    { name: '', description: 'よくわかりません', color: '', value: 'UNKNOWN' }
  ];

  const handleUpdateProfile = async () => {
    const userProfile = {
      user_profile: {
        skin_type: skinType,
        personal_color: personalColor,
        skin_concerns: skinConcerns.flat(),
        scalp_hair_concerns: hairConcerns.flat(),
        health_concerns: healthConcerns.flat()
      }
    };

    try {
      if (concerns) {
        await updateUserProfile(userProfile);
      } else {
        await createUserProfile(userProfile);
      }
    } catch (error) {
      toast({
        title: 'プロフィールの更新中にエラーが発生しました。後でもう一度お試しください。',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="p-4">
        <DialogContent
          hideCloseButton
          className="mx-auto h-[90%] max-h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-[640px] overflow-y-auto rounded-lg bg-white-base p-4 shadow-md sm:p-6"
        >
          {isProfileEdit && (
            <div className="w-full">
              <button
                className="flex items-center text-gray-500"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="ml-2 text-sm font-bold">戻る</span>
              </button>
            </div>
          )}
          <h2 className="mb-2 text-center text-xl font-bold">肌質を入力する</h2>
          {!isProfileEdit && (
            <p className="mb-6 text-center text-sm">
              登録が完了しました！肌質を入力すると、肌質に合った商品をおすすめできます！
            </p>
          )}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">どんな肌タイプですか？</h3>
            <div className="flex flex-wrap gap-2">
              <RadioGroup
                value={skinType}
                onValueChange={(v) => {
                  setSkinType(v as SkinType);
                }}
                className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              >
                {skinTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex cursor-pointer items-center rounded-[6px] px-4 py-4 text-sm ${
                      skinType === type.value
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                        : 'bg-white text-black border border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value={type.value} id={type.value} className="focus mr-2" />
                    {type.text}
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">パーソナルカラーを教えてください</h3>
            <RadioGroup
              value={personalColor}
              onValueChange={(v) => {
                setPersonalColor(v as PersonalColor);
              }}
              className="space-y-2"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {personalColors.slice(0, -1).map((color) => (
                  <label
                    key={color.value}
                    className={`flex cursor-pointer items-center rounded-lg p-4 ${
                      personalColor === color.value
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value={color.value} id={color.value} className="mr-4" />
                    <div className="flex flex-1 items-center">
                      <div
                        style={{ backgroundColor: color.color }}
                        className={`mr-4 h-12 w-12 rounded-full border border-gray-300`}
                      />
                      <div className="w-2/3">
                        <span
                          className={`text-sm font-bold ${
                            personalColor === color.value ? 'text-[#51B7FF]' : 'text-black'
                          }`}
                        >
                          {color.name}
                        </span>
                        <p className="mt-1 text-xs leading-tight">{color.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <label
                className={`flex cursor-pointer items-center rounded-lg p-4 ${
                  personalColor === personalColors[personalColors.length - 1].value
                    ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <RadioGroupItem
                  value={personalColors[personalColors.length - 1].value}
                  id={personalColors[personalColors.length - 1].value}
                  className="mr-4"
                />
                <span className="text-sm">
                  {personalColors[personalColors.length - 1].description}
                </span>
              </label>
            </RadioGroup>
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">肌の悩みを教えてください</h3>
            <div className="grid w-full grid-cols-2 flex-wrap gap-1 gap-2 md:grid-cols-4">
              {skinConcernOptions.map((concern) => (
                <button
                  key={concern.value[0]}
                  className={`w-full rounded-[6px] px-4 py-4 text-sm ${
                    skinConcerns.some((c) => c.includes(concern.value[0]))
                      ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                  onClick={() => {
                    if (concern.value[0] === 'NONE') {
                      setSkinConcerns([concern.value[0]]);
                    } else if (skinConcerns.some((c) => c.includes(concern.value[0]))) {
                      setSkinConcerns((prev) =>
                        prev.filter((c) => c !== 'NONE' && !c.includes(concern.value[0]))
                      );
                    } else {
                      setSkinConcerns((prev) => [
                        ...prev.filter((c) => c !== 'NONE'),
                        concern.value[0]
                      ]);
                    }
                  }}
                >
                  {concern.text}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="h-12 w-full max-w-[392px] rounded-full bg-gradient-to-r from-[#51B7FF] to-[#5CE686] text-sm font-bold sm:h-[56px] sm:text-base"
              onClick={() => {
                setIsOpen(false);
                {
                  !isProfileEdit ? nextTo() : handleUpdateProfile();
                }
              }}
            >
              <Typography element="span" className="font-bold text-white-base">
                {isProfileEdit ? '保存' : '次へ'}
              </Typography>
            </button>
            {!isProfileEdit && (
              <button
                className="w-full py-2 font-bold text-[#51B7FF]"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                あとで登録
              </button>
            )}
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default ProfileFormModal;
