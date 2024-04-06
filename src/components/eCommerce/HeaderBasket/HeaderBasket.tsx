import Logo from '../../../assets/svg/cart.svg?react';

import styles from './styles.module.css';
const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  return (
    <div className={basketContainer}>
      <Logo title="Basket Icon" />
      <div className={basketQuantity}></div>
    </div>
  );
};

export default HeaderBasket;
