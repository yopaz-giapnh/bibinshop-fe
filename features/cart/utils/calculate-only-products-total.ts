export const calculateOnlyProductsTotal = (total: string, shipTotal: string) => {
  const roundedTotal = Math.round(Number(total));
  const roundedShipTotal = Math.round(Number(shipTotal));
  const subtotal = roundedTotal - roundedShipTotal;

  // 日本円表示にフォーマット
  return (
    new Intl.NumberFormat('ja-JP', {
      style: 'decimal',
      currency: 'JPY'
    }).format(subtotal) + '円'
  );
};
