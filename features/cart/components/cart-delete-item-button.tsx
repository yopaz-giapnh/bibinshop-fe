import MobileTrashGray from '@/assets/trash-mobile-gray.svg';
import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Trash } from 'lucide-react';
import { removeLineItem } from '../actions';

type Props = {
  lineItemId: string;
  className?: string;
};

export function CartDeleteItemButton({ lineItemId, className }: Props) {
  const action = removeLineItem.bind(null, lineItemId);

  return (
    <form action={action} className={className}>
      <ButtonWithIcon icon={<Trash />} text="削除" />
    </form>
  );
}

export function MobileCartDeleteItemButton({ lineItemId }: Props) {
  const action = removeLineItem.bind(null, lineItemId);

  return (
    <form action={action}>
      <ButtonWithIcon icon={<MobileTrashGray />} text="削除" />
    </form>
  );
}
