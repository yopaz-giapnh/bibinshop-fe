'use client';

import { useToast } from '@/components/ui/use-toast';
import ProfileFormBirthdayModal from '@/features/account/profile/components/profile-form-birthday-modal';
import ProfileFormHairModal from '@/features/account/profile/components/profile-form-hair-modal';
import ProfileFormModal from '@/features/account/profile/components/profile-form-modal';
import { createUserProfile, getConcerns } from '@/features/sns/actions';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType
} from '@/features/sns/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeAlert, Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Concerns = {
  birthyear?: number;
  skinType?: SkinType;
  personalColor?: PersonalColor;
  //concerns are arrays
  skinConcerns?: SkinConcern;
  hairConcerns?: HairConcern;
  healthConcerns?: HealthConcern;
};

type Props = {
  isSignedIn: boolean;
};

export function StickyBanner({ isSignedIn }: Props) {
  const router = useRouter();
  const [concerns, setConcerns] = useState<Concerns | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openProfileFormModal, setOpenProfileFormModal] = useState(false);
  const [openProfileFormHairModal, setOpenProfileFormHairModal] = useState(false);
  const [openProfileFormBirthdayModal, setOpenProfileFormBirthdayModal] = useState(false);
  const [skinType, setSkinType] = useState<SkinType | undefined>();
  const [personalColor, setPersonalColor] = useState<PersonalColor | undefined>();
  const [skinConcerns, setSkinConcerns] = useState<SkinConcern>([]);
  const [hairConcerns, setHairConcerns] = useState<HairConcern>([]);
  const [healthConcerns, setHealthConcerns] = useState<HealthConcern>([]);
  const [birthYear, setBirthYear] = useState<number | undefined>();

  const fetchConcerns = async () => {
    setIsLoading(true);
    try {
      const data = await getConcerns();
      setConcerns(data ? data : undefined);
    } catch (error) {
      () => {};
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, []);

  useEffect(() => {
    if (!isLoading && !concerns) {
      setOpen(true);
    }
  }, [concerns, isLoading]);

  const { toast } = useToast();

  if (isLoading) {
    return null; // Or return a loading indicator if preferred
  }

  if (concerns) {
    return null;
  }

  const handleCreateProfile = async () => {
    try {
      await createUserProfile({
        user_profile: {
          skin_type: skinType,
          personal_color: personalColor,
          birthyear: birthYear,
          skin_concerns: skinConcerns?.flat(),
          scalp_hair_concerns: hairConcerns?.flat(),
          health_concerns: healthConcerns?.flat()
        }
      });
      toast({
        title: 'プロフィールを作成しました',
        icon: <Check className="h-6 w-6" />
      });
      fetchConcerns();
    } catch (error) {
      toast({
        title: 'プロフィールの更新中にエラーが発生しました。後でもう一度お試しください。',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
    setOpenProfileFormBirthdayModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 flex justify-center sm:justify-end"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              className="h-10 w-10"
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => setOpen(false)}
            />
            <button
              onClick={() => {
                if (!isSignedIn) {
                  router.replace('/login');
                  return;
                }
                setOpenProfileFormModal(true);
              }}
            >
              <Image
                src={'/sticky_banner.png'}
                alt={'sticky banner'}
                width={344}
                height={130}
                style={{ width: '100%', height: 'auto' }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <ProfileFormModal
        isOpen={openProfileFormModal}
        setIsOpen={setOpenProfileFormModal}
        nextTo={() => {
          setOpenProfileFormHairModal(true);
        }}
        setSkinType={setSkinType}
        setPersonalColor={setPersonalColor}
        setSkinConcerns={setSkinConcerns}
        skinType={skinType}
        personalColor={personalColor}
        skinConcerns={skinConcerns}
        hairConcerns={hairConcerns}
        healthConcerns={healthConcerns}
        concerns={concerns}
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
        setHairConcerns={setHairConcerns}
        hairConcerns={hairConcerns}
        setHealthConcerns={setHealthConcerns}
        healthConcerns={healthConcerns}
        skinType={skinType}
        personalColor={personalColor}
        skinConcerns={skinConcerns}
        concerns={concerns}
      />
      <ProfileFormBirthdayModal
        isOpen={openProfileFormBirthdayModal}
        setIsOpen={setOpenProfileFormBirthdayModal}
        goToBack={() => {
          setOpenProfileFormBirthdayModal(false);
          setOpenProfileFormHairModal(true);
        }}
        goToNext={handleCreateProfile}
        setBirthYear={setBirthYear}
        birthYear={birthYear}
      />
    </>
  );
}
