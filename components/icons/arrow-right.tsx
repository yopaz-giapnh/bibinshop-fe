import React from 'react';

export function ArrowRight(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        stroke="#51B7FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m10 17 5-5-5-5"
      />
    </svg>
  );
}
