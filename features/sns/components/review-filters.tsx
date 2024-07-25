import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const reviewFilters = [
  { label: 'すべてのレビュー', value: 'all' },
  { label: '星5つ', value: '5' },
  { label: '星4つ', value: '4' },
  { label: '星3つ', value: '3' },
  { label: '星2つ', value: '2' },
  { label: '星1つ', value: '1' }
];

interface ReviewFiltersProps {
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

export function ReviewFilters({ selectedFilter, onFilterChange }: ReviewFiltersProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex justify-center space-x-2 p-2 md:mb-[16px]">
        {reviewFilters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="border-black-40 rounded-full border-[1px] px-4 py-2"
            variant={selectedFilter === filter.value ? 'default' : 'outline'}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
