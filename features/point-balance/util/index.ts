import { format, isAfter, parseISO, startOfDay, subDays } from 'date-fns';
import type {
  AggregatedPointAcquisition,
  MergedHistoryItem,
  PointAquisitionHistory,
  PointUsageHistory
} from '../types';

export const mergePointHistory = (
  acquisitionHistory: PointAquisitionHistory[],
  usageHistory: PointUsageHistory[]
): MergedHistoryItem[] => {
  const mergedHistory: MergedHistoryItem[] = [
    ...acquisitionHistory.map((item): MergedHistoryItem => {
      const date = parseISO(item.attributes.created_at);
      return {
        id: item.id,
        type: item.type,
        date: format(date, 'yyyy/MM/dd'),
        time: format(date, 'HH:mm:ss'),
        amount: item.attributes.amount,
        // TOOD: @point 獲得ポイントの理由は、現状は買い物ポイントのみのため、固定値を返す
        reason: 'ポイント獲得',
        orderId: null,
        expiresAt: format(parseISO(item.attributes.expires_at), 'yyyy/MM/dd')
      };
    }),
    ...usageHistory.map((item): MergedHistoryItem => {
      const date = parseISO(item.attributes.created_at);
      return {
        id: item.id,
        type: item.type,
        date: format(date, 'yyyy/MM/dd'),
        time: format(date, 'HH:mm:ss'),
        amount: item.attributes.amount * -1,
        reason: item.attributes.reason === 'USE' ? 'ポイント利用' : 'ポイント失効',
        orderId: item.relationships.order?.data?.id || null,
        usedAmount: undefined,
        available: undefined,
        expiresAt: null
      };
    })
  ];
  // 日付と時間でソート（新しい順）
  return mergedHistory.sort((a, b) => {
    const dateComparison = b.date.localeCompare(a.date);
    if (dateComparison !== 0) return dateComparison;
    return b.time.localeCompare(a.time);
  });
};

// 使用期限ごとのポイント集計配列
export const aggregatePointAcquisitionByDate = (
  history: PointAquisitionHistory[]
): AggregatedPointAcquisition[] => {
  const today = startOfDay(new Date());
  const aggregatedData: { [date: string]: AggregatedPointAcquisition } = {};

  history.forEach((item) => {
    const expirationDate = parseISO(item.attributes.expires_at);

    // 今日より後に期限が切れるものだけを処理
    if (isAfter(expirationDate, today)) {
      const date = format(parseISO(item.attributes.created_at), 'yyyy/MM/dd');
      if (!aggregatedData[date]) {
        aggregatedData[date] = { date, totalAmount: 0, count: 0 };
      }
      aggregatedData[date].totalAmount += item.attributes.amount;
      aggregatedData[date].count += 1;
    }
  });

  return Object.values(aggregatedData).sort((a, b) => b.date.localeCompare(a.date));
};

// HACK: サンプルデータ生成---------------
// サンプルデータを使用した例
const sampleHistory: PointAquisitionHistory[] = [
  {
    id: '1',
    type: 'point',
    attributes: {
      amount: 100,
      used_amount: 0,
      available: 100,
      expires_at: '2024-12-31T23:59:59Z',
      created_at: '2023-05-01T10:00:00Z',
      updated_at: '2023-05-01T10:00:00Z'
    },
    relationships: {
      order: { data: { id: 'order2', type: 'order' } }
    }
  },
  {
    id: '2',
    type: 'point',
    attributes: {
      amount: 50,
      used_amount: 0,
      available: 50,
      expires_at: '2024-12-31T23:59:59Z',
      created_at: '2023-05-01T14:30:00Z',
      updated_at: '2023-05-01T14:30:00Z'
    },
    relationships: {
      order: { data: { id: 'order2', type: 'order' } }
    }
  },
  {
    id: '3',
    type: 'point',
    attributes: {
      amount: 75,
      used_amount: 0,
      available: 75,
      expires_at: '2023-12-31T23:59:59Z',
      created_at: '2023-05-02T09:15:00Z',
      updated_at: '2023-05-02T09:15:00Z'
    },
    relationships: {
      order: { data: { id: 'order2', type: 'order' } }
    }
  }
];

export const aggregatedResult = aggregatePointAcquisitionByDate(sampleHistory);
// サンプルデータ生成のヘルパー関数
const generateDate = (daysAgo: number) =>
  format(subDays(new Date(), daysAgo), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

// ポイント利用履歴のサンプルデータ
const sampleUsageHistory: PointUsageHistory[] = [
  {
    id: 'acq1',
    type: 'point_transaction',
    attributes: {
      amount: 100,
      reason: 'USE',
      created_at: generateDate(5)
    },
    relationships: {
      order: { data: { id: 'order1', type: 'order' } }
    }
  },
  {
    id: 'acq2',
    type: 'point_transaction',
    attributes: {
      amount: 50,
      reason: 'EXPIRE',
      created_at: generateDate(3)
    },
    relationships: {
      order: { data: null }
    }
  }
];

// ポイント獲得履歴のサンプルデータ
const sampleAcquisitionHistory: PointAquisitionHistory[] = [
  {
    id: 'use1',
    type: 'point',
    attributes: {
      amount: 30,
      used_amount: 30,
      available: 0,
      created_at: generateDate(4),
      expires_at: generateDate(-30), // 30日後
      updated_at: generateDate(4)
    },
    relationships: {
      order: { data: { id: 'order2', type: 'order' } }
    }
  },
  {
    id: 'use2',
    type: 'point',
    attributes: {
      amount: 20,
      used_amount: 20,
      available: 0,
      created_at: generateDate(2),
      expires_at: generateDate(-60), // 60日後
      updated_at: generateDate(4)
    },
    relationships: {
      order: { data: { id: 'order3', type: 'order' } }
    }
  }
];

// マージされた履歴
const sampleMergedHistory = mergePointHistory(sampleAcquisitionHistory, sampleUsageHistory);

export { sampleAcquisitionHistory, sampleMergedHistory, sampleUsageHistory };
