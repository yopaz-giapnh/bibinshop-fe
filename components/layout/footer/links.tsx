'use client';

import { Typography } from '@/components/ui/typography';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import useMedia from 'use-media';

const components: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: 'BIBINについて',
    links: [{ label: 'リンク1', href: '/about' }, { label: 'リンク2' }, { label: 'リンク3' }]
  },
  {
    title: 'カスタマサービス',
    links: [{ label: 'リンク1', href: '/about' }, { label: 'リンク2' }, { label: 'リンク3' }]
  },
  {
    title: 'ヘルプ',
    links: [{ label: 'リンク1', href: '/about' }, { label: 'リンク2' }, { label: 'リンク3' }]
  },
  {
    title: '会社情報',
    links: [{ label: 'リンク1', href: '/about' }, { label: 'リンク2' }, { label: 'リンク3' }]
  },
  {
    title: 'サービス',
    links: [{ label: 'リンク1', href: '/about' }, { label: 'リンク2' }, { label: 'リンク3' }]
  }
];

export function Links() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const isPc = useMedia({ minWidth: '768px' });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="md:flex md:justify-between">
      {components.map((component) => (
        <div key={component.title} className="mb-4 flex flex-col md:mb-0">
          <button
            onClick={() => toggleSection(component.title)}
            className="flex w-full items-center justify-between border-b border-gray-100 pb-4 text-left md:hidden"
          >
            <Typography as="subTitle" element="h2" className="ml-[16px]">
              {component.title}
            </Typography>
            <span className="mr-[16px]">
              {openSections[component.title] ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </span>
          </button>
          <div
            className={`mt-4 flex flex-col gap-4 ${isPc ? 'block' : openSections[component.title] ? 'block' : 'hidden'}`}
          >
            <Typography as="subTitle" element="h2" className="hidden md:block">
              {component.title}
            </Typography>
            {component.links.map((link) => (
              <Link key={link.label} href={link.href || '#'} passHref>
                <Typography as="caption" element="p" className="pl-[16px] md:pl-0">
                  {link.label}
                </Typography>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
