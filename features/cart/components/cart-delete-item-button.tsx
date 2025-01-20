import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { removeLineItem } from '../actions';
import { AnimatedDeleteButton } from './animated-delete-button';

type Props = {
  lineItemId: string;
};

export function CartDeleteItemButton({ lineItemId }: Props) {
  const action = removeLineItem.bind(null, lineItemId);

  return (
    <form action={action}>
      <AnimatedDeleteButton>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-[18px] w-[18px] text-black-30" />
        </Button>
      </AnimatedDeleteButton>
    </form>
  );
}

export function MobileCartDeleteItemButton({ lineItemId }: Props) {
  const action = removeLineItem.bind(null, lineItemId);

  return (
    <form action={action}>
      <AnimatedDeleteButton>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Trash2 className="h-[14px] w-[14px] text-black-30" />
        </Button>
      </AnimatedDeleteButton>
    </form>
  );
}
