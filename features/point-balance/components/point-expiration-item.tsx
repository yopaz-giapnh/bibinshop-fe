import React from 'react';

type PointExpirationItemProps = {
  date: string;
  points: number;
  isLastItem: boolean;
};

const PointExpirationItem: React.FC<PointExpirationItemProps> = ({ date, points, isLastItem }) => {
  return (
    <div className={`py-4 ${isLastItem ? '' : 'border-b border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-black-90">{date}</div>
        </div>
        <div
          className={`text-lg font-bold ${points > 0 ? 'text-bibinGreen-100' : 'text-black-90'}`}
        >
          {points}
        </div>
      </div>
    </div>
  );
};

export default PointExpirationItem;
