import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import { TProduct } from '@customTypes/product';

type ShoppingCartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
};

const ShoppingCartItemList = ({
  products,
  changeQuantityHandler,
}: ShoppingCartItemListProps) => {
  const renderList = products.map((el) => (
    <ShoppingCartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
    />
  ));
  return <div>{renderList}</div>;
};

export default ShoppingCartItemList;
