import { memo } from 'react';
import ProductInfo from '../ProductInfo/ProductInfo';
import { Form, Button } from 'react-bootstrap';
import { TProduct } from '@types';
import styles from './styles.module.css';

const { cartItem, cartItemSelection } = styles;

type ShoppingCartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const ShoppingCartItem = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: ShoppingCartItemProps) => {
    // Render Options List
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

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
          <Button
            variant="secondary"
            style={{ color: 'white', width: '100px' }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default ShoppingCartItem;
