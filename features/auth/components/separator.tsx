type Props = {
  w?: string;
};
export function Separator({ w }: Props) {
  return <div className={(w ? `w-${w}` : '') + ' h-[1px] w-[99px] bg-black-10'} />;
}
