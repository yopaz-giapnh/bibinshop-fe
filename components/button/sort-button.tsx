import { ChevronDown } from 'lucide-react';

export function SortButton() {
  return (
    <button className="relative flex h-[32px] w-[240px] items-center justify-center rounded-full border border-[#51B7FF] py-2.5 pl-5 text-[#51B7FF]">
      <span className="text-sm font-medium leading-[20px] tracking-[0.03em]">
        {/* TODO: ソート内容確認 */}
        並べ替え: ランキング順
      </span>
      <ChevronDown className="ml-2 h-6 w-6 transform" />
    </button>
  );
}
