import { format, parseISO, subDays } from 'date-fns';
import type { MergedHistoryItem, PointAquisitionHistory, PointUsageHistory } from '../types';

const mergePointHistory = (
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

export default mergePointHistory;

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
