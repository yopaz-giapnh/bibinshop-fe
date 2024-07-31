'use client';

import ProfileFormBirthdayModal from '@/features/account/profile/components/profile-form-birthday-modal';
import ProfileFormHairModal from '@/features/account/profile/components/profile-form-hair-modal';
import ProfileFormModal from '@/features/account/profile/components/profile-form-modal';
import Image from 'next/image';
import { useState } from 'react';

export function StickyBanner() {
  const [open, setOpen] = useState(true);
  const [openProfileFormModal, setOpenProfileFormModal] = useState(false);
  const [openProfileFormHairModal, setOpenProfileFormHairModal] = useState(false);
  const [openProfileFormBirthdayModal, setOpenProfileFormBirthdayModal] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center sm:justify-end">
          <button
            className="h-10 w-10"
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => setOpen(false)}
          />
          <button
            onClick={() => {
              setOpenProfileFormModal(true);
            }}
          >
            <Image src={'/sticky_banner.png'} alt={'sticky banner'} width={344} height={130} />
          </button>
        </div>
      )}
      <ProfileFormModal
        isOpen={openProfileFormModal}
        setIsOpen={setOpenProfileFormModal}
        nextTo={() => {
          setOpenProfileFormHairModal(true);
        }}
      />
      <ProfileFormHairModal
        isOpen={openProfileFormHairModal}
        setIsOpen={setOpenProfileFormHairModal}
        goToBack={() => {
          setOpenProfileFormHairModal(false);
          setOpenProfileFormModal(true);
        }}
        goToNext={() => {
          setOpenProfileFormHairModal(false);
          setOpenProfileFormBirthdayModal(true);
        }}
      />
      <ProfileFormBirthdayModal
        isOpen={openProfileFormBirthdayModal}
        setIsOpen={setOpenProfileFormBirthdayModal}
        goToBack={() => {
          setOpenProfileFormBirthdayModal(false);
          setOpenProfileFormHairModal(true);
        }}
        goToNext={() => {}}
      />
    </>
  );
}
