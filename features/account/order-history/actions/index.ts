'use server';

import { apiClient } from '@/config/api-client';
import { isAddressSchema, isShippmentSchema } from '@/features/address/utils';
import { CartIncludes, CartSchema } from '@/features/cart/types';
import { isLineItemIncludes } from '@/features/cart/utils';
import { Order } from '@/features/order/types';
import { isCreditCardSchema, isKonbiniSchema, isPaymentSchema } from '@/features/payment/utils';
import {
  isCancellationReuqestSchema,
  isImageSchema,
  isProductSchema,
  isVariantSchema
} from '@/features/product/utils';
import { isVendorSchema } from '@/features/vendor/utils';
import { isNotFound } from '@/utils/api';
import { revalidateTag } from 'next/cache';
import { TAGS } from '../constants';

// todo: confirm what includes are needed.
// extra includes are costly.
// all includes: loads in 12s
// only line_items: loads in < 9s
const includes = [
  //order related
  'line_items',
  'billing_address',
  'payments.source',
  'shipments',
  'variants',
  'variants.images',
  'variants.product',
  // 'variants.product.variants',
  // 'variants.product.product_properties',
  //  vendor related
  // 'vendors',
  // 'vendors.banner_image',
  // 'vendor_totals',
  //shipment related
  'shipments.selected_shipping_rate',
  'cancellation_requests'
].join(',');

export async function getAccountOrders({
  shipment_state,
  page
}: { shipment_state?: string; page?: number } = {}) {
  const { data, error } = await apiClient.GET('/api/v2/storefront/account/orders', {
    params: {
      query: {
        include: includes,
        'filter[shipment_state]': shipment_state,
        page,
        per_page: 10,
        sort: '-completed_at'
      }
    },
    fetch: (request) => {
      return fetch(request, { next: { tags: [TAGS.orders] } });
    }
  });

  if (error) {
    throw error;
  }

  const { data: orders, included, meta } = data;

  return {
    data: reshapeOrders({ orders, included }),
    meta
  };
}

// TODO: リファクタリングする
function reshapeOrders({
  orders,
  included
}: {
  orders: CartSchema[];
  included?: CartIncludes[];
}): Order[] {
  const allLineItems = included?.filter(isLineItemIncludes) || [];
  const allVendors = included?.filter(isVendorSchema) || [];
  const allAddresses = included?.filter(isAddressSchema) || [];
  const allCreditCards = included?.filter(isCreditCardSchema) || [];
  const allPayments = included?.filter(isPaymentSchema) || [];
  const allShipments = included?.filter(isShippmentSchema) || [];
  const allVariants = included?.filter(isVariantSchema) || [];
  const allImages = included?.filter(isImageSchema) || [];
  const allProducts = included?.filter(isProductSchema) || [];
  const allCancellationRequests = included?.filter(isCancellationReuqestSchema) || [];
  const allKonbinis = included?.filter(isKonbiniSchema) || [];

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
    const shipments = allShipments.filter((shipment) =>
      order.relationships.shipments?.data?.map((i) => i?.id).includes(shipment.id)
    );
    const variants = allVariants.filter((variant) =>
      order.relationships.variants?.data?.map((i) => i?.id).includes(variant.id)
    );

    const images =
      allImages.filter((image) =>
        variants
          .map((variant) => variant.relationships.images?.data?.map((i) => i?.id))
          .flat()
          .includes(image.id)
      ) || [];

    const products = allProducts.filter((product) =>
      variants.map((variant) => variant.relationships.product?.data?.id).includes(product.id)
    );
    const cancellationRequests = allCancellationRequests.filter((cancellationRequest) =>
      order.relationships.cancellation_requests?.data
        ?.map((i) => i?.id)
        .includes(cancellationRequest.id)
    );

    const konbini = allKonbinis.find(
      (k) =>
        k.relationships.payment_method?.data?.id.toString() ===
        payment?.attributes.payment_method_id?.toString()
    );

    return {
      ...order,
      lineItems,
      vendors,
      address,
      creditCard,
      shipments,
      variants,
      images,
      products,
      cancellationRequests,
      konbini
    };
  });
}

export async function getOrder(order_number: string) {
  const { response, data, error } = await apiClient.GET(
    '/api/v2/storefront/account/orders/{order_number}',
    {
      params: {
        path: {
          order_number
        },
        query: {
          include: includes
        }
      },
      fetch: (request) => {
        return fetch(request, { next: { tags: [TAGS.orders] } });
      }
    }
  );

  if (isNotFound(response)) {
    return;
  }

  if (error) {
    throw error;
  }

  const { data: order, included } = data;

  const lineItems = included?.filter(isLineItemIncludes) || [];
  const vendors = included?.filter(isVendorSchema) || [];
  const address = included?.find(isAddressSchema);
  const creditCard = included?.find(isCreditCardSchema);
  const shipments = included?.filter(isShippmentSchema) || [];
  const variants = included?.filter(isVariantSchema) || [];
  const images = included?.filter(isImageSchema) || [];
  const products = included?.filter(isProductSchema) || [];
  const cancellationRequests = included?.filter(isCancellationReuqestSchema) || [];
  const payments = included?.filter(isPaymentSchema) || [];
  const konbini = included?.find(isKonbiniSchema);

  return {
    ...order,
    lineItems,
    vendors,
    address,
    creditCard,
    shipments,
    variants,
    images,
    products,
    cancellationRequests,
    payments,
    konbini
  };
}

export async function receiveOrder(id: string) {
  const { data, error } = await apiClient.POST(
    '/api/v2/storefront/account/shipments/{id}/received',
    {
      params: {
        path: {
          id
        }
      }
    }
  );

  if (error) {
    throw error;
  }

  revalidateTag(TAGS.orders);

  return data;
}
