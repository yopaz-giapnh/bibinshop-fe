export { auth as middleware } from '@/auth';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|$|password-reset|password/change|login|signup|confirm|mobile|cart|privacy-policy|commercial-transactions|terms-of-use|products/.*|search|vendors/.*|_next/static|_next/image|sns|user-detail/.*|.*\\.png$).*)'
  ]
};
