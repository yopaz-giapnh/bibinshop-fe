import { Breadcrumb } from '@/components/layout/breadcrumb';
import { getProduct } from '@/features/product/api/products';
import { ProductDetail } from '@/features/product/components/product-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// TODO: メタデータ設定する
export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) return notFound();

  return {
    title: product.attributes.name,
    description: product.attributes.description
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

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

        <ProductDetail product={product} />
      </div>
    </div>
  );
}
