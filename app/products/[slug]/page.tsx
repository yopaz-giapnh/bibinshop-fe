import { Breadcrumb } from '@/components/layout/breadcrumb';
import { getProduct } from '@/features/product/actions';
import { ProductDetail } from '@/features/product/components/product-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) return notFound();

  return {
    title: product.attributes.meta_title || product.attributes.name,
    description: product.attributes.meta_description || product.attributes.description,
    keywords: product.attributes.meta_keywords || product.attributes.name
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
      <div className="pt-[80px] md:pt-[150px]">
        <Breadcrumb menus={menus} />
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
