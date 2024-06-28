export { auth as middleware } from '@/auth';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|$|password-reset|password/change|login|signup|confirm|cart|privacy-policy|terms-of-service|products/.*|search|vendors/.*|_next/static|_next/image|.*\\.png$).*)'
  ]
};
