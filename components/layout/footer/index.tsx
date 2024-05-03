import { Copyright } from './copyright';
import { Links } from './links';
import { Menu } from './menu';

export function Footer() {
  return (
    <>
      <Menu />
      <div className="mt-auto px-[150px] pb-[19px] pt-[42px]">
        <Links />
        <div className="mt-12">
          <Copyright />
        </div>
      </div>
    </>
  );
}
