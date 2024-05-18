import DocumentBlue from '@/assets/document_blue.svg';
import { Typography } from '@/components/ui/typography';
import ProfileEditModal from '@/features/account/components/profile-edit-modal';
import ReviewItem from '@/features/account/components/review-item';
import Image from 'next/image';

export default async function Page() {
  // demo data
  const reviews = [
    {
      date: '2024/3/8',
      star: 4,
      color: 'バーガンディ',
      text: '細かいラメのザラつきは感じますが良い感じにキラキラしてて取れにくいし1回でツヤツヤしてます。',
      price: '1,030',
      productImageSrc: '/banner.png',
      productDescription:
        'マスカラ モテマスカラ カラーマスカラ まつげケア お湯オフ 低刺激性 クリア 透明 マスカラ 塗る つけマスカラマ...'
    },
    {
      date: '2024/3/9',
      star: 2,
      color: '赤',
      text: 'キラキラしてて取れにくいし1回でツヤツヤしてます。',
      price: '1,050',
      productImageSrc: '/banner.png',
      productDescription: 'マスカラ モテマスカラ カラーマスカラ yaho-'
    },
    {
      date: '2024/3/9',
      star: 2,
      color: '青',
      text: 'キラキラしてて取れにくいし1回でツヤツヤしてます。',
      price: '1,050',
      productImageSrc: '/banner.png',
      productDescription: 'マスカラ モテマスカラ カラーマスカラ yaho-'
    }
  ];

  return (
    <div className="mx-auto mt-[128px] flex h-screen w-full flex-col justify-center bg-paleFrostBlue p-[24px]">
      <div className="ml-[24px] flex items-center">
        <Image
          src={'/yamada_yuka_demo.png'}
          width={100}
          height={100}
          className="rounded-[100px]"
          alt={''}
        />
        <div className="ml-[24px]">
          <Typography as="bold" element="p" className="text-[20px] text-black-90 ">
            yamada_yuka183
          </Typography>
          <div className="flex items-baseline">
            <Typography as="bold" element="p" className="text-[16px] text-black-90">
              121
            </Typography>
            <Typography as="xSmall" element="p" className="text-[14px] text-black-90">
              レビュー
            </Typography>
          </div>
        </div>
        <ProfileEditModal />
      </div>
      <div className="mx-auto flex h-screen w-full flex-col  p-[24px]">
        {reviews.length === 0 ? (
          <div className="mt-[24px] flex flex-col items-center justify-center">
            <DocumentBlue />
            <Typography as="xSmall" element="p" className="mt-[24px] text-[16px] text-black-90">
              レビューはありません。
            </Typography>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto rounded-[6px] bg-white-base p-[24px]">
            <Typography as="bold" element="p" className="mb-[16px] text-[20px] text-black-90">
              レビュー
            </Typography>
            {reviews.map((review, index) => (
              <div key={index}>
                <ReviewItem {...review} />
                {index < reviews.length - 1 && (
                  <div className="my-[16px] h-[1px] w-full bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
