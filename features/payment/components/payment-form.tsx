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
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { createCart, getCart } from '@/features/cart/actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { StripeElementChangeEvent } from '@stripe/stripe-js';
import { BadgeAlert, Check } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPayment, getPaymentMethods } from '../actions';
import { cardOptions, stripePromise } from '../constants';
import { FormValues, formSchema } from '../types';

type Props = {
  onClose?: () => void;
  iconLayout?: 'center' | 'left';
};

function Form({ onClose, iconLayout }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const [cardErrors, setCardErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolderName: ''
    },
    mode: 'onBlur'
  });

  const handleSubmit = async (data: FormValues) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      setIsLoading(false);
      return;
    }

    const { error, token } = await stripe.createToken(cardNumber, {
      name: data.cardHolderName
    });

    if (error) {
      setCardErrors({
        ...cardErrors,
        cardNumber: error.message || ''
      });
      toast({
        title: 'カードの追加に失敗しました',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    } else {
      const cart = await getCart();
      if (!cart) {
        await createCart();
      }

      const paymentMethods = await getPaymentMethods();
      const paymentMethodId = paymentMethods?.[0].id;
      if (!paymentMethodId) {
        setIsLoading(false);
        return;
      }

      await createPayment({ token, cardHolderName: data.cardHolderName, paymentMethodId });
      onClose?.();

      toast({
        title: '新しいカードを追加しました',
        icon: <Check className="h-6 w-6" />
      });
    }

    setIsLoading(false);
  };

  const handleCardChange = (
    event: StripeElementChangeEvent,
    fieldName: 'cardNumber' | 'cardExpiry' | 'cardCvc'
  ) => {
    setCardErrors((prev) => ({
      ...prev,
      [fieldName]: event.error?.message || ''
    }));
    setCardComplete((prev) => ({
      ...prev,
      [fieldName]: event.complete
    }));
  };

  const isFormValid =
    form.formState.isValid &&
    cardComplete.cardNumber &&
    cardComplete.cardExpiry &&
    cardComplete.cardCvc &&
    !cardErrors.cardNumber &&
    !cardErrors.cardExpiry &&
    !cardErrors.cardCvc;

  return (
    <FormComponent {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mx-auto w-full space-y-6">
        <div
          className={cn(
            'mb-4 flex items-center space-x-4',
            iconLayout === 'center' && 'justify-center',
            iconLayout === 'left' && 'justify-start'
          )}
        >
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
          <FormLabel>カード番号</FormLabel>
          <div className="mt-2 rounded-md border border-input px-4">
            <CardNumberElement
              options={{ ...cardOptions, showIcon: true }}
              onChange={(event) => handleCardChange(event, 'cardNumber')}
            />
          </div>
          {cardErrors.cardNumber && (
            <p className="mt-2 text-sm font-medium text-destructive">{cardErrors.cardNumber}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <FormLabel>有効期限</FormLabel>
            <div className="mt-2 rounded-md border border-input px-4">
              <CardExpiryElement
                options={cardOptions}
                onChange={(event) => handleCardChange(event, 'cardExpiry')}
              />
            </div>
            {cardErrors.cardExpiry && (
              <p className="mt-2 text-sm font-medium text-destructive">{cardErrors.cardExpiry}</p>
            )}
          </div>
          <div className="flex-1">
            <FormLabel>セキュリティコード</FormLabel>
            <div className="mt-2 rounded-md border border-input px-4">
              <CardCvcElement
                options={cardOptions}
                onChange={(event) => handleCardChange(event, 'cardCvc')}
              />
            </div>
            {cardErrors.cardCvc && (
              <p className="mt-2 text-sm font-medium text-destructive">{cardErrors.cardCvc}</p>
            )}
          </div>
        </div>

        <div className="flex w-full justify-around md:justify-center">
          <Button
            type="submit"
            size="lg"
            variant="lg"
            disabled={isLoading || !stripe || !isFormValid}
            className="h-[48px] w-full md:h-[55px] md:w-[392px]"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Typography as="bold" element="span" className="text-white hidden md:block">
                  お支払い方法を保存する
                </Typography>
                <Typography as="bold" element="span" className="text-white md:hidden">
                  保存
                </Typography>
              </>
            )}
          </Button>
        </div>
      </form>
    </FormComponent>
  );
}

export function PaymentForm(props: Props) {
  return (
    <Elements stripe={stripePromise}>
      <Form {...props} />
    </Elements>
  );
}
