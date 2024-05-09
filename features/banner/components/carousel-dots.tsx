import clsx from 'clsx';

type Props = {
  count: number;
  current: number;
};

export function CarouselDots({ count, current }: Props) {
  return (
    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 transform space-x-2">
      {Array.from({ length: count }).map((_, index) => {
        const isCurrent = index === current - 1;

        return (
          <div
            key={index}
            className={clsx(
              'h-2 w-2 rounded-full',
              isCurrent ? 'bg-bibinBlue-100' : 'bg-white-base'
            )}
          />
        );
      })}
    </div>
  );
}
