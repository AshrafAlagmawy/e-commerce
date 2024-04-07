import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetProductsByCatPrefix } from '@store/products/productsSlice';
import { Container, Row, Col } from 'react-bootstrap';
import { Product } from '@components/eCommerce';

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.Products);

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
  }, [dispatch, params]);

  const productsList =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...record} />
          </Col>
        ))
      : 'There are no categories available .';

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  );
};

export default Products;
