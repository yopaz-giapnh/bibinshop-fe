import { ConvenienceStore } from '../types/konbini';

export const NUMBER_LABELS: Record<ConvenienceStore, { first: string; second: string }> = {
  familymart: {
    first: '第1番号',
    second: '第2番号'
  },
  lawson: {
    first: '支払い番号',
    second: '確認番号'
  },
  ministop: {
    first: '支払い番号',
    second: '確認番号'
  },
  seicomart: {
    first: '支払い番号',
    second: '確認番号'
  }
} as const;

export const STORE_NAMES: Record<ConvenienceStore, string> = {
  familymart: 'ファミリーマート',
  lawson: 'ローソン',
  ministop: 'ミニストップ',
  seicomart: 'セイコーマート'
} as const;
