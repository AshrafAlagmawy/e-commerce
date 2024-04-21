import useShoppingCart from '@hooks/useShoppingCart';
import { Heading } from '@components/common';
import { Loading, LottieHandler } from '@components/feedback';
import { ShoppingCartItemList, CartSubTotalPrice } from '@components/eCommerce';

const ShoppingCart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useShoppingCart();

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
              <CartSubTotalPrice products={products} />
            </>
          ) : (
            <LottieHandler
              type="empty"
              message="There Are No Products In Your Cart"
            />
          )}
        </>
      </Loading>
    </>
  );
};

export default ShoppingCart;
