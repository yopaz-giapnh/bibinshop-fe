'use client';
import { Typography } from '@/components/ui/typography';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const ProfileFormHairModal = () => {
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
    <div className="bg-white mx-auto flex min-h-[600px] w-full max-w-[640px] flex-col items-center justify-between rounded-md p-4 shadow-md sm:p-6">
      <div className="w-full">
        <button className="flex items-center text-gray-500">
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="ml-2 text-sm font-bold">戻る</span>
        </button>
      </div>

      <div className="my-4 flex w-full flex-col items-center gap-4 sm:gap-6">
        <h2 className="w-full text-center text-lg font-bold sm:text-xl">
          頭皮・毛髪の悩み、健康の悩み
        </h2>

        <div className="w-full">
          <p className="mb-2 text-sm font-bold text-gray-800">頭皮・毛髪の悩みを教えてください</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {hairConcerns.map((item) => (
              <button
                key={item}
                onClick={() => toggleHair(item)}
                className={`rounded-md px-2 py-2 text-xs sm:py-3 sm:text-sm ${
                  selectedHairConcerns.includes(item)
                    ? 'border-2 border-blue-500 bg-blue-100 font-bold text-blue-500'
                    : 'border border-gray-200 bg-gray-100 text-gray-900'
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
                    ? 'border-2 border-blue-500 bg-blue-100 font-bold text-blue-500'
                    : 'border border-gray-200 bg-gray-100 text-gray-900'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="h-12 w-full max-w-[392px] rounded-full bg-gradient-to-r from-[#51B7FF] to-[#5CE686] text-sm font-bold sm:h-[56px] sm:text-base">
        <Typography className="text-white-base" element="p">
          次へ
        </Typography>
      </button>
    </div>
  );
};

export default ProfileFormHairModal;
