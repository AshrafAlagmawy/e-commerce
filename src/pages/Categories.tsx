import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetCategories } from '@store/categories/categoriesSlice';
import { Container, Row, Col } from 'react-bootstrap';
import { Category } from '@components/eCommerce';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category {...record} />
          </Col>
        ))
      : 'There are no categories available .';

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;
