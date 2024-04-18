import { TProduct } from '@types';
import styles from './styles.module.css';

type CartSubTotalPriceProps = { products: TProduct[] };

const CartSubTotalPrice = ({ products }: CartSubTotalPriceProps) => {
  const subTotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === 'number') {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className={styles.container}>
      <span>Sub Total : </span>
      <span>{subTotal.toFixed(2)}</span>
    </div>
  );
};

export default CartSubTotalPrice;
