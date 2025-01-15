import { BrowseProductCardSkeleton } from './browse-product-card-skeleton';

export const BrowseProductGridSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <BrowseProductCardSkeleton key={index} />
    ))}
  </div>
);
