import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/cart/cartSlice';
import { Button, Spinner } from 'react-bootstrap';
import { TProduct } from '@customTypes/product';

import styles from './styles.module.css';
const { product, productImg, maximumNotice } = styles;

const Product = memo(({ title, price, img, id, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);

  const quantityReachToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }
    setIsBtnDisabled(true);

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price} EGP</h3>
      <p className={maximumNotice}>
        {quantityReachToMax
          ? 'You reached to the max of this product'
          : `You can add ${currentRemainingQuantity} more to this product`}
      </p>
      <Button
        variant="info"
        style={{ color: 'white' }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading
          </>
        ) : (
          'Add to cart'
        )}
      </Button>
    </div>
  );
});

export default Product;
