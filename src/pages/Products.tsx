import useProducts from '@hooks/useProdcuts';
import { Container } from 'react-bootstrap';
import { GridList, Heading } from '@components/common';
import { Product } from '@components/eCommerce';
import { Loading } from '@components/feedback';

const Products = () => {
  const { loading, error, productsFullInfo, productPrefix } = useProducts();

  return (
    <Container>
      <Heading title={`${productPrefix} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
