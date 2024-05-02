import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Layouts
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'));
const ProfileLayout = lazy(
  () => import('@layouts/ProfileLayout/ProfileLayout')
);
// Components
import { LottieHandler, PageSuspenseFallback } from '@components/feedback';
// Pages
const Home = lazy(() => import('@pages/Home'));
const Categories = lazy(() => import('@pages/Categories'));
const Products = lazy(() => import('@pages/Products'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const ShoppingCart = lazy(() => import('@pages/ShoppingCart'));
const Wishlist = lazy(() => import('@pages/Wishlist'));
const Account = lazy(() => import('@pages/Account'));
const Orders = lazy(() => import('@pages/Orders'));

// Error Page
import Error from '@pages/Error';
// Protected Routes
import ProtectedRoute from '@components/Auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: '10%' }}>
            <LottieHandler type="loading" message="Loading please wait ..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'categories',
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'categories/products/:prefix',
        element: (
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
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
          <PageSuspenseFallback>
            <AboutUs />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'login',
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'register',
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'shopping-cart',
        element: (
          <PageSuspenseFallback>
            <ShoppingCart />
          </PageSuspenseFallback>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <Wishlist />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <ProfileLayout />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <Account />
              </PageSuspenseFallback>
            ),
          },
          {
            path: 'orders',
            element: (
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
