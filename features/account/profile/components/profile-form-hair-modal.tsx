'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { ChevronLeft } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goToBack: () => void;
  goToNext: () => void;
};

const ProfileFormHairModal = ({ isOpen, setIsOpen, goToBack, goToNext }: Props) => {
  const [selectedHairConcerns, setSelectedHairConcerns] = useState<string[]>([]);
  const [selectedHealthConcerns, setSelectedHealthConcerns] = useState<string[]>([]);

  const hairConcerns = ['フケ・カユミ', 'ダメージヘア', '頭皮トラブル', '抜け毛'];
  const healthConcerns = [
    '肩の痛み',
    '腰痛',
    '筋力低下',
    '体の歪み',
    'コレステロール・中性脂肪',
    '冷え性',
    '筋肉痛',
    '関節痛',
    '女性の悩み',
    '血流循環',
    '肩こり',
    '疲労・倦怠感',
    '血圧',
    '生活習慣病'
  ];

  const toggleHair = (item: string) => {
    setSelectedHairConcerns((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleHealth = (item: string) => {
    setSelectedHealthConcerns((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="p-4">
        <DialogContent
          hideCloseButton
          className="mx-auto flex min-h-[600px] w-[calc(100vw-32px)] max-w-[640px] flex-col items-center justify-between rounded-md bg-white-base p-4 shadow-md sm:w-full sm:p-6"
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
                {hairConcerns.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleHair(item)}
                    className={`rounded-md px-2 py-2 text-xs sm:py-3 sm:text-sm ${
                      selectedHairConcerns.includes(item)
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] font-bold text-[#51B7FF]'
                        : 'border border-gray-200  text-gray-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-sm font-bold text-gray-800">健康の悩みを教えてください</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {healthConcerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => toggleHealth(concern)}
                    className={`rounded-md px-2 py-2 text-xs sm:py-3 sm:text-sm ${
                      selectedHealthConcerns.includes(concern)
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] font-bold text-[#51B7FF]'
                        : 'border border-gray-200  text-gray-900'
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            className="h-12 w-full max-w-[392px] rounded-full bg-gradient-to-r from-[#51B7FF] to-[#5CE686] text-sm font-bold sm:h-[56px] sm:text-base"
            onClick={goToNext}
          >
            <Typography className="text-white-base" element="p">
              次へ
            </Typography>
          </button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default ProfileFormHairModal;
