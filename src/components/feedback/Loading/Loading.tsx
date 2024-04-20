import CategorySkeleton from '../skeletons/CategorySkeleton/CategorySkeleton';
import ProductSkeleton from '../skeletons/ProductSkeleton/ProductSkeleton';
import CartSkeleton from '../skeletons/CartSkeleton/CartSkeleton';
import { TLoading } from '@types';

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: 'cart' | 'product' | 'category';
};

const Loading = ({
  status,
  error,
  children,
  type = 'category',
}: LoadingProps) => {
  const Component = skeletonsTypes[type];

  if (status === 'pending') {
    return <Component />;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return <>{children}</>;
};

export default Loading;
