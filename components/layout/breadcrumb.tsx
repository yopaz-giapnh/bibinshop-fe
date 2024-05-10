import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

type Menu = {
  name: string;
  url: string;
};

type Props = {
  menus: Menu[];
};

export function Breadcrumb({ menus }: Props) {
  return (
    <BreadcrumbComponent className="pb-[14px] pt-4">
      <BreadcrumbList>
        {menus.map((menu, index) => {
          const isLast = index === menus.length - 1;

          return (
            <BreadcrumbItem key={menu.name}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbLink href={menu.url} passHref isLast={isLast}>
                {menu.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}
