import * as session from '@/features/auth/utils/session';
import { Header } from './header';
import { Menu } from './menu';

export async function Navbar() {
  const isSignedIn = await session.isSignedIn();

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <Header isSignedIn={isSignedIn} />
      <Menu />
    </div>
  );
}
