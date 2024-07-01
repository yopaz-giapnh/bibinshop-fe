'use client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
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
    const pageToSet = page <= 0 ? 1 : page > totalPages ? totalPages : page;
    params.set('page', pageToSet.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-[24px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getPageLink(currentPage - 1)} disable={currentPage === 1} />
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
              <PaginationLink
                href={getPageLink(page)}
                isActive={page === currentPage}
                disable={page === currentPage}
              >
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
          <PaginationNext
            href={getPageLink(currentPage + 1)}
            disable={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
