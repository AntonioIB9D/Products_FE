import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(params.id);
  }
  return redirect('/');
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const isAvailable = product.availability;
  const navigate = useNavigate();

  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product._id}
              className={`${
                isAvailable ? 'text-black' : 'text-red-600'
              } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
            >
              {isAvailable ? 'Disponible' : 'No disponible'}
            </button>
            <input type="hidden" name="id" value={product._id} />
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate(`/productos/${product._id}/editar`)}
              className="bg-orange-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            >
              Editar
            </button>
            <Form
              className="w-full"
              method="POST"
              action={`productos/${product._id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm('¿Eliminar?')) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="submit"
                value="Eliminar"
                className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
}
