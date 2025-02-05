'use server';

import * as session from '@/features/auth/utils/session';
import { ComponentProps } from 'react';
import { ProductOverview } from './product-overview';

type Props = Omit<ComponentProps<typeof ProductOverview>, 'isSignedIn'>;

export async function ProductOverviewServer(props: Props) {
  const isSignedIn = await session.isSignedIn();

  return <ProductOverview {...props} isSignedIn={isSignedIn} />;
}
