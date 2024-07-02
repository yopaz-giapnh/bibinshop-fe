import { MessageSchema } from '../types';

export function getMessageImageUrl(message: MessageSchema | undefined) {
  if (!message || !message.attributes.image_url) {
    return '/placeholder-product-image.png';
  }

  return message.attributes.image_url;
}
