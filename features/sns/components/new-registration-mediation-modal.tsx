import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type NewRegistrationMediationModalRef = {
  open: () => void;
  close: () => void;
};

export const NewRegistrationMediationModal = forwardRef<NewRegistrationMediationModalRef>(
  (_, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false)
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          hideCloseButton={true}
          className="flex w-11/12 flex-col items-center px-[8px] pt-[8px] md:w-[540px]"
        >
          <div className="w-full">
            <Image
              src="/new-registration-mediation-modal-image.png"
              alt="Login required"
              width={540}
              height={540}
            />
          </div>
          <div className="w-4/5 md:mt-[8px]">
            <Typography as="bold" element="p" className="text-center">
              会員登録して、自分にぴったりの商品やフォロワーを見つけよう！
            </Typography>
            <Typography as="caption" element="p" className="mt-4 text-center ">
              メールアドレスとパスワードを設定するだけで、
            </Typography>
            <Typography as="boldSmall" element="p" className="text-center text-bibinBlue-100">
              1分で登録完了！
            </Typography>
            <Link href="/signup" passHref>
              <Button variant="default" className="mt-[16px] w-full md:mt-[24px]">
                今すぐ会員登録
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

NewRegistrationMediationModal.displayName = 'NewRegistrationMediationModal';
