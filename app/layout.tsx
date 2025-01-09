import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { PropsWithChildren, Suspense } from 'react';
import { META } from './constants';
import { Providers } from './providers';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
});

export const metadata: Metadata = {
  title: 'bibin',
  description: 'bibin'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    //NOTE: 横のサイズが大きいコンポーネントの影響で横スクロールが発生するため、overflow-x-hiddenを一旦入れてます
    <html lang="ja" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="robots" content="noindex" />
        <meta name="google-site-verification" content={META.googleSiteVerification} />
      </head>
      <body
        className={cn(
          'overflow-x-hidden bg-background font-sans antialiased md:h-screen md:min-h-screen',
          notoSansJP.variable
        )}
      >
        <Providers>
          <Navbar />
          <Suspense>
            <main>{children}</main>
            <Toaster />
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
