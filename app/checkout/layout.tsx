'use client';

import { CheckoutProvider } from '@/features/checkout/components/checkout-ctx';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
