import React from 'react';

export function Share(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
      <path
        stroke="#202224"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.8}
        strokeWidth={2}
        d="M4.5 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6-4-4m0 0-4 4m4-4v13"
      />
    </svg>
  );
}
