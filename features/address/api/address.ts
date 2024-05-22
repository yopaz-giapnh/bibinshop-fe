export async function saveAddress() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: '住所を保存しました'
  };
}
