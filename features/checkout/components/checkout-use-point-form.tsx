'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface CheckoutUsePointFormProps {
  availablePoints: number;
}

export function CheckoutUsePointForm({ availablePoints }: CheckoutUsePointFormProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [appliedPoints, setAppliedPoints] = useState('');

  const formSchema = z.object({
    points: z.string().refine(
      (val) => {
        const numVal = Number(val);
        return !isNaN(numVal) && numVal > 0 && numVal <= availablePoints;
      },
      {
        message: '有効なポイント数を入力してください'
      }
    )
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      points: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (values: FormValues) => {
    setIsApplied(true);
    setAppliedPoints(values.points);
    toast({
      title: 'ポイントが適用されました'
    });
  };

  const handleUseAllPoints = () => {
    form.setValue('points', availablePoints.toString(), { shouldValidate: true });
    setIsApplied(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^\d]/g, '');
    form.setValue('points', numericValue, { shouldValidate: true });
    if (numericValue !== appliedPoints) {
      setIsApplied(false);
    }
  };

  useEffect(() => {
    if (form.formState.isDirty) {
      setIsApplied(false);
    }
  }, [form.formState.isDirty]);

  const isButtonDisabled = !form.formState.isValid || form.formState.errors.points !== undefined;

  return (
    <div className="rounded-[6px] bg-white-base p-4 shadow-sm">
      <div className="mb-2 flex items-center">
        <Typography as="boldSmall" element="p" className="text-[14px] text-black-90">
          保有ポイント：
        </Typography>
        <Typography as="boldSmall" element="p" className="text-[14px] text-bibinBlue-100">
          {availablePoints.toLocaleString()}pt
        </Typography>
        <button
          type="button"
          onClick={handleUseAllPoints}
          className="ml-[16px] rounded-full border-[1px] border-bibinBlue-100 px-3 py-1"
        >
          <Typography as="boldSmall" element="p" className="text-[14px] text-bibinBlue-100">
            全て使用
          </Typography>
        </button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/2">
          <div className="flex items-start space-x-2">
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      {...field}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-11/12 md:w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isApplied ? (
              <Typography
                as="boldSmall"
                element="p"
                className="mt-[2px] w-3/12 py-2 text-[14px] text-bibinBlue-100"
              >
                適用済み
              </Typography>
            ) : (
              <Button type="submit" disabled={isButtonDisabled} className="mt-[2px] px-[30px]">
                適用
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
