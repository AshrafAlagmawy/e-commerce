import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  actGetProductsByCatPrefix,
  productsRecordsCleanUp,
} from '@store/products/productsSlice';
import { Container } from 'react-bootstrap';

import { GridList, Heading } from '@components/common';
import { Product } from '@components/eCommerce';
import { Loading } from '@components/feedback';

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));
    return () => {
      dispatch(productsRecordsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Heading>
        <span style={{ textTransform: 'capitalize' }}>{params.prefix}</span>{' '}
        Products
      </Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
