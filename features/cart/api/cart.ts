export async function addToCart() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'カートに追加しました'
  };
}
