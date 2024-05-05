'use client';

import { ClosedEye } from '@/components/icons/closed-eye';
import { OpenedEye } from '@/components/icons/opened-eye';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/email-and-password-form';

type Props = {
  control: Control<FormValues>;
};

export function PasswordFormField({ control }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem className="mt-4">
          <FormLabel>パスワード</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                className="pr-10"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
              />
              <button
                className="absolute right-0 top-0 h-12 p-2"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <OpenedEye /> : <ClosedEye />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
