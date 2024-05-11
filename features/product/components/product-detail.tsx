import { Product } from '../types';

type Props = {
  product: Product;
};

export async function ProductDetail({ product }: Props) {
  return <div>{product.attributes.name}</div>;
}
