'use server';

import { signIn, signOut } from '@/auth';
import { apiClient } from '@/config/api-client';
import { associateCart } from '@/features/cart/actions';
import { isClientError } from '@/utils/error';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { FormValues } from '../types/password-reset-form';

type State =
  | {
      success: boolean;
      message: string;
    }
  | undefined;

export async function authenticate(
  prevState: State,
  { email, password }: { email: string; password: string }
) {
  try {
    await signIn('credentials', { email, password });
    await associateCart();
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: 'ログインに失敗しました'
    };
  }
}

export async function signUp(
  prevState: State,
  { email, password }: { email: string; password: string }
) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/account', {
      body: {
        user: {
          email,
          password
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: '入力したアドレスにメールを送信しました'
    };
  } catch (error) {
    console.error(error);

    if (isClientError(error)) {
      return {
        success: false,
        message: error.error
      };
    } else {
      return {
        success: false,
        message: 'エラーが発生しました'
      };
    }
  }
}

export async function accountConfirm(confirmationToken: string) {
  try {
    const { data, error } = await apiClient.GET('/api/v2/storefront/account_confirmations/{id}', {
      params: {
        path: {
          id: confirmationToken
        }
      },
      fetch: (request) => {
        return fetch(request, { cache: 'no-store' });
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createToken({ email, password }: { email: string; password: string }) {
  try {
    const { data, error } = await apiClient.POST('/spree_oauth/token', {
      body: {
        grant_type: 'password',
        username: email,
        password
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  await signOut();
}

export async function resendEmail(prevState: State, { email }: { email: string }) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/account_confirmations', {
      body: {
        account_confirmation: {
          email
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: '入力したアドレスにメールを送信しました'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: isClientError(error) ? error.error : 'エラーが発生しました'
    };
  }
}

export async function authenticateFromToken(confirmationToken: string) {
  try {
    await signIn('confirmation', { confirmationToken });
    await associateCart();
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function resetPassword(
  prevState: State | null,
  formData: FormValues & { resetPasswordToken: string }
) {
  try {
    const { error } = await apiClient.PATCH('/api/v2/storefront/passwords/{id}', {
      params: {
        path: {
          id: formData.resetPasswordToken
        }
      },
      body: {
        user: {
          password: formData.password,
          password_confirmation: formData.confirmPassword
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

export async function sendResetPasswordEmail(prevState: State, email: string) {
  try {
    const { error } = await apiClient.POST('/api/v2/storefront/passwords', {
      body: {
        user: {
          email
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: '入力したアドレスにメールを送信しました'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: isClientError(error) ? error.error : 'エラーが発生しました'
    };
  }
}
