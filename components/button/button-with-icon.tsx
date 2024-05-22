import clsx from 'clsx';
import { Typography } from '../ui/typography';

type Props = {
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
  icon: React.ReactNode;
  text: string;
  textProps?: Omit<React.ComponentProps<typeof Typography>, 'as' | 'element'>;
};

export function ButtonWithIcon({ buttonProps, icon, text, textProps }: Props) {
  return (
    <button {...buttonProps} className={clsx('flex items-center gap-1', buttonProps?.className)}>
      {icon}
      <Typography as="linkSmall" element="span" className="text-black-80" {...textProps}>
        {text}
      </Typography>
    </button>
  );
}
