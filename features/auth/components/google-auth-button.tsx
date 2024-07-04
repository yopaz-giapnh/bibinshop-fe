import { GoogleLogo } from '@/components/icons/google-logo';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Typography } from '@/components/ui/typography';
import { useFormStatus } from 'react-dom';

type Props = {
  title: string;
};

export function GoogleAuthButton({ title }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full border border-black-20 bg-white-base"
      size="lg"
      variant="lg"
      disabled={pending}
    >
      <div className="flex items-center justify-center gap-4">
        {pending ? (
          <LoadingSpinner color="#51B7FF" />
        ) : (
          <>
            <GoogleLogo />
            <Typography as="body" element="p" className="text-black-80">
              {pending ? <LoadingSpinner /> : title}
            </Typography>
          </>
        )}
      </div>
    </Button>
  );
}
