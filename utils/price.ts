type Price = string | null | undefined;

export const formatedPrice = (price: Price) => {
  if (price == null) {
    return '';
  }

  const formattedNumber = new Intl.NumberFormat('ja-JP', {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(price));

  return `${formattedNumber}円`;
};

export const calculateDiscountPercentage = (price: Price, comparePrice: Price) => {
  const priceNum = Number(price);
  const comparePriceNum = Number(comparePrice);

  if (priceNum <= 0 || comparePriceNum <= 0 || priceNum > comparePriceNum) {
    return 0;
  }

  const discountPercentage = ((comparePriceNum - priceNum) / comparePriceNum) * 100;
  return Math.round(discountPercentage);
};

export const isDiscounted = (price: Price, comparePrice: Price) => {
  if (price == null || comparePrice == null) {
    return false;
  }

  return Number(price) < Number(comparePrice);
};
