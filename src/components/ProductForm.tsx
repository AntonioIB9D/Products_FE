import type { Product } from '../types';

type ProductFormProps = {
  product?: Product;
};

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false },
];

export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          min={0}
          name="price"
          defaultValue={product?.price}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="availability">
          Disponibilidad:
        </label>
        <select
          id="availability"
          className="mt-2 block w-full p-3 bg-gray-50"
          name="availability"
          defaultValue={product?.availability.toString()}
        >
          {availabilityOptions.map((option) => (
            <option key={option.name} value={option.value.toString()}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
