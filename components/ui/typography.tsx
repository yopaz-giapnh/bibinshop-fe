// ref: https://github.com/shadcn-ui/ui/pull/363

import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const typographyVariants = cva('text-foreground', {
  variants: {
    as: {
      title: 'text-black-base text-2xl font-bold not-italic leading-normal tracking-[0.72px]',
      subTitle: 'text-black-90 text-base font-black not-italic leading-normal tracking-[0.9px]',
      caption: 'text-black-70 text-sm  font-normal not-italic leading-normal tracking-[0.42px]',
      xSmall: 'text-black-base text-xs font-medium not-italic leading-4 tracking-[0.36px]',
      small: 'text-text text-sm font-medium not-italic leading-normal tracking-[0.42px]',
      linkXSmall: 'text-black-80 text-xs font-bold not-italic leading-normal tracking-[0.36px]',
      linkBase:
        'text-paleFrostBlue text-base font-black not-italic leading-normal tracking-[0.9px]',
      linkSmall: 'text-paleFrostBlue text-sm font-bold not-italic leading-normal tracking-[0.42px]',
      body: 'text-black-50 text-base font-normal not-italic leading-normal tracking-[0.48px]',
      bold: 'text-black-base text-base font-bold not-italic leading-normal tracking-[0.48px]'
    }
  }
});

type Element = keyof JSX.IntrinsicElements;

type TypographyProps<T extends Element> = {
  element: T;
} & VariantProps<typeof typographyVariants> &
  React.HTMLAttributes<HTMLElement>;

const Typography = React.forwardRef(
  <T extends Element>(
    { className, element, as, ...props }: TypographyProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component = element;

    const componentProps = {
      className: cn(typographyVariants({ as, className })),
      ref,
      ...props
    };

    return React.createElement(Component, componentProps);
  }
);

Typography.displayName = 'Typography';

export { Typography };
