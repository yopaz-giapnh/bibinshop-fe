import React from 'react';

export function ClosedEye(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
        strokeWidth={2}
        d="M21 9.5c-2.4 2.667-5.4 4-9 4-3.6 0-6.6-1.333-9-4m0 6 2.5-3.8M21 15.476 18.508 11.7M9 17.5l.5-4m5.5 4-.5-4"
      />
    </svg>
  );
}
