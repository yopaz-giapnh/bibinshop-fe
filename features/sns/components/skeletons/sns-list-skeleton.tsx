import { SnsUserCardSkeleton } from './sns-user-skeleton';

export const SnsListSkeleton = () => (
  <div className="w-full space-y-4">
    {/* ユーザーカードリスト */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <SnsUserCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
