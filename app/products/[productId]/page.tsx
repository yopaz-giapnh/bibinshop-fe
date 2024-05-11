import { Breadcrumb } from '@/components/layout/breadcrumb';

export default async function Page() {
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
    </div>
  );
}
