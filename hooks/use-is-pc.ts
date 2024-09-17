import { useEffect, useState } from 'react';

export function useIsPc() {
  const [isPc, setIsPc] = useState<boolean>(false);
  useEffect(() => {
    setIsPc(window.matchMedia('(min-width: 768px)').matches);
  }, []);
  return isPc;
}
