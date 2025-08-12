import { Typography } from '@/components/ui/typography';
import { getCart } from '@/features/cart/actions';
import { Locale, translate } from '@/lib/i18n';
import { ShoppingCart } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

export async function CartMenu() {
  const cart = await getCart({ cache: 'force-cache' });
  const cartIetmCount = cart?.attributes.item_count;
  const locale = (cookies().get('NEXT_LOCALE')?.value || 'ja') as Locale;

  return (
    <Link href="/cart" passHref className="md:ml-[20px]">
      <div className="flex">
        <div className="relative flex">
          <ShoppingCart className="h-6 w-6" />
          {!!cartIetmCount && (
            <div className="absolute right-1 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full border-[1px] bg-bibinBlue-100">
              <Typography as="boldSmall" element="p" className="text-[10px] text-white-base">
                {cartIetmCount}
              </Typography>
            </div>
          )}
        </div>
        <Typography as="small" element="p" className="ml-1 hidden md:block">
          {translate(locale, 'nav.cart')}
        </Typography>
      </div>
    </Link>
  );
}
