'use client';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Typography } from '@/components/ui/typography';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  nextTo: () => void;
};

const ProfileFormModal = ({ isOpen, setIsOpen, nextTo }: Props) => {
  const [skinType, setSkinType] = useState('普通肌');
  const [personalColor, setPersonalColor] = useState('イエベ春タイプ');
  const [skinConcerns, setSkinConcerns] = useState(['アトピー']);

  const skinTypes = ['普通肌', '脂性肌', '乾燥肌', '混合肌'];
  const personalColors = [
    {
      name: 'イエベ春タイプ',
      description: '白い人は明るいアイボリーベージュ、日に焼けている人は明るい小麦色肌',
      color: 'bg-[#F7D4C0]'
    },
    {
      name: 'ブルベ夏タイプ',
      description: '色の白い人はピンクベージュ、日焼けている人はソフトな健康肌',
      color: 'bg-[#FFE0D8]'
    },
    {
      name: 'イエベ秋タイプ',
      description:
        '白い人は黄味がかったベージュまたは蜂蜜のような色味、日焼けしている人は琥珀色の小麦色の方',
      color: 'bg-[#FCE6CE]'
    },
    {
      name: 'ブルベ冬タイプ',
      description: '色の白い人はピンクの中の白、日焼けている人は赤味がない澄んだ肌色',
      color: 'bg-[#FDEFEC]'
    },
    {
      name: '',
      description: 'よくわかりません',
      color: ''
    }
  ];
  const skinConcernOptions = [
    'アトピー',
    'ニキビ',
    '敏感肌',
    '美白/シミ',
    '毛穴',
    '皮脂/ブラックヘッド',
    'クマ',
    '乾燥肌',
    'シワ/弾力',
    '赤み',
    '角質',
    '該当なし'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="p-4">
        <DialogContent
          hideCloseButton
          className="mx-auto max-h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-[640px] overflow-y-auto rounded-lg bg-white-base p-4 shadow-md sm:p-6"
        >
          <h2 className="mb-2 text-center text-xl font-bold">肌質を入力する</h2>
          <p className="mb-6 text-center text-sm">
            登録が完了しました！肌質を入力すると、肌質に合った商品をおすすめできます！
          </p>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold opacity-80">どんな肌タイプですか？</h3>
            <div className="flex flex-wrap gap-2">
              <RadioGroup
                value={skinType}
                onValueChange={(v) => {
                  setSkinType(v);
                }}
                className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              >
                {skinTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex cursor-pointer items-center rounded-[6px] px-4 py-4 text-sm ${
                      skinType === type
                        ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                        : 'bg-white text-black border border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value={type} id={type} className="focus mr-2" />
                    {type}
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
                setPersonalColor(v);
              }}
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {personalColors.map((color) => (
                  <>
                    {color.color && (
                      <label
                        key={color.name}
                        className={`cursor-pointer rounded-lg p-4 text-left ${
                          personalColor === color.name
                            ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex">
                          <div className="mr-2 flex flex-1 items-center justify-center">
                            <RadioGroupItem value={color.name} id={color.color} className="" />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            {color.color && (
                              <>
                                <div className="flex flex-col items-center justify-center">
                                  <div
                                    className={`h-12 w-12 rounded-full ${color.color} border border-gray-300`}
                                  />
                                  <span
                                    className={`mt-2 text-sm font-bold ${personalColor === color.name ? 'text-[#51B7FF]' : 'text-black'}`}
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
                  </>
                ))}
              </div>
              <div
                className={`mt-2 cursor-pointer rounded-lg p-4 text-left ${
                  personalColor === personalColors[4].name
                    ? 'border-2 border-[#51B7FF] bg-[#F6FBFF]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <label key={personalColors[4].name} className="flex flex-row">
                  <div className="flex-1">
                    <RadioGroupItem
                      value={personalColors[4].name}
                      id={personalColors[4].color}
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
                  key={concern}
                  className={`w-[142px] rounded-[6px] px-4 py-4 text-sm ${
                    skinConcerns.includes(concern)
                      ? 'border-2 border-[#51B7FF] bg-[#F6FBFF] text-[#51B7FF]'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                  onClick={() => {
                    if (skinConcerns.includes(concern)) {
                      setSkinConcerns(skinConcerns.filter((c) => c !== concern));
                    } else {
                      setSkinConcerns([...skinConcerns, concern]);
                    }
                  }}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              className="h-12 w-full max-w-[392px] rounded-full bg-gradient-to-r from-[#51B7FF] to-[#5CE686] text-sm font-bold sm:h-[56px] sm:text-base"
              onClick={() => {
                setIsOpen(false);
                nextTo();
              }}
            >
              <Typography element="span" className="font-bold text-white-base">
                次へ
              </Typography>
            </button>
            <button
              className="w-full py-2 font-bold text-[#51B7FF]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              あとで登録
            </button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
};

export default ProfileFormModal;
