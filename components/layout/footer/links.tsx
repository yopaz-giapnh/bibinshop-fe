'use client';

import { Typography } from '@/components/ui/typography';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const components: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: 'bibinについて',
    links: [
      // TODO: リンク先を変更する
      { label: 'リンク1', href: '/' },
      { label: 'リンク2' },
      { label: 'リンク3' }
    ]
  },
  {
    title: 'カスタマサービス',
    links: [
      // TODO: リンク先を変更する
      { label: 'リンク1', href: '/' },
      { label: 'リンク2' },
      { label: 'リンク3' }
    ]
  },
  {
    title: 'ヘルプ',
    links: [
      // TODO: リンク先を変更する
      { label: 'リンク1', href: '/' },
      { label: 'リンク2' },
      { label: 'リンク3' }
    ]
  },
  {
    title: '会社情報',
    links: [
      { label: '利用規約', href: '/terms-of-use' },
      { label: 'プライバシーポリシー', href: '/privacy-policy' },
      { label: '特定商取引法に基づく表記', href: '/commercial-transactions' }
    ]
  },
  {
    title: 'サービス',
    links: [
      // TODO: リンク先を変更する
      { label: 'リンク1', href: '/' },
      { label: 'リンク2' },
      { label: 'リンク3' }
    ]
  }
];

export function Links() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

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
            className={`mt-4 flex flex-col gap-4 ${openSections[component.title] ? 'block' : 'hidden'} md:block`}
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
