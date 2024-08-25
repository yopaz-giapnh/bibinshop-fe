import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { getOrder } from '@/features/account/order-history/actions';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cancelOrder } from '../actions';

type Props = {
  order: NonNullable<Awaited<ReturnType<typeof getOrder>>>;
};

export function CancelOrderButton({ order }: Props) {
  const canCancel = useMemo(() => {
    if (!order) {
      return false;
    }
    if (order.cancellationRequests.length > 0) {
      return false;
    }
    if (order.attributes.state !== 'complete') {
      return false;
    }
    return (
      order.attributes.state === 'complete' &&
      ['ready', 'pending', 'backorder'].some((s) => s === order.attributes.shipment_state)
    );
  }, [order]);
  const cancellationRequested = useMemo(() => order.cancellationRequests.length > 0, [order]);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');

  if (cancellationRequested) {
    return (
      <Button className="ml-auto" disabled>
        キャンセル済み
      </Button>
    );
  }

  return (
    <>
      <Button className="ml-auto" disabled={!canCancel} onClick={() => setIsOpen(true)}>
        キャンセル
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogDescription>
          <DialogContent
            hideCloseButton
            className="flex h-[calc(150vw-80px)] w-11/12 flex-col items-center overflow-y-auto md:h-modal-screen-calc"
          >
            <div className="w-full justify-center">
              <div className="flex w-full items-center justify-between pb-[24px]">
                <div className="h-7 w-7 md:hidden" />
                <Typography
                  as="title"
                  element="h2"
                  className="text-center text-[16px] md:text-left md:text-[24px]"
                >
                  キャンセル理由
                </Typography>
                <DialogClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
            </div>

            <Textarea
              placeholder="キャンセル理由を入力してください"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Button
              className="ml-auto"
              onClick={async () =>
                (await cancelOrder({ orderId: order.id, reason })) ? setIsOpen(false) : undefined
              }
            >
              送信
            </Button>
          </DialogContent>
        </DialogDescription>
      </Dialog>
    </>
  );
}
