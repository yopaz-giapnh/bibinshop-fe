import { Button } from '@/components/ui/button';
import { CartItemGroupByShop } from '@/features/cart/components/cart-item-group-by-shop';
import { Cart } from '@/features/cart/types';
import Link from 'next/link';

type Props = {
  cart: Cart;
};

export async function CheckoutCartForm({ cart }: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex w-full flex-col gap-4">
        {cart.vendorTotals.map((vendorTotal) => (
          <CartItemGroupByShop
            key={vendorTotal.id}
            shop={{
              ...vendorTotal,
              lineItems: cart.lineItems.filter(
                (lineItem) => lineItem.relationships.vendor?.data?.id === vendorTotal.id
              )
            }}
          />
        ))}
      </div>
      <Link href="/checkout-complete" passHref>
        <Button size="lg" variant="lg" className="w-[392px]">
          注文する
        </Button>
      </Link>
    </div>
  );
}
