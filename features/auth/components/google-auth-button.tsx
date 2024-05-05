import { GoogleLogo } from '@/components/icons/google-logo';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

type Props = {
  title: string;
  onClick: () => void;
};

export function GoogleAuthButton({ title, onClick }: Props) {
  return (
    <Button
      type="button"
      className="w-full border border-black-20 bg-white-base"
      size="lg"
      variant="lg"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4">
        <GoogleLogo />
        <Typography as="body" element="p" className="text-black-80">
          {title}
        </Typography>
      </div>
    </Button>
  );
}
