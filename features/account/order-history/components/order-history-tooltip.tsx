'use client';

import {
  TooltipProvider,
  Root,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow
} from '@radix-ui/react-tooltip';
import { Typography } from '@/components/ui/typography';
import { Plus } from 'lucide-react';

export default function OrderHistoryTooltip({ isPc }: { isPc: boolean }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Root open={isPc ? undefined : true}>
        <TooltipTrigger asChild>
          <Typography
            as="bold"
            element="p"
            className="pt-[8px] text-[16px] text-black-90 md:ml-[16px] md:pt-0"
          >
            注文履歴
          </Typography>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className="ml-7 select-none rounded-lg bg-bibinBlue-100 px-[10px] py-2 leading-none text-white-base shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
              will-change-[transform,opacity] md:ml-0"
            sideOffset={5}
            side={isPc ? 'right' : 'bottom'}
          >
            <div className="flex flex-row items-center gap-1">
              <Plus className="h-[12px] w-[12px] text-white-base" />
              <div className="flex flex-col items-start font-bold">
                {isPc ? (
                  <>
                    <Typography
                      element="p"
                      as="body"
                      className="text-[12px] font-bold text-white-base"
                    >
                      レビューで
                    </Typography>
                    <Typography
                      element="p"
                      as="body"
                      className="text-[12px] font-bold text-white-base"
                    >
                      ポイント獲得
                    </Typography>
                  </>
                ) : (
                  <Typography
                    element="p"
                    as="body"
                    className="text-[12px] font-bold text-white-base"
                  >
                    レビューでポイント獲得
                  </Typography>
                )}
              </div>
            </div>
            <TooltipArrow
              width={10}
              height={8}
              className="ml-7 fill-bibinBlue-100 text-[25px] md:ml-0"
            />
          </TooltipContent>
        </TooltipPortal>
      </Root>
    </TooltipProvider>
  );
}
