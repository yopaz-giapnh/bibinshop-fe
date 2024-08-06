'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
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
import { ChevronLeft } from 'lucide-react';
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
      console.error('Error updating profile:', error);
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
                className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
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
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {personalColors.map((color) => (
                  <div key={color.value}>
                    {color.color && (
                      <label
                        key={color.value}
                        className={`cursor-pointer rounded-lg p-4 text-left ${
                          personalColor === color.value
                            ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex">
                          <div className="mr-2 flex flex-1 items-center justify-center">
                            <RadioGroupItem value={color.value} id={color.value} className="" />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            {color.color && (
                              <>
                                <div className="flex flex-col items-center justify-center">
                                  <div
                                    className={`h-12 w-12 rounded-full bg-[${color.color}] border border-gray-300`}
                                  />
                                  <span
                                    className={`mt-2 text-sm font-bold ${personalColor === color.value ? 'text-[#51B7FF]' : 'text-black'}`}
                                  >
                                    {color.name}
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="mt-2 text-center">
                              <p className="text-xs leading-tight">{color.description}</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <div
                className={`mt-2 cursor-pointer rounded-lg p-4 text-left ${
                  personalColor === personalColors[4].value
                    ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <label key={personalColors[4].value} className="flex flex-row">
                  <div className="flex-1">
                    <RadioGroupItem
                      value={personalColors[4].value}
                      id={personalColors[4].value}
                      className=""
                    />
                  </div>
                  <div className="flex flex-grow items-center ">
                    <p className="text-xs">{personalColors[4].description}</p>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">肌の悩みを教えてください</h3>
            <div className="flex flex-wrap gap-1">
              {skinConcernOptions.map((concern) => (
                <button
                  key={concern.value[0]}
                  className={`w-[142px] rounded-[6px] px-4 py-4 text-sm ${
                    skinConcerns.some((c) => c.includes(concern.value[0]))
                      ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                  onClick={() => {
                    if (skinConcerns.some((c) => c.includes(concern.value[0]))) {
                      setSkinConcerns(skinConcerns.filter((c) => !c.includes(concern.value[0])));
                    } else {
                      setSkinConcerns([...skinConcerns, concern.value[0]]);
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
