'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Typography } from '@/components/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FilterSchema = z.object({
  categories: z.array(z.string()).nonempty({ message: 'At least one category must be selected.' })
});

const categoriesList = [
  'スキンケア',
  'キット・コフレ・福袋',
  'ドラッグストア',
  'メンズビューティー',
  'ボディ・ハンド・フットケア',
  'ベビー・マタニティ',
  'ベースメイク',
  'UVケア',
  'ヘア',
  'メイク小物',
  '健康食品・サプリ'
];

export function FilterForm() {
  const form = useForm({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      categories: []
    }
  });

  // TODO: カテゴリーの選択状態が変わるたびにクエリパラメーターを更新する

  // TODO: 価格も一円単位で変わった場合にクエリパラメーターを更新するかどうか検討(form 使うかどうか)
  function onSubmit(data) {
    console.log(data);
  }

  function onClear() {
    form.reset({ categories: [] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[216px] space-y-6">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <Typography
                as="linkSmall"
                element="p"
                className="mb-[20px] text-[20px] text-black-80"
              >
                絞り込み
              </Typography>
              <div className="mb-2 flex items-center justify-between">
                <FormLabel className="text-[16px]">カテゴリー</FormLabel>
                <button type="button" onClick={onClear}>
                  <Typography
                    as="body"
                    element="p"
                    className="text-[16px] font-bold text-bibinBlue-100"
                  >
                    すべてクリア
                  </Typography>
                </button>
              </div>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  {categoriesList.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        value={category}
                        checked={field.value.includes(category)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            field.onChange([...field.value, category]);
                          } else {
                            field.onChange(field.value.filter((v) => v !== category));
                          }
                        }}
                        id={`category-${index}`}
                      />
                      <Typography as="body" element="p" className="text-[14px] text-black-80">
                        {category}
                      </Typography>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
