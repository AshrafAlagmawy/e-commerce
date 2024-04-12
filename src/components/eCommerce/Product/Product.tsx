import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/cart/cartSlice';
import { Button, Spinner } from 'react-bootstrap';
import { TProduct } from '@customTypes/product';

import styles from './styles.module.css';
const { product, productImg } = styles;

const Product = ({ title, price, img, id }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isBtnClicked, setIsBtnClicked] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (!isBtnClicked) {
      return;
    }
    setIsBtnDisabled(true);

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnClicked]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnClicked((prev) => prev + 1);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price} EGP</h3>
      <Button
        variant="info"
        style={{ color: 'white' }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" />
            Loading
          </>
        ) : (
          'Add to cart'
        )}
      </Button>
    </div>
  );
};

export default Product;
