import useOrders from '@hooks/useOrders';
import { Loading } from '@components/feedback';
import { Heading } from '@components/common';
import { ProductInfo } from '@components/eCommerce';
import { Modal, Table } from 'react-bootstrap';

const Orders = () => {
  const {
    showModal,
    closeModalHandler,
    viewDetailsHandler,
    selectProduct,
    loading,
    error,
    orderList,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: '10px' }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Orders" />
      <Loading status={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} items
                  {' / '}{' '}
                  <span
                    onClick={() => viewDetailsHandler(el.id)}
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Product Details
                  </span>
                </td>
                <td>$ {el.subTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
