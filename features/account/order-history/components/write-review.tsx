import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import WriteReviewItem from './write-review-item';

/**
 * レビューを書く画面
 * @returns JSX.Element
 */
export default function WriteReview() {
  const reviewItems = [
    {
      title:
        '【プレミアムUVケア】日焼け止め 50ml 4種 SPF50+PA++++/トーンアップ/サンクリーム/化粧下地/敏感肌/メイ...',
      color: 'vol. 6',
      rating: 0,
      image: '/item-demo.png',
      alt: '商品画像'
    },
    {
      title:
        '【プレミアムUVケア】日焼け止め 50ml 4種 SPF50+PA++++/トーンアップ/サンクリーム/化粧下地/敏感肌/メイ...',
      color: 'vol. 6',
      rating: 0,
      image: '/item-demo.png',
      alt: '商品画像'
    },
    {
      title:
        '【プレミアムUVケア】日焼け止め 50ml 4種 SPF50+PA++++/トーンアップ/サンクリーム/化粧下地/敏感肌/メイ...',
      color: 'vol. 6',
      rating: 0,
      image: '/item-demo.png',
      alt: '商品画像'
    }
  ];
  return (
    <>
      <Typography as="boldXLarge" element="p" className="mb-[24px] text-[24px] text-black-90">
        レビューを書く
      </Typography>
      <div className="h-screen-calc w-full overflow-y-auto">
        {reviewItems.map((item, index) => (
          <WriteReviewItem key={index} item={item} />
        ))}
      </div>
      <Button type="submit" variant="lg" className="mt-[24px] w-[392px]">
        提出
      </Button>
    </>
  );
}
