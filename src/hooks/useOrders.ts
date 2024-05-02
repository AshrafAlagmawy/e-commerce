import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { actGetOrders, resetOrderStatus } from '@store/orders/ordersSlice';
import { TProduct } from '@types';

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector(
    (state) => state.ordersSlice
  );

  const [showModal, setShowModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItem = productDetails?.items ?? [];

    setSelectProduct((prev) => [...prev, ...newItem]);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    showModal,
    closeModalHandler,
    viewDetailsHandler,
    selectProduct,
    loading,
    error,
    orderList,
  };
};

export default useOrders;
