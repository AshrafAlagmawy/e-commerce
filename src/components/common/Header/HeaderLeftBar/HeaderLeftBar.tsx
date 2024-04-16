import { getCartTotalQuantitySelector } from '@store/cart/selectors';
import { useAppSelector } from '@store/hooks';
import HeaderCounter from '../HeaderCounter/HeaderCounter';
import WishlistIcon from '@assets/svg/wishlist.svg?react';
import ShoppingCartIcon from '@assets/svg/cart.svg?react';
// Styles
import styles from './styles.module.css';
const { headerLeftBar } = styles;

const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );

  const shoppingCartTotalQuantity = useAppSelector(
    getCartTotalQuantitySelector
  );

  return (
    <div className={headerLeftBar}>
      {/* Left Side Of Header Icons */}
      <HeaderCounter
        title="Wishlist"
        to="wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="Wishlist" />}
      />
      <HeaderCounter
        title="Cart"
        to="shopping-cart"
        totalQuantity={shoppingCartTotalQuantity}
        svgIcon={<ShoppingCartIcon title="Cart" />}
      />
    </div>
  );
};

export default HeaderLeftBar;
