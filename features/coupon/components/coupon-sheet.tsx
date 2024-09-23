'use client';

import BibiVacantFace from '@/assets/bibincban/vacant-face.svg';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { BadgeAlert, Check, X } from 'lucide-react';
import { forwardRef, use, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { applyCoupon, cartAddCoupon, getCoupons } from '../actions';
import { CouponSchema } from '../types';
import { CouponSheetItem } from './coupon-sheet-item';

export type CouponSheetRef = {
  open: () => void;
  close: () => void;
};

const formSchema = z.object({
  couponCode: z.string().min(1, { message: 'クーポンコードが正しくありません' })
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  getCoupons: ReturnType<typeof getCoupons>;
};

export const CouponSheet = forwardRef<CouponSheetRef, Props>(({ getCoupons }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<CouponSchema[]>([]);
  const fetchCoupons = getCoupons ? use(getCoupons) : [];

  useImperativeHandle(ref, () => ({
    open: async () => {
      setIsOpen(true);
      setCoupons(fetchCoupons || []);
    },
    close: () => setIsOpen(false)
  }));

  const onClose = () => setIsOpen(false);

  const onSubmit = async (values: FormValues) => {
    const { success, message } = await applyCoupon(values.couponCode);
    if (success) {
      toast({
        title: message,
        icon: <Check className="h-6 w-6" />
      });
    } else {
      toast({
        title: message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      couponCode: ''
    }
  });

  const clearSelectedCoupon = () => {
    setSelectedCouponId(null);
  };

  const handleCouponUse = async () => {
    if (!selectedCouponId) return;
    const { success } = await cartAddCoupon(selectedCouponId);
    if (success) {
      toast({
        title: 'クーポンが適用されました',
        icon: <Check className="h-6 w-6" />
      });
      clearSelectedCoupon();
      onClose();
    } else {
      toast({
        title: 'クーポンの追加に失敗しました',
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
      clearSelectedCoupon();
      onClose();
    }
  };

  return (
    <Sheet open={isOpen}>
      <SheetContent onBackgroundClick={onClose} className="w-11/12 md:w-1/4">
        <div className="flex h-full flex-col">
          <div className="flex justify-between border-b border-black-10 p-[24px]">
            <Typography as="title" element="h1" className="text-text-80">
              クーポン適用
            </Typography>
            <button onClick={onClose}>
              <X className="relative h-[24px] w-[24px]" />
            </button>
          </div>
          <div className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>クーポンコードを入力してください</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input {...field} placeholder="クーポンコード" />
                        </FormControl>
                        <Button
                          type="submit"
                          className="ml-2 px-8 py-2 font-semibold"
                          disabled={!form.watch('couponCode')}
                        >
                          追加
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          {coupons.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <BibiVacantFace />
              <Typography as="small" element="p" className="mt-[24px] text-[16px] text-black-90">
                クーポンはありません
              </Typography>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between bg-slate-100 p-3">
                <Typography as="bold" element="p" className="text-text-90 text-[14px]">
                  1つのクーポンを選択できます。
                </Typography>
                <button onClick={clearSelectedCoupon}>
                  <Typography as="bold" element="p" className="text-[14px] text-bibinBlue-100">
                    クリア
                  </Typography>
                </button>
              </div>
              <div className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                  <RadioGroup
                    value={selectedCouponId || ''}
                    onValueChange={(value) => setSelectedCouponId(value)}
                    className="flex-grow overflow-hidden"
                  >
                    <div className="flex flex-col">
                      {coupons.map((coupon) => (
                        <div key={coupon.id}>
                          <CouponSheetItem coupon={coupon} />
                          <div className="border-b" />
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </ScrollArea>
              </div>
            </>
          )}
          <div className="bg-white border-t border-black-10 p-6">
            <Button
              size="lg"
              variant="lg"
              className="w-full"
              disabled={!selectedCouponId}
              onClick={handleCouponUse}
            >
              クーポンを使用する
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

CouponSheet.displayName = 'CouponSheet';
