'use client';
import { Typography } from '@/components/ui/typography';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProfileFormBirthdayModal = () => {
  const [selectedGender, setSelectedGender] = useState('女性');
  const [birthYear, setBirthYear] = useState('');
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  useEffect(() => {
    setIsNextButtonActive(birthYear.trim() !== '');
  }, [birthYear]);

  const handleNextClick = () => {
    if (isNextButtonActive) {
      // ここに次へ進む処理を記述
      console.log('Next button clicked');
    }
  };

  return (
    <div className="bg-white flex h-[420px] w-[640px] flex-col items-center justify-between rounded-md p-6 shadow-md">
      <div className="w-full">
        <button className="flex items-center text-gray-500">
          <ArrowLeft size={20} />
          <span className="ml-2 text-sm font-bold">戻る</span>
        </button>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <h2 className="w-full text-center text-xl font-bold">性別・生まれた年</h2>
        <p className="text-center text-sm text-gray-600">
          性別・年齢に合わせた製品をおすすめします
        </p>
        <div className="w-full">
          <p className="mb-2 text-sm font-bold text-gray-800">性別に合わせた製品をおすすめします</p>
          <div className="flex gap-2">
            {['女性', '男性', 'その他'].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`flex h-16 w-[142px] items-center rounded-md text-sm ${
                  selectedGender === gender
                    ? 'border-2 border-blue-500 bg-blue-100 font-bold text-blue-500'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <div className="flex w-full items-center">
                  <div
                    className={`ml-4 mr-3 h-5 w-5 rounded-full border-2 ${
                      selectedGender === gender ? 'border-blue-500' : 'border-gray-400'
                    } flex flex-shrink-0 items-center justify-center`}
                  >
                    {selectedGender === gender && (
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span>{gender}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2 text-sm font-bold text-gray-800">生まれた年を教えてください</p>
          <input
            type="number"
            placeholder="例：2000"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="w-full rounded-md border border-gray-200 p-4 text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleNextClick}
        className={`h-[56px] w-full max-w-[392px] rounded-full text-base font-bold ${
          isNextButtonActive
            ? 'cursor-pointer bg-gradient-to-r from-[#51B7FF] to-[#5CE686]'
            : 'cursor-not-allowed bg-gray-300'
        }`}
        disabled={!isNextButtonActive}
      >
        <Typography element="p" className="text-white-base">
          次へ
        </Typography>
      </button>
    </div>
  );
};

export default ProfileFormBirthdayModal;
