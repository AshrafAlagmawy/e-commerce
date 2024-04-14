import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import { TProduct } from '@customTypes/product';

type ShoppingCartItemListProps = { products: TProduct[] };

const ShoppingCartItemList = ({ products }: ShoppingCartItemListProps) => {
  const renderList = products.map((el) => (
    <ShoppingCartItem key={el.id} {...el} />
  ));
  return <div>{renderList}</div>;
};

export default ShoppingCartItemList;
