'use client';

import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { ChevronLeft } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goToBack: () => void;
  goToNext: () => void;
  birthYear: number | undefined;
  setBirthYear: Dispatch<SetStateAction<number | undefined>>;
};

const ProfileFormBirthdayModal = ({
  isOpen,
  setIsOpen,
  goToBack,
  goToNext,
  birthYear,
  setBirthYear
}: Props) => {
  const [selectedGender, setSelectedGender] = useState('女性');
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  useEffect(() => {
    setIsNextButtonActive(birthYear !== undefined);
  }, [birthYear]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="p-4">
        <DialogContent
          hideCloseButton
          className="mx-auto flex min-h-[460px] w-[calc(100vw-32px)] max-w-[640px] flex-col items-center justify-between rounded-md bg-white-base p-4 shadow-md sm:w-full sm:p-6"
        >
          <div className="w-full">
            <button className="flex items-center text-gray-500" onClick={goToBack}>
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="ml-2 text-sm font-bold">戻る</span>
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <h2 className="w-full text-center text-xl font-bold">性別・生まれた年</h2>
            <p className="text-center text-sm text-gray-600">
              性別・年齢に合わせた製品をおすすめします
            </p>
            <div className="w-full">
              <p className="mb-2 text-sm font-bold text-gray-800">
                性別に合わせた製品をおすすめします
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex w-full gap-2">
                  {['女性', '男性'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`flex h-16 flex-1 items-center rounded-md text-sm ${
                        selectedGender === gender
                          ? 'border-2 border-[#51B7FF] bg-blue-100 font-bold text-[#51B7FF]'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="flex w-full items-center">
                        <div
                          className={`ml-4 mr-3 h-5 w-5 rounded-full border-2 ${
                            selectedGender === gender ? 'border-[#51B7FF]' : 'border-gray-400'
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
                <button
                  onClick={() => setSelectedGender('その他')}
                  className={`flex h-16 w-full items-center rounded-md text-sm ${
                    selectedGender === 'その他'
                      ? 'border-2 border-[#51B7FF] bg-blue-100 font-bold text-[#51B7FF]'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex w-full items-center">
                    <div
                      className={`ml-4 mr-3 h-5 w-5 rounded-full border-2 ${
                        selectedGender === 'その他' ? 'border-[#51B7FF]' : 'border-gray-400'
                      } flex flex-shrink-0 items-center justify-center`}
                    >
                      {selectedGender === 'その他' && (
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <span>その他</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="w-full">
              <p className="mb-2 text-sm font-bold text-gray-800">生まれた年を教えてください</p>
              <input
                type="number"
                placeholder="例：2000"
                value={birthYear}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.length <= 4) {
                    setBirthYear(Number(inputValue));
                  }
                }}
                className="w-full rounded-md border border-gray-200 p-4 text-sm"
                maxLength={4}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center">
            <button
              onClick={goToNext}
              className={`h-12 w-full max-w-[392px] rounded-full text-sm font-bold sm:h-[56px] sm:text-base ${
                isNextButtonActive
                  ? 'cursor-pointer bg-gradient-to-r from-[#51B7FF] to-[#5CE686] '
                  : 'cursor-not-allowed bg-gray-300'
              }`}
              disabled={!isNextButtonActive}
            >
              <Typography element="span" className="font-bold text-white-base">
                次へ
              </Typography>
            </button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default ProfileFormBirthdayModal;
