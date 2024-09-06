import React from 'react';

type PointHistoryItemProps = {
  date: string;
  time: string;
  title: string;
  expirationDate: string;
  points: number;
  orderNumber?: string;
  isLastItem: boolean;
};

const PointHistoryItem: React.FC<PointHistoryItemProps> = ({
  date,
  time,
  title,
  expirationDate,
  points,
  orderNumber,
  isLastItem
}) => {
  return (
    <div className={`py-4 ${isLastItem ? '' : 'border-b border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="text-sm text-black-90">{date}</div>
            <div className="text-sm text-black-90">{time}</div>
          </div>
          <div className="flex flex-col items-start pl-[24px] text-right md:pl-[64px]">
            <div className="font-semibold">{title}</div>
            {expirationDate && (
              <div className="mt-[4px] text-sm text-gray-500">使用期限: {expirationDate}</div>
            )}
            {orderNumber && (
              <div className="mt-[4px] hidden text-sm text-gray-500 md:block">
                注文番号: {orderNumber}
              </div>
            )}
            {orderNumber && (
              <div className="mt-[4px] flex flex-col items-start md:hidden">
                <div className="text-sm text-gray-500">注文番号:</div>
                <div className="text-sm text-gray-500">{orderNumber}</div>
              </div>
            )}
          </div>
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

export default PointHistoryItem;
