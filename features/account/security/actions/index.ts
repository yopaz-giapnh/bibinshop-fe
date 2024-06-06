'use server';
import { apiClient } from '@/config/api-client';
import { isClientError } from '@/utils/error';
import { FormValues } from '../types/security-detail';

type State = {
  success: boolean;
  message: string;
  description?: string;
} | null;

export async function updateAccountSecurity(prevState: State | null, formData: FormValues) {
  try {
    const { error } = await apiClient.PATCH('/api/v2/storefront/account', {
      body: {
        user: {
          // TODO:BE側のRequest body古いパスワード追加後に追記
          password: formData.newPassword,
          password_confirmation: formData.newConfirmPassword
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'パスワードが更新されました。'
    };
  } catch (e) {
    return {
      success: false,
      message: 'パスワードの更新に失敗しました。',
      description: isClientError(e) ? e.error : 'エラーが発生しました。もう一度お試しください。'
    };
  }
}
