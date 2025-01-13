import { ConvenienceStore } from '../types/konbini';

type KonbiniPaymentNumbers = {
  familymartPaymentCode: string;
  familymartConfirmationNumber: string;
  lawsonPaymentCode: string;
  lawsonConfirmationNumber: string;
  ministopPaymentCode: string;
  ministopConfirmationNumber: string;
  seicomartPaymentCode: string;
  seicomartConfirmationNumber: string;
};

export const getPaymentNumbers = (
  store: ConvenienceStore,
  numbers: KonbiniPaymentNumbers
): { first: string; second: string } => {
  switch (store) {
    case 'familymart':
      return {
        first: numbers.familymartPaymentCode,
        second: numbers.familymartConfirmationNumber
      };
    case 'lawson':
      return {
        first: numbers.lawsonPaymentCode,
        second: numbers.lawsonConfirmationNumber
      };
    case 'ministop':
      return {
        first: numbers.ministopPaymentCode,
        second: numbers.ministopConfirmationNumber
      };
    case 'seicomart':
      return {
        first: numbers.seicomartPaymentCode,
        second: numbers.seicomartConfirmationNumber
      };
  }
};

export const generatePaymentInstructions = (
  store: ConvenienceStore,
  firstNumber: string,
  secondNumber: string
): string[] => {
  const PAYMENT_INSTRUCTIONS = {
    familymart: [
      'マルチコピー機のトップ画面で、「代金支払い (コンビニでお支払い)」ボタンを選択します。',
      '「番号を入力する」ボタンを押します。',
      `第 1 番号 (${firstNumber}) を入力して「OK」を押し、次の画面に進みます。`,
      `第 2 番号 (${secondNumber}) を入力して「OK」を押し、次の画面に進みます。`,
      '支払いの詳細を確認し、「了解」を押してレシートを印刷します。',
      'レシートをレジに持って行き、現金または FamiPay で支払います。お客様の控えとして領収書を保管してください。'
    ],
    lawson: [
      'Loppi のトップ画面で「各種番号をお持ちの方」を選択します。',
      `6 桁の支払い番号 (${firstNumber}) を入力し、「次へ」を押して次の画面に進みます。`,
      `確認番号 (${secondNumber}) を入力し、「次へ」を押して次の画面に進みます。`,
      '支払い詳細を確認し、「了解」を押してレシートを印刷します。',
      '30 分以内にレシートをレジに持って行き、現金で支払います。お客様の控えとして領収書を保管してください。'
    ],
    ministop: [
      'Loppi のトップ画面で「各種番号をお持ちの方」を選択します。',
      `6 桁の支払い番号 (${firstNumber}) を入力し、「次へ」を押して次の画面に進みます。`,
      `確認番号 (${secondNumber}) を入力し、「次へ」を押して次の画面に進みます。`,
      '支払い詳細を確認し、「了解」を押してレシートを印刷します。',
      '30 分以内にレジに持って行き、現金で支払います。お客様の控えとして領収書を保管してください。'
    ],
    seicomart: [
      'レジでインターネット支払いをしたい旨を伝えます。',
      `レジにあるタッチパネルディスプレイで、支払い番号 (${firstNumber}) を入力し、「登録」を押します。`,
      `次の画面で、確認番号 (${secondNumber}) を入力し、「登録」を押します。`,
      '支払い詳細を確認し、「OK」を押します。',
      '現金で支払います。お客様の控えとして領収書を保管してください。'
    ]
  };

  return PAYMENT_INSTRUCTIONS[store];
};
