'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import {
  hairConcerns as hairConcernOptions,
  healthConcerns as healthConcernOptions
} from '@/features/sns/constants';
import { HairConcern, HealthConcern } from '@/features/sns/utils';
import { ChevronLeft } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goToBack: () => void;
  goToNext: () => void;
  setHairConcerns: Dispatch<SetStateAction<HairConcern[]>>;
  setHealthConcerns: Dispatch<SetStateAction<HealthConcern[]>>;
  hairConcerns: HairConcern[];
  healthConcerns: HealthConcern[];
};

const ProfileFormHairModal = ({
  isOpen,
  setIsOpen,
  goToBack,
  goToNext,
  setHairConcerns,
  setHealthConcerns,
  hairConcerns,
  healthConcerns
}: Props) => {
  const toggleHair = (item: HairConcern) => {
    setHairConcerns((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleHealth = (item: HealthConcern) => {
    setHealthConcerns((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="p-4">
        <DialogContent
          hideCloseButton
          className="mx-auto h-[90%] max-h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-[640px] overflow-y-auto rounded-lg bg-white-base p-4 shadow-md sm:p-6 md:h-fit"
        >
          <div className="w-full">
            <button className="flex items-center text-gray-500" onClick={goToBack}>
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="ml-2 text-sm font-bold">戻る</span>
            </button>
          </div>

          <div className="my-4 flex w-full flex-col items-center gap-4 sm:gap-6">
            <h2 className="w-full text-center text-lg font-bold sm:text-xl">
              頭皮・毛髪の悩み、健康の悩み
            </h2>

            <div className="w-full">
              <p className="mb-2 text-sm font-bold text-gray-800">
                頭皮・毛髪の悩みを教えてください
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {hairConcernOptions.map((item) => (
                  <button
                    key={item.value[0]}
                    onClick={() => toggleHair(item.value)}
                    className={`rounded-md px-2 py-2 text-xs sm:py-3 sm:text-sm ${
                      hairConcerns.includes(item.value)
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] font-bold text-[#51B7FF]'
                        : 'border border-gray-200  text-gray-900'
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-sm font-bold text-gray-800">健康の悩みを教えてください</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {healthConcernOptions.map((concern) => (
                  <button
                    key={concern.value[0]}
                    onClick={() => toggleHealth(concern.value)}
                    className={`rounded-md px-2 py-2 text-xs sm:py-3 sm:text-sm ${
                      healthConcerns.includes(concern.value)
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] font-bold text-[#51B7FF]'
                        : 'border border-gray-200  text-gray-900'
                    }`}
                  >
                    {concern.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="h-12 w-full max-w-[392px] rounded-full bg-gradient-to-r from-[#51B7FF] to-[#5CE686] text-sm font-bold sm:h-[56px] sm:text-base"
              onClick={goToNext}
            >
              <Typography className="text-white-base" element="p">
                次へ
              </Typography>
            </button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default ProfileFormHairModal;
