import { CustomError } from '@/types/error';

export function isClientError(error: unknown): error is CustomError {
  return typeof error === 'object' && error !== null && 'error' in error;
}
