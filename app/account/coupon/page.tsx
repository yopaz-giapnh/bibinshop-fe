import { getCoupons } from '@/features/coupon/actions';
import Coupon from '@/features/coupon/components/coupon';

export default async function Page() {
  return <Coupon getCoupons={getCoupons()} />;
}
