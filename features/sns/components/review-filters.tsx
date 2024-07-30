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
    <div className="scrollbar-hide w-full overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-2 p-2 md:mb-[16px] md:justify-center">
        {reviewFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`flex-shrink-0 rounded-full border-[1px] border-black-50 px-4 py-2 ${
              selectedFilter === filter.value
                ? 'bg-primary text-white-base'
                : 'bg-white text-black-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
