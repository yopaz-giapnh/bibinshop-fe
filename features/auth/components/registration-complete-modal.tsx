import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompleteModal from './complete-modal';

export default function RegistrationCompleteModal() {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('registration') === 'complete') {
      setShowCompleteModal(true);
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
  );
}
