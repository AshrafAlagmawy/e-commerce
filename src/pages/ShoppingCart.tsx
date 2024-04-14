import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetProductsByItems } from '@store/cart/cartSlice';
import { Heading } from '@components/common';
import { Loading } from '@components/feedback';
import { ShoppingCartItemList, CartSubTotalPrice } from '@components/eCommerce';
import { shoppingCartItemChangeQuantity } from '@store/cart/cartSlice';

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(actGetProductsByItems());
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = (id: number, quantity: number) => {
    dispatch(shoppingCartItemChangeQuantity({ id, quantity }));
  };

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading status={loading} error={error}>
        <>
          <ShoppingCartItemList
            products={products}
            changeQuantityHandler={changeQuantityHandler}
          />
          <CartSubTotalPrice />
        </>
      </Loading>
    </>
  );
};

export default ShoppingCart;
