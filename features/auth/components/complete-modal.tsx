import BibismilingFace from '@/assets/bibincban/smiling-face.svg';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';
import { Dialog } from '@radix-ui/react-dialog';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  onClick: () => void;
};

export default function CompleteModal({ open, setOpen, title, onClick }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogDescription>
        <DialogContent
          className="flex w-[440px] flex-col items-center justify-center pb-[24px]"
          hideCloseButton
        >
          <Typography as="bold" element="p" className="mb-[24px] text-[20px] text-black-90">
            {title}
          </Typography>
          <BibismilingFace />
          <Button
            size="lg"
            variant="lg"
            type="submit"
            className="mt-[24px] w-full"
            onClick={onClick}
          >
            今すぐ買い物へ
          </Button>
        </DialogContent>
      </DialogDescription>
    </Dialog>
  );
}
