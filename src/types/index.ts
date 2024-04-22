import { Output, array, boolean, number, object, string } from 'valibot';

export const DraftProductSchema = object({
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductSchema = object({
  _id: string(),
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = Output<typeof ProductSchema>;
