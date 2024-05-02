import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  actGetProductsByItems,
  shoppingCartItemChangeQuantity,
  shoppingCartRemoveItem,
  shoppingCartProductsFullInfoCleanUp,
} from '@store/cart/cartSlice';
import { resetOrderStatus } from '@store/orders/ordersSlice';

const useShoppingCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const placeOrderStatus = useAppSelector((state) => state.ordersSlice.loading);

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

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(shoppingCartProductsFullInfoCleanUp());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    products,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useShoppingCart;
