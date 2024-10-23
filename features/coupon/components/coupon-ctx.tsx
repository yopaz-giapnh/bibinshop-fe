import React from 'react';
import { cartAddCoupon, cartRemoveCoupon } from '../actions';
import { CouponSchema } from '../types';

export const CouponContext = React.createContext<{
  activeCoupon: CouponSchema | null;
  setActiveCoupon: (coupon: CouponSchema) => void;
  removeActiveCoupon: () => Promise<{
    success: boolean;
    message: string;
  }>;
  addActiveCoupon: (coupon: CouponSchema) => void;
  resetActiveCoupon: () => void;
}>({
  activeCoupon: null,
  setActiveCoupon: () => {},
  removeActiveCoupon: async (): Promise<
    { success: true; message: string } | { success: false; message: string }
  > => {
    return { success: false, message: '' };
  },
  addActiveCoupon: () => {},
  resetActiveCoupon: () => {}
});

export function CouponProvider(props: React.PropsWithChildren) {
  const [activeCoupon, setActiveCoupon] = React.useState<CouponSchema | null>(null);
  const removeActiveCoupon = async () => {
    if (activeCoupon) {
      const { success, message } = await cartRemoveCoupon(activeCoupon.id);
      if (success) {
        setActiveCoupon(null);
        return { success, message };
      }
      return { success, message };
    }
    return { success: false, message: 'クーポンの取り消しに失敗しました' };
  };

  const addActiveCoupon = (coupon: CouponSchema) => {
    setActiveCoupon(coupon);
    cartAddCoupon(coupon.id);
  };

  const resetActiveCoupon = () => {
    setActiveCoupon(null);
  };

  return (
    <CouponContext.Provider
      value={{
        activeCoupon,
        setActiveCoupon,
        removeActiveCoupon,
        addActiveCoupon,
        resetActiveCoupon
      }}
    >
      {props.children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  return React.useContext(CouponContext);
}
