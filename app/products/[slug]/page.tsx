import { Breadcrumb } from '@/components/layout/breadcrumb';
import { getProduct } from '@/features/product/actions';
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

  const menus = [
    {
      name: 'ホーム',
      url: '/'
    },
    ...product.taxons.map((taxon) => ({
      name: taxon.attributes.name || '',
      url: `/search?taxons=${taxon.id}`
    }))
  ];

  return (
    <div className="h-full w-full bg-white-base pb-6 md:px-16">
      <div className="pt-[80px] md:pt-[128px]">
        <Breadcrumb menus={menus} />
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
