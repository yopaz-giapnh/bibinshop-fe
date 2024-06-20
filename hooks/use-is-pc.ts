import { useMediaQuery } from 'usehooks-ts';

export function useIsPc() {
  return useMediaQuery('(min-width: 768px)');
}
