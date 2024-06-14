'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  totalPages: number;
};

const MAX_PAGES_TO_SHOW = 3; // 中央に表示するページリンクの最大数

export default function CustomPagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const startPage = Math.max(currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2), 1);
  const endPageToShow = Math.min(startPage + MAX_PAGES_TO_SHOW - 1, totalPages);

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-[24px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href={getPageLink(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        {startPage > 1 && (
          <PaginationItem>
            <PaginationLink href={getPageLink(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {startPage > 2 && <PaginationItem>...</PaginationItem>}
        {Array.from({ length: endPageToShow - startPage + 1 }, (_, i) => startPage + i).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink href={getPageLink(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {endPageToShow < totalPages - 1 && <PaginationItem>...</PaginationItem>}
        {endPageToShow < totalPages && (
          <PaginationItem>
            <PaginationLink href={getPageLink(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={getPageLink(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
