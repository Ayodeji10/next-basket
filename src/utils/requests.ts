import axios from "axios";
import { GET_PRODUCTS, GET_SINGLE_PRODUCT } from "./endpoints";

// get all products
export const getAllProducts = async (length: number) => {
  const res = await axios.get(GET_PRODUCTS(length + 10), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

// get single product
export const getSingleProduct = async (id: any) => {
  const singleProduct = axios.get(GET_SINGLE_PRODUCT(id));
  const bestSellers = axios.get(GET_PRODUCTS(8));
  const res = await Promise.all([singleProduct, bestSellers]);
  return res;
};
