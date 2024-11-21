export type Ratings = {
  texture: number;
  finish: number;
  effectiveness: number;
  longevity: number;
  usability: number;
};

export type RatingItem = {
  key: keyof Ratings;
  label: string;
};
