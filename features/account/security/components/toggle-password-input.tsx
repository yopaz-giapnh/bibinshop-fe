import { ClosedEye } from '@/components/icons/closed-eye';
import { OpenedEye } from '@/components/icons/opened-eye';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormValues } from '../types/security-detail';

type Props = {
  label: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  control: Control<FormValues>;
  name: keyof FormValues;
};

/**
 * パスワード表示・非表示切り替えinputコンポーネント
 * @returns JSX.Element
 */
export default function TogglePasswordInput({
  label,
  showPassword,
  toggleShowPassword,
  control,
  name
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                className="pr-10"
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
              />
              <button
                className="absolute right-0 top-0 h-12 p-2"
                type="button"
                onClick={toggleShowPassword}
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
