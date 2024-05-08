export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api|$|login|signup|cart|privacy-policy|terms-of-service|products/.*|_next/static|_next/image|.*\\.png$).*)'
  ]
};
