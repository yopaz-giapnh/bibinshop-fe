import { ButtonWithIcon } from '@/components/button/button-with-icon';
import { Trash } from 'lucide-react';
import { removeLineItem } from '../actions';

type Props = {
  lineItemId: string;
};

export function CartDeleteItemButton({ lineItemId }: Props) {
  const action = removeLineItem.bind(null, lineItemId);

  return (
    <form action={action}>
      <ButtonWithIcon icon={<Trash />} text="削除" />
    </form>
  );
}
