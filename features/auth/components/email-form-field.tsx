'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/email-and-password-form';

type Props = {
  control: Control<FormValues>;
};

export function EmailFormField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>メールアドレス</FormLabel>
          <FormControl>
            <Input {...field} autoComplete="username" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
