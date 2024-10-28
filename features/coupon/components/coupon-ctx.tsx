import Cookies from 'js-cookie';
import React from 'react';
import { cartAddCoupon, cartRemoveCoupon, getCoupons } from '../actions';
import { COOKIES } from '../constants';
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

  // クーポン一覧の取得とCookieからの状態復元(ブラウザをリロードされた時用)
  // TODO: 現状、アクティブクーポンの取得の API がないためこの方法で実装しています
  React.useEffect(() => {
    const initializeCoupons = async () => {
      try {
        const fetchedCoupons = await getCoupons();
        const savedCouponId = Cookies.get(COOKIES.activeCouponId);

        if (savedCouponId) {
          const savedCoupon = fetchedCoupons.find((coupon) => coupon.id === savedCouponId);
          if (savedCoupon) {
            setActiveCoupon(savedCoupon);
          } else {
            Cookies.remove(COOKIES.activeCouponId);
          }
        }
      } catch (e) {
        console.error('Error initializing coupons:', e);
      }
    };

    initializeCoupons();
  }, []);

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
