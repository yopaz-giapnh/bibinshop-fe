'use client';

import MasterCard from '@/assets/payment/small-master-card.svg';
import Visa from '@/assets/payment/small-visa.svg';
import { Button } from '@/components/ui/button';
import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPayment, getPaymentMethods } from '../actions';
import { cardOptions, stripePromise } from '../constants';
import { FormValues, formSchema } from '../types';

type Props = {
  onClose?: () => void;
};

function Form({ onClose }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolderName: ''
    }
  });

  const handleSubmit = async (data: FormValues) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    const { error, token } = await stripe.createToken(cardElement, {
      name: data.cardHolderName
    });

    if (error) {
      setMessage(error.message ?? null);
    } else {
      // NOTE: 支払い方法は、Stripeの1種類のみ
      const paymentMethods = await getPaymentMethods();
      const paymentMethodId = paymentMethods?.[0].id;
      if (!paymentMethodId) {
        setIsLoading(false);
        return;
      }

      await createPayment({ token, cardHolderName: data.cardHolderName, paymentMethodId });
    }

    setIsLoading(false);
  };

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto w-full space-y-6">
        <div className="mb-4 flex items-center space-x-4">
          <Visa />
          <MasterCard />
        </div>

        <FormField
          control={form.control}
          name="cardHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カードの名義人</FormLabel>
              <FormControl>
                <Input placeholder="TARO YAMADA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>クレジットカード</FormLabel>
          <CardElement options={cardOptions} className="mt-2 rounded-md border border-input px-4" />
          {message && <p className="mt-2 text-sm font-medium text-destructive">{message}</p>}
        </div>

        <div className="flex w-full justify-center">
          <Button
            type="submit"
            size="lg"
            variant="lg"
            className="w-[392px]"
            disabled={isLoading || !stripe}
            onClick={onClose}
          >
            {isLoading ? <LoadingSpinner /> : 'お支払い方法を保存する'}
          </Button>
        </div>
      </form>
    </FormComponent>
  );
}

export function PaymentForm({ onClose }: Props) {
  return (
    <Elements stripe={stripePromise}>
      <Form onClose={onClose} />
    </Elements>
  );
}
