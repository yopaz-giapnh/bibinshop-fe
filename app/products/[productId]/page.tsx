import { Breadcrumb } from '@/components/layout/breadcrumb';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    productId: string;
  };
};

async function getProduct(productId: string) {
  return `PRODUCT ID: ${productId}`;
}

export default async function Page({ params }: Props) {
  const product = await getProduct(params.productId);

  if (!product) return notFound();

  return (
    <div className="h-full w-full bg-paleFrostBlue px-16">
      <div className="pt-[128px]">
        {/* TODO: メニュー取得する */}
        <Breadcrumb
          menus={[
            {
              name: 'ホーム',
              url: '/'
            },
            {
              name: 'ビューティー・コスメ',
              url: '/products/beauty-cosmetics'
            },
            {
              name: ' ポイントメイク',
              url: '/products/point-makeup'
            },
            {
              name: 'マスカラ',
              url: '/products/mascara'
            },
            {
              name: 'マスカラ モテマスカラ カラーマスカラ',
              url: '/products/mote-mascara-color-mascara'
            }
          ]}
        />
      </div>
      <div className="mx-auto flex w-full max-w-[472px] flex-col items-center justify-center">
        <div>{product}</div>
      </div>
    </div>
  );
}
