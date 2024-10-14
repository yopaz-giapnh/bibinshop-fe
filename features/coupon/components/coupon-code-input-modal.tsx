'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeAlert, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { applyCoupon } from '../actions';

export type CouponCodeInputModalRef = {
  open: () => void;
  close: () => void;
};

const formSchema = z.object({
  couponCode: z.string().min(1, { message: 'クーポンコードが正しくありません' })
});

type FormValues = z.infer<typeof formSchema>;

export const CouponCodeInputModal = forwardRef<CouponCodeInputModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      couponCode: ''
    }
  });

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  const onSubmit = async (values: FormValues) => {
    const { success, message } = await applyCoupon(values.couponCode);
    if (success) {
      toast({
        title: message,
        icon: <Check className="h-6 w-6" />
      });
      router.refresh();
    } else {
      toast({
        title: message,
        className: 'bg-error',
        icon: <BadgeAlert className="h-6 w-6" />
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex flex-col items-center">
          <Typography as="bold" element="h2" className="mb-4 text-center text-lg">
            クーポンコードを入力
          </Typography>
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
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full rounded-full border-[1px] border-bibinBlue-100 px-12 py-2 font-semibold text-bibinBlue-100 md:mt-4 md:w-fit md:px-16 md:py-4"
          >
            キャンセル
          </button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

CouponCodeInputModal.displayName = 'CouponCodeInputModal';
