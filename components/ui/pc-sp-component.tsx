'use client';

import { useIsPc } from '@/hooks/use-is-pc';
import type { ReactNode } from 'react';

type PcSpComponentProps = {
  desktop: ReactNode;
  mobile: ReactNode;
};

export default function PcSpComponent({ desktop, mobile }: PcSpComponentProps) {
  const isPc = useIsPc();
  return isPc ? desktop : mobile;
}
