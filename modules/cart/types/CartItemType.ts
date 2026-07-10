import { IProduct } from "@/types/models/IProducts";

export type CartItemType = {
  id: number;
  item: IProduct;
  quantity: number;
};
