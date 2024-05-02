// New Code With Features But Not Working Well It's has an error when add to cart
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import categories from './categories/categoriesSlice';
// import products from './products/productsSlice';
// import cart from './cart/cartSlice';
// import wishlist from './wishlist/wishlistSlice';
// import auth from './auth/authSlice';

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart', 'auth'],
// };

// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whiteList: ['user', 'accessToken'],
// };

// const cartPersistConfig = {
//   key: 'cart',
//   storage,
//   whitelist: ['items'],
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, auth),
//   categories,
//   products,
//   cart: persistReducer(cartPersistConfig, cart),
//   wishlist: wishlist,
// });

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// const persistor = persistStore(store);

// export { store, persistor };

// Old Code

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categories from './categories/categoriesSlice';
import products from './products/productsSlice';
import cart from './cart/cartSlice';
import wishlist from './wishlist/wishlistSlice';
import auth from './auth/authSlice';
import ordersSlice from './orders/ordersSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whiteList: ['cart', 'itemsId', 'auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['user', 'accessToken'],
};

const rootReducer = combineReducers({
  auth,
  cart,
  categories,
  products,
  wishlist,
  ordersSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
