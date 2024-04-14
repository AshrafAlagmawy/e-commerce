import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import { TProduct } from '@customTypes/product';

type ShoppingCartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const ShoppingCartItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: ShoppingCartItemListProps) => {
  const renderList = products.map((el) => (
    <ShoppingCartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));
  return <div>{renderList}</div>;
};

export default ShoppingCartItemList;
