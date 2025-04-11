import { Copyright } from './copyright';
import { Links } from './links';
// import { Menu } from './menu';

export function Footer() {
  return (
    <>
      {/*<Menu />*/}
      <div className="pb-[70px] pt-[16px] md:px-[150px] md:pb-[19px]">
        <Links />
        <div className="mt-12">
          <Copyright />
        </div>
      </div>
    </>
  );
}
