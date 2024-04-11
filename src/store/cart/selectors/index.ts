import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    console.log('Fire');
    const totalQuantity = Object.values(items).reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
    return totalQuantity;
  }
);

export { getCartTotalQuantitySelector };
