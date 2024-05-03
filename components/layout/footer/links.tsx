import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

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
  return (
    <div className="flex justify-between">
      {components.map((component) => (
        <div key={component.title} className="flex flex-col">
          <Typography as="subTitle" element="h2">
            {component.title}
          </Typography>
          <div className="mt-4 flex flex-col gap-4">
            {component.links.map((link) => (
              <Link key={link.label} href={link.href || '#'}>
                <Typography as="caption" element="p">
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
