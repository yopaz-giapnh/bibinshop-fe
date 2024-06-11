'use client';

import { PropsWithChildren, useEffect } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  // 注文確認からの遷移時にリダイレクトしたときにスクロール位置が下になってしまうのでトップに固定するための実装
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
}
