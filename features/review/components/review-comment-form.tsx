import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';

type ReviewCommentFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 10;

export function ReviewCommentForm({ value, onChange, onSubmit }: ReviewCommentFormProps) {
  return (
    <div className="w-full">
      <div className="absolute left-0 w-full border-t border-gray-200" />
      <div className="mt-4 flex items-center">
        <Typography as="boldSmall" element="p">
          コメント
        </Typography>
        <Typography as="small" element="p" className="text-gray-500">
          （{MIN_COMMENT_LENGTH}文字以上{MAX_COMMENT_LENGTH}文字以内）
        </Typography>
      </div>
      <div className="mt-2 flex w-full flex-col gap-2">
        <Textarea
          placeholder="コメント"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.length <= MAX_COMMENT_LENGTH) {
              onChange(newValue);
            }
          }}
          className="h-[40px] min-h-[40px] flex-grow resize-none bg-gray-100 py-2"
          maxLength={MAX_COMMENT_LENGTH}
        />
        <div className="flex items-center justify-between">
          <Typography as="small" element="p" className="text-gray-500">
            {value.length}/{MAX_COMMENT_LENGTH}文字
          </Typography>
          <Button
            className="h-[40px]"
            onClick={onSubmit}
            disabled={
              !value.trim() ||
              value.length < MIN_COMMENT_LENGTH ||
              value.length > MAX_COMMENT_LENGTH
            }
          >
            投稿
          </Button>
        </div>
      </div>
    </div>
  );
}
