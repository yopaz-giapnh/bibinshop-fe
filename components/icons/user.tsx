import React from 'react';

export function User(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="none" {...props}>
      <path
        fill="#fff"
        d="M32 10.667A10.667 10.667 0 1 1 32 32a10.667 10.667 0 0 1 0-21.333Zm0 26.666c11.787 0 21.333 4.774 21.333 10.667v5.333H10.667V48c0-5.893 9.546-10.667 21.333-10.667Z"
      />
    </svg>
  );
}
