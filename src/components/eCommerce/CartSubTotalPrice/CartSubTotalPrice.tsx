import { useAppDispatch } from '@store/hooks';
import actPlaceOrder from '@store/orders/act/actPlaceOrder';
import { clearCartAfterPlaceOrder } from '@store/cart/cartSlice';
import { useState } from 'react';
import { TProduct } from '@types';
import { Button, Modal, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';

type CartSubTotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotalPrice = ({
  products,
  userAccessToken,
}: CartSubTotalPriceProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const subTotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === 'number') {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const modelHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(subTotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={modelHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal :{' '}
          {subTotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: '#DC3545', marginTop: '10px' }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: 'white' }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading ...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Sub Total : </span>
        <span>{subTotal.toFixed(2)}</span>
      </div>

      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: 'white' }}
              onClick={modelHandler}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
