export const TAGS = {
  accountCreditCards: 'account-credit-cards'
};

import { StripeCardElementOptions, loadStripe } from '@stripe/stripe-js';

export const cardOptions: StripeCardElementOptions = {
  style: {
    base: {
      lineHeight: '48px',
      fontSize: '16px',
      fontFamily: 'Noto Sans JP',
      fontWeight: '400',
      color: '#202224',
      letterSpacing: '0.03em',
      '::placeholder': {
        color: 'rgba(0, 0, 0, 0.3)'
      }
    },
    invalid: {
      color: '#ff3333'
    }
  },
  hidePostalCode: true
};

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const availablePaymentMethodName = {
  stripe: 'stripe',
  paypay: 'paypay',
  stripeKonbini: 'stripe_konbini'
} as const;
