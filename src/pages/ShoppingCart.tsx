import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  actGetProductsByItems,
  shoppingCartItemChangeQuantity,
  shoppingCartRemoveItem,
} from '@store/cart/cartSlice';
import { Heading } from '@components/common';
import { Loading } from '@components/feedback';
import { ShoppingCartItemList, CartSubTotalPrice } from '@components/eCommerce';

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

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(shoppingCartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(shoppingCartRemoveItem(id));
    },
    [dispatch]
  );

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading status={loading} error={error}>
        <>
          {products.length !== 0 ? (
            <>
              <ShoppingCartItemList
                products={products}
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandler={removeItemHandler}
              />
              <CartSubTotalPrice products={products} />
            </>
          ) : (
            <p className="text-center">There are no items in your cart</p>
          )}
        </>
      </Loading>
    </>
  );
};

export default ShoppingCart;
