export function buildShipmentState(status: string) {
  switch (status) {
    case 'all':
      return {};
    case 'processing':
      return {
        shipment_state: 'partial,ready,backorder,pending'
      };
    case 'shipped':
      return {
        shipment_state: 'shipped'
      };
  }
}
