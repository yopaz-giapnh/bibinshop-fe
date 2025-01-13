import { Address } from '@/features/address/types';
import { AvailablePaymentMethod } from '@/features/payment/types';
import React from 'react';

export const CheckoutContext = React.createContext<{
  activeAddress: Address | null;
  setActiveAddress: (address: Address) => void;
  activePaymentMethod: AvailablePaymentMethod | null;
  setActivePaymentMethod: (paymentMethod: AvailablePaymentMethod | null) => void;
  canOrder: boolean;
}>({
  activeAddress: null,
  setActiveAddress: () => {},
  activePaymentMethod: null,
  setActivePaymentMethod: () => {},
  canOrder: false
});

export function CheckoutProvider(props: React.PropsWithChildren) {
  const [activeAddress, setActiveAddress] = React.useState<Address | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] =
    React.useState<AvailablePaymentMethod | null>(null);
  const canOrder = !!activeAddress && !!activePaymentMethod;

  return (
    <CheckoutContext.Provider
      value={{
        activeAddress,
        setActiveAddress,
        activePaymentMethod,
        setActivePaymentMethod,
        canOrder
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return React.useContext(CheckoutContext);
}
