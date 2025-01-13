'use client';

import { useToast } from '@/components/ui/use-toast';
import { Check, ClockIcon, CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { NUMBER_LABELS, STORE_NAMES } from '../constants/konbini';
import { ConvenienceStore } from '../types/konbini';
import { generatePaymentInstructions, getPaymentNumbers } from '../utils/konbini';

type Props = {
  displayTotal: string;
  paymentDueDate: string;
  familymartPaymentCode: string;
  familymartConfirmationNumber: string;
  lawsonPaymentCode: string;
  lawsonConfirmationNumber: string;
  ministopPaymentCode: string;
  ministopConfirmationNumber: string;
  seicomartPaymentCode: string;
  seicomartConfirmationNumber: string;
};

export function OrderDetailKonbiniInfo(props: Props) {
  const [selectedStore, setSelectedStore] = useState<ConvenienceStore>('familymart');
  const { toast } = useToast();

  const handleCopyNumber = async (number: string, label: string) => {
    await navigator.clipboard.writeText(number);
    toast({
      title: `${label}をコピーしました`,
      icon: <Check className="h-6 w-6" />
    });
  };

  const currentNumbers = getPaymentNumbers(selectedStore, props);
  const paymentInstructions = generatePaymentInstructions(
    selectedStore,
    currentNumbers.first,
    currentNumbers.second
  );

  return (
    <div className="flex w-full flex-col items-start justify-center gap-6 rounded-md border border-bibinViolet-100 bg-cardPale p-4 shadow-cardBase">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center">
            <ClockIcon className="text-bibinViolet-100" />
          </div>
          <h2 className="text-xl font-bold text-bibinViolet-100">
            {props.paymentDueDate}{' '}
            <span className="text-black-80">以内にコンビニでお支払いください</span>
          </h2>
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="text-base text-black-90">ご請求額：</span>
          <span className="text-100 text-3xl font-bold">{props.displayTotal}</span>
        </div>
      </div>

      <div className="flex w-full flex-row items-start gap-4">
        {Object.entries(STORE_NAMES).map(([key, name]) => (
          <button
            key={key}
            className={`flex flex-1 flex-row items-center gap-4 rounded-md border-2 p-3 ${
              selectedStore === key
                ? 'border-bibinBlue-100 bg-[#F6FBFF]'
                : 'border-black-10 bg-white-base'
            }`}
            onClick={() => setSelectedStore(key as ConvenienceStore)}
          >
            <div className="flex flex-col items-start justify-center gap-2">
              <Image src={`/${key}.png`} alt={name} width={30} height={30} />
              <span className="text-sm text-black-90">{name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <span className="text-sm text-black-90">{STORE_NAMES[selectedStore]}での支払いの詳細</span>
        <div className="flex w-full flex-col items-start justify-center gap-4 rounded-md border border-black-10 bg-white-base p-6">
          <div className="flex flex-row items-center gap-4">
            <span className="w-20 bg-white-base text-base text-black-90">
              {NUMBER_LABELS[selectedStore].first}
            </span>
            <div className="flex flex-row items-center gap-2 bg-white-base">
              <span className="text-100 text-2xl font-bold tracking-wider">
                {currentNumbers.first}
              </span>
              <button
                className="h-5 w-5 hover:opacity-70"
                onClick={() =>
                  handleCopyNumber(currentNumbers.first, NUMBER_LABELS[selectedStore].first)
                }
              >
                <CopyIcon className="text-black" />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="w-20 bg-white-base text-base text-black-90">
              {NUMBER_LABELS[selectedStore].second}
            </span>
            <div className="flex flex-row items-center gap-2 bg-white-base">
              <span className="text-100 text-2xl font-bold tracking-wider">
                {currentNumbers.second}
              </span>
              <button
                className="h-5 w-5 hover:opacity-70"
                onClick={() =>
                  handleCopyNumber(currentNumbers.second, NUMBER_LABELS[selectedStore].second)
                }
              >
                <CopyIcon className="text-black" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-black text-sm leading-8">
          <p>支払い手順</p>
          <ol className="list-inside list-decimal">
            {paymentInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
