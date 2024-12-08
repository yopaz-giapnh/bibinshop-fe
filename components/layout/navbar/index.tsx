import * as session from '@/features/auth/utils/session';
import { getTaxons } from '@/features/taxon/actions';
import { Header } from './header';
import { Menu } from './menu';

export async function Navbar() {
  const isSignedIn = await session.isSignedIn();

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <Header isSignedIn={isSignedIn} getTaxons={getTaxons()} />
      <div className="hidden md:block">
        <Menu getTaxons={getTaxons()} />
      </div>
    </div>
  );
}
