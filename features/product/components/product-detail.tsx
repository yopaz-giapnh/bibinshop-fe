import { Product } from '../types';
import { Gallery } from './gallery';

type Props = {
  product: Product;
};

export async function ProductDetail({ product }: Props) {
  return <Gallery images={product.images} />;
}
