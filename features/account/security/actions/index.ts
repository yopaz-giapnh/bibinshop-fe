'use server';
import { FormValues } from '../types/security-detail';

type State = {
  result: boolean;
};

export async function updateAccountSecurity(prevState: State | null, formData: FormValues) {
  try {
    // ここでパスワード変更のAPIリクエストを送信する処理を実装
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form Data:', formData, prevState);
    return {
      result: true
    };
  } catch (e) {
    return {
      result: false
    };
  }
}
