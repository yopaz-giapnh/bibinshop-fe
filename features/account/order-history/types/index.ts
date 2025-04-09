export type Ratings = {
  effectiveness: number;
  satisfaction: number;
  repurchase: number;
  finish: number;
  skin_type: number;
};

export type RatingItem = {
  key: keyof Ratings;
  label: string;
};
