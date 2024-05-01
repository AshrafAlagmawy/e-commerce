import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  actGetWishlistItems,
  wishlistProductsFullInfoCleanUp,
} from '@store/wishlist/wishlistSlice';

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlistItems('productsFullInfo'));
    return () => {
      promise.abort();
      dispatch(wishlistProductsFullInfoCleanUp());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
    isAuthenticated: true,
  }));

  return { loading, error, records };
};

export default useWishlist;
