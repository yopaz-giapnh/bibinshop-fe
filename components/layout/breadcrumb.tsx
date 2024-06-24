'use client';

import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import React from 'react';

type Menu = {
  name: string;
  url: string;
};

type Props = {
  menus: Menu[];
};

export function Breadcrumb({ menus }: Props) {
  return (
    <BreadcrumbComponent className="hidden pb-[14px] pt-4 md:block">
      <BreadcrumbList>
        {menus.map((menu, index) => {
          const isLast = index === menus.length - 1;
          return (
            <React.Fragment key={menu.name}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink href={menu.url} passHref className={isLast ? 'text-black-80' : ''}>
                  {menu.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}
