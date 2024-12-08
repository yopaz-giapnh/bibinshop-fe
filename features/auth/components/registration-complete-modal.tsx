import { getNewRegisterationCoupon } from '@/features/coupon/actions';
import { RegistrationCouponGetModal } from '@/features/coupon/components/registration-coupon-get-modal';
import { CouponSchema } from '@/features/coupon/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompleteModal from './complete-modal';

export default function RegistrationCompleteModal() {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [newRegistrationCoupon, setNewRegistrationCoupon] = useState<CouponSchema | null>(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('registration') === 'complete') {
      getNewRegisterationCoupon().then((coupon) => {
        if (coupon) {
          setNewRegistrationCoupon(coupon);
        }
        setShowCompleteModal(true);
      });
    }
  }, [searchParams]);

  const onCompleteModalOpen = () => {
    setShowCompleteModal(true);
  };
  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
    router.replace('/');
  };

  return (
    <>
      {newRegistrationCoupon && showCompleteModal ? (
        <RegistrationCouponGetModal coupon={newRegistrationCoupon} />
      ) : (
        <CompleteModal
          open={showCompleteModal}
          setOpen={(open) => {
            if (open) {
              onCompleteModalOpen();
            } else {
              handleCompleteModalClose();
            }
          }}
          title="おめでとうございます。登録が完了しました！"
          onClick={handleCompleteModalClose}
        />
      )}
    </>
  );
}
