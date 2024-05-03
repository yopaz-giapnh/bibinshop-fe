import React from 'react';

export function FacebookLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        fill="url(#facebook)"
        fillRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm1.78-19 1.919.003c.166 0 .301.128.301.285v2.138a.294.294 0 0 1-.302.285h-1.292c-.891 0-1.054.33-1.054.976v1.347h2.256c.08 0 .157.03.214.084a.278.278 0 0 1 .088.202v2.301a.294.294 0 0 1-.303.286h-2.255v5.808a.294.294 0 0 1-.302.285h-2.517a.294.294 0 0 1-.302-.285v-5.808h-1.93A.294.294 0 0 1 8 12.62V10.32c0-.158.135-.286.302-.286h1.929V8.445C10.231 6.352 11.624 5 13.78 5Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="facebook"
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
