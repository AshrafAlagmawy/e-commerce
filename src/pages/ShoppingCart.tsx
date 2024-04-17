import useShoppingCart from '@hooks/useShoppingCart';
import { Heading } from '@components/common';
import { Loading } from '@components/feedback';
import { ShoppingCartItemList, CartSubTotalPrice } from '@components/eCommerce';

const ShoppingCart = () => {
  const { loading, error, products, changeQuantityHandler, removeItemHandler } =
    useShoppingCart();

  return (
    <>
      <Heading title="Your Cart" />
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
