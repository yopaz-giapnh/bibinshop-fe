'use client';

import { useToast } from '@/components/ui/use-toast';
import ProfileFormBirthdayModal from '@/features/account/profile/components/profile-form-birthday-modal';
import ProfileFormHairModal from '@/features/account/profile/components/profile-form-hair-modal';
import ProfileFormModal from '@/features/account/profile/components/profile-form-modal';
import { createUserProfile, getConcerns, updateUserProfile } from '@/features/sns/actions';
import {
  HairConcern,
  HealthConcern,
  PersonalColor,
  SkinConcern,
  SkinType
} from '@/features/sns/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Concerns = {
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
  const [open, setOpen] = useState(false);
  const [openProfileFormModal, setOpenProfileFormModal] = useState(false);
  const [openProfileFormHairModal, setOpenProfileFormHairModal] = useState(false);
  const [openProfileFormBirthdayModal, setOpenProfileFormBirthdayModal] = useState(false);
  const [skinType, setSkinType] = useState<SkinType | undefined>();
  const [personalColor, setPersonalColor] = useState<PersonalColor | undefined>();
  const [skinConcerns, setSkinConcerns] = useState<SkinConcern[]>([]);
  const [hairConcerns, setHairConcerns] = useState<HairConcern[]>([]);
  const [healthConcerns, setHealthConcerns] = useState<HealthConcern[]>([]);
  const [birthYear, setBirthYear] = useState<number | undefined>();

  const fetchConcerns = async () => {
    try {
      const data = await getConcerns();
      if (!data) throw new Error('Concerns data not found');
      //TODO: あとで直す
      setConcerns(data);
    } catch (error) {
      console.error('Error fetching concerns:', error);
    }
  };

  useEffect(() => {
    fetchConcerns();
    if (concerns) return;
    //TODO: あとで直す
    // setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { toast } = useToast();

  if (concerns) {
    return null;
  }

  const handleUpdateProfile = async () => {
    const skinConcernsFlat = skinConcerns.flat();
    const hairConcernsFlat = hairConcerns.flat();
    const healthConcernsFlat = healthConcerns.flat();

    try {
      await updateUserProfile({
        user_profile: {
          skin_type: skinType,
          personal_color: personalColor,
          birthyear: birthYear,
          skin_concerns: skinConcernsFlat,
          scalp_hair_concerns: hairConcernsFlat,
          health_concerns: healthConcernsFlat
        }
      });
      setOpenProfileFormBirthdayModal(false);
      toast({
        title: 'プロフィールを作成しました',
        icon: <Check className="h-6 w-6" />
      });
      await fetchConcerns();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
              if (!isSignedIn) {
                router.replace('/login');
                return;
              }
              setOpenProfileFormModal(true);
              //TODO: イケテナイ、、、
              createUserProfile({
                user_profile: {
                  skin_type: skinType,
                  personal_color: personalColor,
                  birthyear: birthYear,
                  skin_concerns: [],
                  scalp_hair_concerns: [],
                  health_concerns: []
                }
              });
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
        setSkinType={setSkinType}
        setPersonalColor={setPersonalColor}
        setSkinConcerns={setSkinConcerns}
        skinType={skinType}
        personalColor={personalColor}
        skinConcerns={skinConcerns}
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
      />
      <ProfileFormBirthdayModal
        isOpen={openProfileFormBirthdayModal}
        setIsOpen={setOpenProfileFormBirthdayModal}
        goToBack={() => {
          setOpenProfileFormBirthdayModal(false);
          setOpenProfileFormHairModal(true);
        }}
        goToNext={handleUpdateProfile}
        setBirthYear={setBirthYear}
        birthYear={birthYear}
      />
    </>
  );
}
