import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { updateUserProfile } from '@/features/sns/actions';
import {
  hairConcerns as hairConcernOptions,
  healthConcerns as healthConcernOptions
} from '@/features/sns/constants';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType
} from '@/features/sns/utils';
import { ChevronLeft } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goToBack: () => void;
  goToNext: () => void;
  setHairConcerns: Dispatch<SetStateAction<HairConcern[]>>;
  setHealthConcerns: Dispatch<SetStateAction<HealthConcern[]>>;
  hairConcerns: HairConcern[];
  healthConcerns: HealthConcern[];
  skinType: SkinType | undefined;
  personalColor: PersonalColor | undefined;
  skinConcerns: SkinConcern[];
  isProfileEdit?: boolean;
};

const ProfileFormHairModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  goToBack,
  goToNext,
  setHairConcerns,
  setHealthConcerns,
  hairConcerns,
  healthConcerns,
  skinType,
  personalColor,
  skinConcerns,
  isProfileEdit
}) => {
  const handleUpdateProfile = async () => {
    const skinConcernsFlat = skinConcerns.flat();
    const hairConcernsFlat = hairConcerns.flat();
    const healthConcernsFlat = healthConcerns.flat();

    try {
      await updateUserProfile({
        user_profile: {
          skin_type: skinType,
          personal_color: personalColor,
          skin_concerns: skinConcernsFlat,
          scalp_hair_concerns: hairConcernsFlat,
          health_concerns: healthConcernsFlat
        }
      });
      setIsOpen(false);
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
          <div className="w-full">
            <button className="flex items-center text-gray-500" onClick={goToBack}>
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="ml-2 text-sm font-bold">戻る</span>
            </button>
          </div>

          <h2 className="mb-6 text-center text-xl font-bold">頭皮・毛髪の悩み、健康の悩み</h2>
          {!isProfileEdit && (
            <p className="mb-6 text-center text-sm">
              あなたの悩みに合った商品をおすすめするために、以下の質問にお答えください。
            </p>
          )}

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">頭皮・毛髪の悩みを教えてください</h3>
            <div className="flex flex-wrap gap-2">
              {hairConcernOptions.map((concern) => (
                <button
                  key={concern.value[0]}
                  className={`rounded-[6px] px-4 py-4 text-sm ${
                    hairConcerns.includes(concern.value)
                      ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                  onClick={() => {
                    if (hairConcerns.includes(concern.value)) {
                      setHairConcerns(hairConcerns.filter((c) => c !== concern.value));
                    } else {
                      setHairConcerns([...hairConcerns, concern.value]);
                    }
                  }}
                >
                  {concern.text}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">健康の悩みを教えてください</h3>
            <div className="flex flex-wrap gap-2">
              {healthConcernOptions.map((concern) => (
                <button
                  key={concern.value[0]}
                  className={`rounded-[6px] px-4 py-4 text-sm ${
                    healthConcerns.includes(concern.value)
                      ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                  onClick={() => {
                    if (healthConcerns.includes(concern.value)) {
                      setHealthConcerns(healthConcerns.filter((c) => c !== concern.value));
                    } else {
                      setHealthConcerns([...healthConcerns, concern.value]);
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
                isProfileEdit ? handleUpdateProfile() : goToNext();
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

export default ProfileFormHairModal;
