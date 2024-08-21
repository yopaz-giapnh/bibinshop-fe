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
import { Check, X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CouponSheetItem } from './coupon-sheet-item';

export type CouponSheetRef = {
  open: () => void;
  close: () => void;
};

const formSchema = z.object({
  couponCode: z.string().min(1, { message: 'クーポンコードが正しくありません' })
});

type FormValues = z.infer<typeof formSchema>;

// クーポン情報の型定義
interface CouponInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  expirationDate: string;
  isSelectable: boolean;
}

// デモデータ
const demoCoupons: CouponInfo[] = [
  {
    id: '1',
    code: 'SUMMER10',
    title: '夏季限定10%オフ',
    description: '7,000円以上購入で使用可能(特価商品を除く)',
    discount: '10% OFF',
    expirationDate: '2024/08/31まで',
    isSelectable: true
  },
  {
    id: '2',
    code: 'WELCOME20',
    title: '新規会員登録20%オフ',
    description: '3,000円以上購入で使用可能(特価商品を除く)',
    discount: '20% OFF',
    expirationDate: '2024/12/31まで',
    isSelectable: false
  },
  {
    id: '3',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  },
  {
    id: '4',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  },
  {
    id: '5',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  },
  {
    id: '6',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  },
  {
    id: '7',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  },
  {
    id: '8',
    code: 'BIGSALE30',
    title: '大型セール30%オフ',
    description: '5,000円以上購入で使用可能(特価商品を除く)',
    discount: '30% OFF',
    expirationDate: '2024/09/30まで',
    isSelectable: true
  }
];

export const CouponSheet = forwardRef<CouponSheetRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  const onClose = () => setIsOpen(false);

  const onSubmit = async (values: FormValues) => {
    // TODO: ここでクーポンコードの検証や適用のロジックを実装
    console.log(values);
    toast({
      title: 'クーポンが追加されました',
      icon: <Check className="h-6 w-6" />
    });
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

  const handleCouponUse = () => {
    // TODO: ここでクーポン適用のロジックを実装
    // TODO: エラー時のtoastもじっそ
    toast({
      title: 'クーポンが適用されました',
      icon: <Check className="h-6 w-6" />
    });
    clearSelectedCoupon();
    onClose();
  };

  return (
    <Sheet open={isOpen}>
      <SheetContent onBackgroundClick={onClose}>
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
          {demoCoupons.length === 0 ? (
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
                      {demoCoupons.map((coupon) => (
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
