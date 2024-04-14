import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetProductsByItems } from '@store/cart/cartSlice';
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

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading status={loading} error={error}>
        <>
          <ShoppingCartItemList products={products} />
          <CartSubTotalPrice />
        </>
      </Loading>
    </>
  );
};

export default ShoppingCart;
