'use client';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { useAuth } from '@/hooks/use-auth';
import { Dialog } from '@radix-ui/react-dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';

export type OrderReceiptPreviewModalRef = {
  open: (orderId: string, vendorId: number) => void;
  close: () => void;
};

export const OrderReceiptPreviewModal = forwardRef<OrderReceiptPreviewModalRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const { user } = useAuth();

  useImperativeHandle(ref, () => ({
    open: async (orderId: string, vendorId: number) => {
      setIsOpen(true);

      try {
        const token = user?.accessToken;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${baseUrl}/api/v2/storefront/orders/${orderId}/receipts/${vendorId}`,
          {
            headers: {
              Accept: 'application/pdf',
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!res.ok) throw new Error('PDFの取得に失敗しました');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Failed to load PDF:', error);
      }
    },
    close: () => {
      setIsOpen(false);
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl('');
      }
    }
  }));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription>
        <DialogContent className="flex w-11/12 flex-col items-center justify-center md:w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold text-black-90">
              領収書プレビュー
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 h-[600px] w-full overflow-auto">
            {pdfUrl ? (
              <iframe
                src={pdfUrl + '#navpanes=0&toolbar=0&view=FitH'}
                className="h-full w-full"
                title="領収書プレビュー"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Typography as="caption" element="p" className="text-[14px] text-black-90">
                  領収書を読み込み中...
                </Typography>
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-[24px]">
            <Button
              className="h-[48px] w-[150px] border border-bibinBlue-100 bg-white-base md:h-[55px] md:w-[200px]"
              size="lg"
              variant="lg"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Typography as="bold" element="p" className="text-bibinBlue-100">
                閉じる
              </Typography>
            </Button>
            <Button
              className="h-[48px] w-[150px] md:h-[55px] md:w-[200px]"
              size="lg"
              variant="lg"
              onClick={() => {
                const printWindow = window.open(pdfUrl, '_blank');
                if (!printWindow) return;

                // 読み込み完了後に印刷ダイアログを起動
                printWindow.addEventListener('load', () => {
                  printWindow.focus();
                  printWindow.print();
                });
                setIsOpen(false);
              }}
              type="button"
            >
              <Typography as="bold" element="p" className="text-white-base">
                ダウンロード
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
});

OrderReceiptPreviewModal.displayName = 'OrderReceiptPreviewModal';
