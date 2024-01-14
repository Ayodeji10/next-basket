import { TProduct } from "../../types";

export const getCurrentPrice = (price: number, discount: number) => {
  return price - Math.round((discount / 100) * price);
};

export const getTotalPrice = (items: TProduct[]) => {
  const totalPrice = items.reduce((total, item) => {
    return (
      total +
      getCurrentPrice(item.price, item.discountPercentage) *
        (item.quantity ? item.quantity : 1)
    );
  }, 0);
  return totalPrice.toLocaleString();
};
