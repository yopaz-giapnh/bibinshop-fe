import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// TODO: API でなんのソートができるか確認
export function SortButton() {
  return (
    <Select defaultValue="ranking">
      <SelectTrigger className="w-[180px] rounded-full border border-bibinBlue-100 text-bibinBlue-100 focus:outline-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ranking" className="w-[180px] text-bibinBlue-100">
            ランキング順
          </SelectItem>
          <SelectItem value="review" className="w-[180px] text-bibinBlue-100">
            ベストセラー
          </SelectItem>
          <SelectItem value="new" className="w-[180px] text-bibinBlue-100">
            新着
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
