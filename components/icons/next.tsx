import React from 'react';

export function Next(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={66} height={67} fill="none" {...props}>
      <g filter="url(#a)">
        <circle
          cx={33.048}
          cy={33.745}
          r={28.9}
          fill="#fff"
          transform="rotate(-180 33.048 33.745)"
        />
      </g>
      <path
        fill="#000"
        fillOpacity={0.7}
        fillRule="evenodd"
        d="M29.728 39.147a1.288 1.288 0 0 0 1.823 0l5.936-5.935a1.288 1.288 0 0 0 0-1.823l-5.936-5.935a1.288 1.288 0 0 0-1.823 0 1.288 1.288 0 0 0 0 1.823l5.017 5.03-5.017 5.017a1.3 1.3 0 0 0 0 1.823Z"
        clipRule="evenodd"
      />
      <defs>
        <filter
          id="a"
          width={65.8}
          height={65.801}
          x={0.148}
          y={0.844}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_68_4837" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_68_4837" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
