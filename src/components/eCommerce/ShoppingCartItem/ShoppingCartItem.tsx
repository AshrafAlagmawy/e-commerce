import { Form, Button } from 'react-bootstrap';
import { TProduct } from '@customTypes/product';
import styles from './styles.module.css';

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type ShoppingCartItemProps = TProduct;

const ShoppingCartItem = ({
  title,
  price,
  img,
  max,
  quantity,
}: ShoppingCartItemProps) => {
  const renderOptions = Array(max)
    .fill(0)
    .map((_, idx) => {
      const quantity = ++idx;

      return (
        <option value={quantity} key={quantity}>
          {quantity}
        </option>
      );
    });

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          {/* <h3>{price.toFixed(2)} EGP</h3> */}
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: 'white', width: '100px' }}
            className="mt-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity}>{renderOptions}</Form.Select>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
