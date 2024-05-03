import React from 'react';

export function Question(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#fff"
          d="M32 5.333c14.728 0 26.667 11.939 26.667 26.667 0 14.728-11.94 26.667-26.667 26.667C17.272 58.667 5.333 46.728 5.333 32 5.333 17.272 17.272 5.333 32 5.333Zm0 37.334A2.667 2.667 0 1 0 32 48a2.667 2.667 0 0 0 0-5.333Zm0-25.334A9.666 9.666 0 0 0 22.333 27a2.667 2.667 0 1 0 5.334 0 4.333 4.333 0 1 1 5.946 4.027c-1.802.72-4.28 2.565-4.28 5.64v.666a2.667 2.667 0 1 0 5.334 0c0-.65.133-.976.696-1.253l.232-.107A9.67 9.67 0 0 0 32 17.333Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h64v64H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
