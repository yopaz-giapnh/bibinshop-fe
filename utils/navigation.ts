import { redirect } from 'next/navigation';

export function redirectToTop() {
  return redirect('/');
}
