const BASE_URL = "https://dummyjson.com";

export const GET_PRODUCTS = (length: number) =>
  `${BASE_URL}/products?limit=${length}`;

export const GET_SINGLE_PRODUCT = (id: any) => `${BASE_URL}/products/${id}`;
