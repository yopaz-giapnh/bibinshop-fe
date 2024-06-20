import { VendorImageSchema, VendorSchema } from '@/features/vendor/types';
import { components } from '@/lib/api/storefront';

export type MessageIncludes = components['schemas']['NotificationIncludes'];

export type MessageSchema = components['schemas']['Notification'];

export type Message = MessageSchema & {
  vendor?: VendorSchema;
  vendorImage?: VendorImageSchema;
};
