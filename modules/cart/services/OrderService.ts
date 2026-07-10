import { $api } from "@/http";
import { CreateOrderRequest } from "@/modules/cart/types/requests/CreateOrderRequest";
import { CreateOrderResponse } from "@/modules/cart/types/responses/CreateOrderResponse";

class OrderService {
  async createOrder(
    createOrderRequest: CreateOrderRequest,
  ): Promise<CreateOrderResponse> {
    const response = await $api.post<CreateOrderResponse>(
      "/orders",
      createOrderRequest,
    );
    return response.data;
  }

  async sccessOrder(orderId: number) {
    await $api.post(`/orders/success-payment/${orderId}`);
  }

  async failedOrder(orderId: number) {
    await $api.post(`/orders/failed-payment/${orderId}`);
  }
}

export default new OrderService();
