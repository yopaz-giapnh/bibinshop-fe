'use client';

import { Typography } from '@/components/ui/typography';
import { useState } from 'react';

type RatingProps = {
  star: number;
  size?: number;
  color?: string;
  readOnly?: boolean;
  withLabel?: boolean;
  count?: number;
  parsent?: number;
  onClick?: (value: number) => void;
};

export default function Rating({
  star,
  size = 24,
  color = '#FCBE2D',
  readOnly = false,
  withLabel = false,
  count = 0,
  parsent,
  onClick
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(star);
  const [clickValue, setClickValue] = useState(star);
  const [isHovered, setIsHovered] = useState(false);
  const arr = [1, 2, 3, 4, 5];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const calcRes = (amount: number, _: React.MouseEvent<HTMLSpanElement>) => {
    // TODO: BEが小数点対応していないため
    return amount;
    // const target = event.currentTarget;
    // const rect = target.getBoundingClientRect();
    // const clickX = event.pageX;
    // const positionX = rect.left + window.pageXOffset;
    // const x = clickX - positionX;
    // const half = rect.width / 2;
    // let res = amount;
    // if (x < half) {
    //   res = amount - 0.5;
    // }
    // return res;
  };

  const handleOnClick = (amount: number, event: React.MouseEvent<HTMLSpanElement>) => {
    const res = calcRes(amount, event);
    setClickValue(res);
    setHoverValue(res);
    if (onClick) {
      onClick(res);
    }
  };

  const handleOnHover = (amount: number, event: React.MouseEvent<HTMLSpanElement>) => {
    setIsHovered(true);
    const res = calcRes(amount, event);
    setHoverValue(res);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative inline-block select-none items-center"
        style={{
          cursor: readOnly ? 'auto' : 'pointer'
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <div
          className="flex overflow-hidden whitespace-nowrap text-[#e6e6e6]"
          style={{
            fontSize: `${size}px`
          }}
        >
          {arr.map((num: number) => {
            return (
              <span
                key={`star-${num}`}
                className="px-0.5"
                onMouseMove={readOnly ? () => {} : (e) => handleOnHover(num, e)}
                onClick={readOnly ? () => {} : (e) => handleOnClick(num, e)}
              >
                ☆
              </span>
            );
          })}
        </div>
        <div
          className="absolute left-0 top-0 flex overflow-hidden whitespace-nowrap"
          style={{
            color: color,
            fontSize: `${size}px`,
            width: isHovered ? `${hoverValue * 2 * 10}%` : `${clickValue * 2 * 10}%`,
            pointerEvents: 'none'
          }}
        >
          {arr.map((num: number) => {
            return (
              <span key={`star-active-${num}`} className="px-0.5">
                ★
              </span>
            );
          })}
        </div>
      </div>
      {withLabel ? (
        <span className="font-bold" style={{ fontSize: `${size * 0.65}px` }}>
          {clickValue}
        </span>
      ) : null}
      {/* TODO: 他のベタ書きの部分を置き換え */}
      {count > 0 ? (
        <Typography
          as="xSmall"
          element="p"
          className={`ml-1 text-${readOnly ? 'black' : 'sunburstYellow'}`}
        >
          ({count})
        </Typography>
      ) : null}
      <div className="flex w-1/5 justify-end">{parsent != null && <>{parsent}%</>}</div>
    </div>
  );
}
