import { Address } from '@/features/address/types';
import { CreditCard } from '@/features/payment/types';
import React from 'react';

export const CheckoutContext = React.createContext<{
  activeAddress: Address | null;
  setActiveAddress: (address: Address) => void;
  activeCreditCard: CreditCard | null;
  setActiveCreditCard: (creditCard: CreditCard) => void;
  activePaymentMethodId: string | null;
  setActivePaymentMethodId: (paymentMethodId: string) => void;
}>({
  activeAddress: null,
  setActiveAddress: () => {},
  activeCreditCard: null,
  setActiveCreditCard: () => {},
  activePaymentMethodId: null,
  setActivePaymentMethodId: () => {}
});

export function CheckoutProvider(props: React.PropsWithChildren) {
  const [activeAddress, setActiveAddress] = React.useState<Address | null>(null);
  const [activeCreditCard, setActiveCreditCard] = React.useState<CreditCard | null>(null);
  const [activePaymentMethodId, setActivePaymentMethodId] = React.useState<string | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        activeAddress,
        setActiveAddress,
        activeCreditCard,
        setActiveCreditCard,
        activePaymentMethodId,
        setActivePaymentMethodId
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return React.useContext(CheckoutContext);
}
