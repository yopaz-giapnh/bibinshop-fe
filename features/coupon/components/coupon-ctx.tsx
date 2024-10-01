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
}>({
  activeCoupon: null,
  setActiveCoupon: () => {},
  removeActiveCoupon: async (): Promise<
    { success: true; message: string } | { success: false; message: string }
  > => {
    return { success: false, message: '' };
  },
  addActiveCoupon: () => {}
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

  //   TODO: @coupon これに置き換える？
  const addActiveCoupon = (coupon: CouponSchema) => {
    setActiveCoupon(coupon);
    cartAddCoupon(coupon.id);
  };

  return (
    <CouponContext.Provider
      value={{ activeCoupon, setActiveCoupon, removeActiveCoupon, addActiveCoupon }}
    >
      {props.children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  return React.useContext(CouponContext);
}
