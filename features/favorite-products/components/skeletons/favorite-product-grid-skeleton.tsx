import { FavoriteProductCardSkeleton } from './favorite-product-card-skeleton';

export const FavoriteProductGridSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <FavoriteProductCardSkeleton key={index} />
    ))}
  </div>
);
