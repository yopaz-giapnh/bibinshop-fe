import React from 'react';

export function ArrowBack(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
      <path
        fill="#51B7FF"
        d="M12 9.658V7.099a1 1 0 0 0-1.707-.708L4 12.599l6.293 6.207A.998.998 0 0 0 12 18.099V15.61c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941Z"
      />
    </svg>
  );
}
