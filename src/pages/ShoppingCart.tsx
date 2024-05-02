import useShoppingCart from '@hooks/useShoppingCart';
import { Heading } from '@components/common';
import { Loading, LottieHandler } from '@components/feedback';
import { ShoppingCartItemList, CartSubTotalPrice } from '@components/eCommerce';

const ShoppingCart = () => {
  const {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  } = useShoppingCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        <>
          {products.length !== 0 ? (
            <>
              <ShoppingCartItemList
                products={products}
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandler={removeItemHandler}
              />
              <CartSubTotalPrice
                products={products}
                userAccessToken={userAccessToken}
              />
            </>
          ) : placeOrderStatus === 'succeeded' ? (
            <LottieHandler
              type="success"
              message="Your order has been placed successfully!"
            />
          ) : (
            <LottieHandler
              type="empty"
              message="There are no products in your cart"
            />
          )}
        </>
      </Loading>
    </>
  );
};

export default ShoppingCart;
