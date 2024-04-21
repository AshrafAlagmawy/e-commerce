import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Layouts
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'));
// Pages
const Home = lazy(() => import('@pages/Home'));
const Categories = lazy(() => import('@pages/Categories'));
const Products = lazy(() => import('@pages/Products'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const ShoppingCart = lazy(() => import('@pages/ShoppingCart'));
const Wishlist = lazy(() => import('@pages/Wishlist'));
import Error from '@pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback="Loading Please Wait ..">
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Categories />
          </Suspense>
        ),
      },
      {
        path: 'categories/products/:prefix',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== 'string' ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response('Bad Request', {
              statusText: 'Category not found',
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: 'about-us',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'shopping-cart',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <ShoppingCart />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback="Loading Please Wait ..">
            <Wishlist />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
