'use client';

import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/lib/i18n';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type SectionKey = 'company' | 'service';

export function Links() {
  const { t } = useTranslation();
  const components: {
    key: SectionKey;
    title: string;
    links: { label: string; href?: string }[];
  }[] = [
    {
      key: 'company',
      title: t('footer.links.company.title'),
      links: [
        { label: t('footer.links.company.overview'), href: 'https://bibin.jp/' },
        { label: t('footer.links.company.bibinews'), href: 'https://bibinews.jp/' },
        { label: t('footer.links.company.contact'), href: 'https://bibin.jp/contact' }
      ]
    },
    {
      key: 'service',
      title: t('footer.links.service.title'),
      links: [
        {
          label: t('footer.links.service.faq'),
          href: 'https://www.notion.so/V2-QA-17ee1d9eac628007b356e4d52a654ae8'
        },
        {
          label: t('footer.links.service.shopContact'),
          href: 'https://forms.gle/te2rmGm1iYRALgun9'
        },
        { label: t('footer.links.service.terms'), href: '/terms-of-use' },
        { label: t('footer.links.service.privacy'), href: '/privacy-policy' },
        { label: t('footer.links.service.transactions'), href: '/commercial-transactions' }
      ]
    }
  ];

  const [openSections, setOpenSections] = useState<{ [key in SectionKey]?: boolean }>({});

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="md:flex md:justify-end md:gap-5">
      {components.map((component) => (
        <div key={component.key} className="mb-4 flex flex-col md:mb-0">
          <button
            onClick={() => toggleSection(component.key)}
            className="flex w-full items-center justify-between border-b border-gray-100 pb-4 text-left md:hidden"
          >
            <Typography as="subTitle" element="h2" className="ml-[16px]">
              {component.title}
            </Typography>
            <span className="mr-[16px]">
              {openSections[component.key] ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </span>
          </button>
          <div
            className={`mt-4 flex flex-col gap-4 ${openSections[component.key] ? 'block' : 'hidden'} md:block`}
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
