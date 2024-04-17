import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  actGetProductsByItems,
  shoppingCartItemChangeQuantity,
  shoppingCartRemoveItem,
  shoppingCartProductsFullInfoCleanUp,
} from '@store/cart/cartSlice';

const useShoppingCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(actGetProductsByItems());
    return () => {
      dispatch(shoppingCartProductsFullInfoCleanUp());
    };
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

  return { loading, error, products, changeQuantityHandler, removeItemHandler };
};

export default useShoppingCart;
