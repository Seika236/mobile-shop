export interface CreateOrderRequestProductType {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  independenceKey: string;
  userId: number;
  products: CreateOrderRequestProductType[];
}
