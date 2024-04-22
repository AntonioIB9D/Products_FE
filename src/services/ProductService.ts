import { coerce, number, parse, safeParse } from 'valibot';
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from '../types';
import axios from 'axios';
import { toBoolean } from '../utils/index';

type addProductProps = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: addProductProps) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/endpoint`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });
    } else {
      throw new Error('Datos no validos');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/endpoint`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.log(error);
  }
}

/*
El .output se encarga de la salida, lo limpia valibot, lo coloca en el objeto
*/

export async function getProductById(id: Product['_id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/endpoint/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: addProductProps, id: Product['_id']) {
  try {
    const NumberSchema = coerce(
      number(),
      Number
    ); /*Forzar a convertir en Number, no funciona bien con Boolean */

    const result = safeParse(ProductSchema, {
      _id: id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/endpoint/${id}`;
      await axios.patch(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product['_id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/endpoint/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}
