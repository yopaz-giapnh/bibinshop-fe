'use server';

import { apiClient } from '@/config/api-client';
import { isAddressSchema, isShippmentSchema } from '@/features/address/utils';
import { CartIncludes, CartSchema } from '@/features/cart/types';
import { isLineItemIncludes } from '@/features/cart/utils';
import { isCreditCardSchema, isPaymentSchema } from '@/features/payment/utils';
import { isVariantSchema } from '@/features/product/utils';
import { isVendorSchema } from '@/features/vendor/utils';
import { TAGS } from '../constants';

export async function getAccountOrders({
  shipment_state,
  page
}: { shipment_state?: string; page?: number } = {}) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/orders', {
    params: {
      query: {
        include:
          'line_items,vendors,vendor_totals,billing_address,payments.source,shipments,variants',
        'filter[shipment_state]': shipment_state,
        page
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.orders] } });
    }
  });

  if (error) {
    throw new Error(error.error);
  }

  const { data: orders, included, meta } = data;

  return {
    data: reshapeOrders({ orders, included }),
    meta
  };
}

function reshapeOrders({ orders, included }: { orders: CartSchema[]; included?: CartIncludes[] }) {
  const allLineItems = included?.filter(isLineItemIncludes) || [];
  const allVendors = included?.filter(isVendorSchema) || [];
  const allAddresses = included?.filter(isAddressSchema) || [];
  const allCreditCards = included?.filter(isCreditCardSchema) || [];
  const allPayments = included?.filter(isPaymentSchema) || [];
  const allShipments = included?.filter(isShippmentSchema) || [];
  const allVariants = included?.filter(isVariantSchema) || [];

  return orders.map((order) => {
    const lineItems = allLineItems.filter((item) =>
      order.relationships.line_items?.data?.map((i) => i?.id).includes(item.id)
    );
    const vendors = allVendors.filter((vendor) =>
      order.relationships.vendors?.data?.map((i) => i?.id).includes(vendor.id)
    );
    const address = allAddresses?.find(
      (address) => address.id === order.relationships.billing_address?.data?.id
    );
    const payment = allPayments.find((payment) =>
      order.relationships.payments?.data?.map((i) => i?.id).includes(payment.id)
    );
    const creditCard = allCreditCards.find(
      (creditCard) => payment?.relationships.source?.data?.id === creditCard.id
    );
    const shipment = allShipments.find((shipment) =>
      order.relationships.shipments?.data?.map((i) => i?.id).includes(shipment.id)
    );
    const variants = allVariants.filter((variant) =>
      order.relationships.variants?.data?.map((i) => i?.id).includes(variant.id)
    );

    return {
      ...order,
      lineItems,
      vendors,
      address,
      creditCard,
      shipment,
      variants
    };
  });
}

export async function getOrder(order_number: string) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/orders/{order_number}', {
    params: {
      path: {
        order_number
      },
      query: {
        include:
          'line_items,vendors,vendor_totals,billing_address,payments.source,shipments,variants'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.orders] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: order, included } = data;

  const lineItems = included?.filter(isLineItemIncludes) || [];
  const vendors = included?.filter(isVendorSchema) || [];
  const address = included?.find(isAddressSchema);
  const creditCard = included?.find(isCreditCardSchema);
  const shipment = included?.find(isShippmentSchema);
  const variants = included?.filter(isVariantSchema) || [];

  return {
    ...order,
    lineItems,
    vendors,
    address,
    creditCard,
    shipment,
    variants
  };
}
