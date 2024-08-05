import { HairConcern, HealthConcern, PersonalColor, SkinConcern, SkinType } from '../utils';

export const TAGS = {
  concerns: 'concerns'
};

export type SkinTypeEntry = { text: string; value: NonNullable<SkinType> };
export const skinTypes: SkinTypeEntry[] = [
  { text: '普通肌', value: 'NORMAL' },
  { text: '乾燥肌', value: 'DRY' },
  { text: '脂性肌', value: 'OILY' },
  { text: '混合肌', value: 'COMBINATION' }
];
export type SkinColorEntry = {
  name: string;
  description: string;
  color: string;
  value: NonNullable<PersonalColor>;
};
export const colors: SkinColorEntry[] = [
  {
    name: 'イエベ春タイプ',
    description: '白い人は明るいアイボリーベージュ、日に焼けている人は明るい小麦色肌',
    color: '#F7D4C0',
    value: 'YELLOW_SPRING'
  },
  {
    name: 'ブルべ夏タイプ',
    description: '色の白い人はピンクベージュ、日焼けている人はソフトな健康肌',
    color: '#FFE0D8',
    value: 'BLUE_SUMMER'
  },
  {
    name: 'イエベ秋タイプ',
    description:
      '白い人は黄味がかったベージュまたは蜂蜜のような色味、日焼けしている人は琥珀色の小麦色の方',
    color: '#FCE6CE',
    value: 'YELLOW_AUTUMN'
  },
  {
    name: 'ブルべ冬タイプ',
    description: '色の白い人はピンクの中の白、日焼けている人は赤味がない澄んだ肌色',
    color: '#FDEFEC',
    value: 'BLUE_WINTER'
  }
];
export type SkinConcernEntry = { text: string; value: SkinConcern };
export const skinConcerns: SkinConcernEntry[] = [
  { text: 'アトピー', value: ['ATOPY'] },
  { text: 'ニキビ', value: ['ACNE'] },
  { text: '敏感肌', value: ['SENSITIVE'] },
  { text: '美白/シミ', value: ['BLEMISHES'] },
  { text: '皮脂/ブラックヘッド', value: ['BLACKHEADS'] },
  { text: 'クマ', value: ['DARK_CIRCLES'] },
  { text: '乾燥肌', value: ['DRY_SKIN'] },
  { text: 'シワ/弾力', value: ['WRINKLES'] },
  { text: '毛穴', value: ['PORES'] },
  { text: '赤み', value: ['REDNESS'] },
  { text: '角質', value: ['ROUGHNESS'] },
  { text: '該当なし', value: ['NONE'] }
];
export type HairConcernEntry = { text: string; value: HairConcern };
export const hairConcerns: HairConcernEntry[] = [
  { text: '脱毛', value: ['HAIR_REMOVAL'] },
  { text: 'ダメージヘア', value: ['DAMAGED_HAIR'] },
  { text: '頭皮トラブル', value: ['SCALP_PROBLEMS'] },
  { text: '熱感頭皮', value: ['SUNBURNED_SCALP'] },
  { text: '脂性頭皮', value: ['OILY_SCALP'] },
  { text: '痒み', value: ['ITCHY_SCALP'] },
  { text: 'フケ/角質', value: ['DANDRUFF'] },
  { text: '該当なし', value: ['NONE'] }
];
export type HealthConcernEntry = { text: string; value: HealthConcern };
export const healthConcerns: HealthConcernEntry[] = [
  { text: '目の健康', value: ['EYE_HEALTH'] },
  { text: '慢性疲労', value: ['CHRONIC_FATIGUE'] },
  { text: '睡眠ストレス', value: ['SLEEP_STRESS'] },
  { text: '体脂肪減少', value: ['WEIGHT_LOSS'] },
  { text: '免疫力', value: ['IMMUNITY'] },
  { text: '筋力強化', value: ['MUSCLE_STRENGTH'] },
  { text: 'コレステロール改善', value: ['CHOLESTEROL'] },
  { text: '腸の健康', value: ['DIGESTIVE_HEALTH'] },
  { text: '肝臓の健康', value: ['LIVER_HEALTH'] },
  { text: '骨/関節/歯', value: ['BONE_HEALTH'] },
  { text: '女性の健康', value: ['WOMEN_HEALTH'] },
  { text: '血液循環', value: ['BLOOD_CIRCULATION'] },
  { text: '消化・胃腸の健康', value: ['DIGESTIVE_HEALTH'] },
  { text: '該当なし', value: ['NONE'] }
];
