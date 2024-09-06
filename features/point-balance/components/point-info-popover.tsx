import { Typography } from '@/components/ui/typography';
import * as Popover from '@radix-ui/react-popover';
import { CircleHelp } from 'lucide-react';

export function PointInfoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="ml-1 focus:outline-none"
          onMouseEnter={(e) => e.currentTarget.click()}
          onMouseLeave={(e) => e.currentTarget.click()}
        >
          <CircleHelp className="h-4 w-4" color="#51B7FF" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="mr-4 rounded-md border-[1px] bg-white-base p-4 shadow-md"
          sideOffset={5}
        >
          <div className="max-w-xs">
            <Typography as="bold" element="h3" className="mb-2 text-[14px] font-bold text-black-90">
              ポイントの獲得と使用方法
            </Typography>
            <Typography as="body" element="p" className="text-[14px] text-black-90">
              商品を購入するとポイントが貯まります。
              貯めたポイントは次回の購入時に利用できます。お得にショッピングを楽しみましょう！
            </Typography>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
