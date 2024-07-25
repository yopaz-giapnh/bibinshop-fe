import { Command, CommandInput } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

export function SnsInputSortBar() {
  return (
    <div className="mt-[24px] flex w-full flex-col items-center justify-center px-[8px] md:flex-row md:justify-between">
      <Command className="w-full bg-paleFrostBlue">
        <CommandInput
          placeholder="例：普通肌・ニキビ・毛穴"
          className="rounded-[44px] border-2 border-bibinBlue-100 bg-white-base md:w-2/3"
        />
      </Command>
      <Select>
        <SelectTrigger className="mt-[8px] h-[48px] w-[300px] rounded-full border-[1px] border-bibinBlue-100 bg-paleFrostBlue px-[24px] py-[4px] text-[14px] text-bibinBlue-100 md:mt-0">
          {'並べ替え: フォロワー数(照準)'}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
