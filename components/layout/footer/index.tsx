import { Copyright } from './copyright';
import { Links } from './links';
import { Menu } from './menu';

export function Footer() {
  return (
    <>
      <Menu />
      <div className="mt-auto pb-[19px] pt-[42px] md:px-[150px]">
        <Links />
        <div className="mt-12">
          <Copyright />
        </div>
      </div>
    </>
  );
}
