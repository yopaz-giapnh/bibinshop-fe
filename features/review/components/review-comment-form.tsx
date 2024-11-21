import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';

type ReviewCommentFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ReviewCommentForm({ value, onChange, onSubmit }: ReviewCommentFormProps) {
  return (
    <div className="w-full">
      <div className="absolute left-0 w-full border-t border-gray-200" />
      <Typography as="boldSmall" element="p" className="mt-4">
        コメント
      </Typography>
      <div className="mt-2 flex w-full gap-2">
        <Textarea
          placeholder="コメント"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[40px] min-h-[40px] flex-grow resize-none bg-gray-100 py-2"
        />
        <Button className="h-[40px]" onClick={onSubmit} disabled={!value.trim()}>
          投稿
        </Button>
      </div>
    </div>
  );
}
