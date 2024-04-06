import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Layouts
import { MainLayout } from '@layouts/index';
// Pages
import Home from '@pages/Home';
import Categories from '@pages/Categories';
import AboutUs from '@pages/AboutUs';
import Products from '@pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'products/:prefix',
        element: <Products />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
