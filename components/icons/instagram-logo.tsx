import React from 'react';

export function InstagramLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        fill="url(#instagram)"
        fillRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm5.346-15.26A6.144 6.144 0 0 0 19 8.303a5.625 5.625 0 0 1-1.439 1.441c.007.118.011.236.011.359 0 3.667-2.887 7.898-8.169 7.898A8.282 8.282 0 0 1 5 16.755c.226.027.452.038.687.038a5.893 5.893 0 0 0 3.558-1.184c-1.254-.027-2.31-.835-2.681-1.934.174.037.36.048.543.048.264 0 .519-.03.752-.092-1.304-.258-2.299-1.378-2.299-2.727v-.03c.383.204.836.333 1.297.341A2.757 2.757 0 0 1 5.582 8.91c0-.512.145-.988.393-1.403a8.219 8.219 0 0 0 5.916 2.903 2.77 2.77 0 0 1-.067-.633c0-1.529 1.28-2.776 2.868-2.776.82 0 1.57.336 2.097.878a5.857 5.857 0 0 0 1.82-.672 2.779 2.779 0 0 1-1.263 1.535Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="instagram"
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
