import { Address } from '@/features/address/types';
import { CreditCard } from '@/features/payment/types';
import React from 'react';

export const CheckoutContext = React.createContext<{
  activeAddress: Address | null;
  setActiveAddress: (address: Address) => void;
  activeCreditCard: CreditCard | null;
  setActiveCreditCard: (creditCard: CreditCard) => void;
}>({
  activeAddress: null,
  setActiveAddress: () => {},
  activeCreditCard: null,
  setActiveCreditCard: () => {}
});

export function CheckoutProvider(props: React.PropsWithChildren) {
  const [activeAddress, setActiveAddress] = React.useState<Address | null>(null);
  const [activeCreditCard, setActiveCreditCard] = React.useState<CreditCard | null>(null);

  return (
    <CheckoutContext.Provider
      value={{ activeAddress, setActiveAddress, activeCreditCard, setActiveCreditCard }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return React.useContext(CheckoutContext);
}
