import React from 'react';

export function Star(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" {...props}>
      <path
        fill="#FCBE2D"
        fillRule="evenodd"
        d="m8.5 11.68 2.767 1.673a.665.665 0 0 0 .993-.72l-.733-3.147 2.446-2.12a.665.665 0 0 0-.38-1.166l-3.22-.274-1.26-2.973a.667.667 0 0 0-1.226 0L6.627 5.92l-3.22.273a.665.665 0 0 0-.38 1.167l2.446 2.12-.733 3.146a.665.665 0 0 0 .993.72L8.5 11.68Z"
        clipRule="evenodd"
      />
      <mask
        id="a"
        width={13}
        height={12}
        x={2}
        y={2}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance'
        }}
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m8.5 11.68 2.767 1.673a.665.665 0 0 0 .993-.72l-.733-3.147 2.446-2.12a.665.665 0 0 0-.38-1.166l-3.22-.274-1.26-2.973a.667.667 0 0 0-1.226 0L6.627 5.92l-3.22.273a.665.665 0 0 0-.38 1.167l2.446 2.12-.733 3.146a.665.665 0 0 0 .993.72L8.5 11.68Z"
          clipRule="evenodd"
        />
      </mask>
    </svg>
  );
}
