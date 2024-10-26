import { OptionTypeSchema, Product, VariantSchema, VariantState } from '../types';

export function getOptionState({
  optionValueId,
  selectedVariant,
  variants
}: {
  optionValueId: string;
  selectedVariant: VariantSchema | undefined;
  variants: VariantSchema[];
}): VariantState {
  // 選択されているバリエーションのオプション値かどうかをチェック
  const isSelected = getSelectedVariantOptionValues(selectedVariant).some(
    (ov) => ov === optionValueId
  );

  if (isSelected) {
    return 'selected';
  }

  // このオプション値を含むすべてのバリアントをチェック
  const variantsWithThisOption = variants.filter((variant) =>
    variant.relationships.option_values?.data?.some((ov) => ov?.id === optionValueId)
  );

  // 購入可能なバリアントが1つでもあれば'available'
  const hasAvailableVariant = variantsWithThisOption.some(
    (variant) => variant.attributes.purchasable
  );

  return hasAvailableVariant ? 'available' : 'unavailable';
}

// 選択されているバリアントのオプション値を取得
export function getSelectedVariantOptionValues(selectedVariant: VariantSchema | undefined) {
  return selectedVariant?.relationships.option_values?.data?.map((ov) => ov?.id) || [];
}

export function filterOptionValues({
  optionTypeId,
  product
}: {
  optionTypeId: string;
  product: Product;
}) {
  return product.optionsMap[optionTypeId].filter(
    (o) => o.relationships.option_type?.data?.id === optionTypeId
  );
}

// クリックされたオプションIDに基づいて新しいバリアントを見つける関数
export function findNewVariant({
  clickedOptionId,
  product,
  selectedVariant
}: {
  clickedOptionId: string;
  product: Product;
  selectedVariant: VariantSchema | undefined;
}): VariantSchema | undefined {
  const currentSelectedOptions = selectedVariant
    ? selectedVariant.relationships.option_values?.data?.map((ov) => ov?.id) || []
    : [];

  // クリックされたオプションを含む新しい組み合わせを作成
  const newSelectedOptions = product.optionTypes.map((optionType) => {
    const optionForThisType = product.optionsMap[optionType.id].find(
      (o) => o.id === clickedOptionId
    );
    if (optionForThisType) {
      return clickedOptionId;
    }
    return currentSelectedOptions.find((optionId) =>
      product.optionsMap[optionType.id].some((o) => o.id === optionId)
    );
  });

  // 新しい組み合わせに一致するバリアントを探す
  return product.variants.find(
    (variant) =>
      variant.attributes.purchasable &&
      variant.relationships.option_values?.data?.every((ov) => newSelectedOptions.includes(ov?.id))
  );
}

export function getSelectedOptionPresentation({
  optionType,
  product,
  selectedVariant
}: {
  optionType: OptionTypeSchema;
  product: Product;
  selectedVariant: VariantSchema | undefined;
}): string {
  if (!selectedVariant) return ''; // 未選択

  const selectedOption = selectedVariant.relationships.option_values?.data?.find((ov) =>
    product.optionsMap[optionType.id].some((o) => o.id === ov?.id)
  );

  const selectedOptionType = product.optionsMap[optionType.id].find(
    (o) => o.id === selectedOption?.id
  );

  return selectedOptionType?.attributes.presentation || '';
}
