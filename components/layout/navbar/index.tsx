'use client';

import { Header } from './header';
import { Menu } from './menu';

export function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <Header />
      <Menu />
    </div>
  );
}
