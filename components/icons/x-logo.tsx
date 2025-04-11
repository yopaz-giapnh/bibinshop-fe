import React from 'react';

export function XLogo(props: React.ComponentProps<'svg'> & { id: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        fill={`url(#x-${props.id})`}
        fillRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM18.1721 5.00006H16.0255L12.4881 9.15481L9.42971 5.00066H4.99988L10.293 12.1092L5.27638 18.0001H7.42421L11.2964 13.4552L14.6797 18.0001H18.9999L13.4821 10.5074L18.1721 5.00006ZM16.4618 16.6805H15.2724L11.3897 11.4656L7.50704 6.25074H8.78338L16.4618 16.6805Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id={`x-${props.id}`}
          x1={0}
          x2={24}
          y1={24}
          y2={17.04}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.185} stopColor="#51B7FF" />
          <stop offset={1} stopColor="#5CE686" />
        </linearGradient>
      </defs>
    </svg>
  );
}
