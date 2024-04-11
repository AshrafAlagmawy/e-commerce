import { useAppSelector } from '@store/hooks';
import { getCartTotalQuantitySelector } from '@store/cart/cartSlice';
import Logo from '@assets/svg/cart.svg?react';

import styles from './styles.module.css';
const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  console.log('Rendering');
  return (
    <div className={basketContainer}>
      <Logo title="Basket Icon" />
      <div className={basketQuantity}>{totalQuantity}</div>
    </div>
  );
};

export default HeaderBasket;
