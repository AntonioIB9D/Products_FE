import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from './Views/Products';
import NewProduct, { action as newProductAction } from './Views/NewProduct';
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from './Views/EditProduct';
import { action as detailProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: 'productos/nuevos',
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'productos/:id/editar', //ROA Pattern - Resource oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: 'productos/:id/eliminar',
        action: detailProductAction,
      },
    ],
  },
]);
