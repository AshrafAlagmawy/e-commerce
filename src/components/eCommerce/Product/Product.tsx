import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import { actLikeToggle } from '@store/wishlist/wishlistSlice';
import { addToCart } from '@store/cart/cartSlice';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { TProduct } from '@types';
import ProductInfo from '../ProductInfo/ProductInfo';
// Icons
import Like from '@assets/svg/like.svg?react';
import LikeFill from '@assets/svg/like-fill.svg?react';
// Styles
import styles from './styles.module.css';
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    title,
    price,
    img,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachToMax = currentRemainingQuantity <= 0 ? true : false;
    const [showModal, setShowModal] = useState(false);

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

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (isLoading) return;
        setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <ProductInfo title={title} price={price} img={img}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachToMax
              ? 'You reached to the max of this product'
              : `You can add ${currentRemainingQuantity} more to this product`}
          </p>
          <Button
            variant="info"
            style={{ color: 'white', width: '100%' }}
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
        </ProductInfo>
      </>
    );
  }
);

export default Product;
