import { Text, View } from "react-native";
import { useCartStore } from "@/store/CartStore";
import { MyButton } from "@/components/ui/MyButton";
import { useMemo, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import OrderService from "@/modules/cart/services/OrderService";
import {
  CreateOrderRequest,
  CreateOrderRequestProductType,
} from "@/modules/cart/types/requests/CreateOrderRequest";
import { useAuthStore } from "@/store/AuthStore";
import { UseToaster } from "@/hooks/use-toaster";
import { useStripe } from "@stripe/stripe-react-native";
import { nanoid } from "nanoid/non-secure";

export function CartSummary() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { showSuccessToast, showErrorToast } = UseToaster();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const idempotencyKeyRef = useRef(nanoid());

  const itemsCalculation = useMemo(() => {
    return Object.values(items);
  }, [items]);

  const createOrderRequest = async () => {
    if (user) {
      const createOrderItems: CreateOrderRequestProductType[] = Object.values(
        items,
      ).map((item) => ({ productId: item.id, quantity: item.quantity }));
      const request: CreateOrderRequest = {
        independenceKey: idempotencyKeyRef.current,
        userId: user?.userId,
        products: createOrderItems,
      };
      return OrderService.createOrder(request);
    } else {
      throw new Error("User not authenticated");
    }
  };

  const onFailedCreateOrder = async (orderId: number) => {
    showErrorToast("Error payment order");
    await OrderService.failedOrder(orderId);
    idempotencyKeyRef.current = nanoid();
  };

  const onPaymentOrder = async (clientSecret: string, orderId: number) => {
    try {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Seika",
        paymentIntentClientSecret: clientSecret,
      });

      if (error) {
        await onFailedCreateOrder(orderId);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        await onFailedCreateOrder(orderId);
        return;
      }

      await OrderService.sccessOrder(orderId);
      showSuccessToast("Payment order successful");
      clearCart();
    } catch (fatalError) {
      console.error("Критический сбой при оплате в Stripe:", fatalError);
      showErrorToast("Произошла непредвиденная ошибка при оплате");
      await onFailedCreateOrder(orderId);
    }
  };

  const { mutate } = useMutation({
    mutationFn: () => createOrderRequest(),
    mutationKey: ["crate:order"],
    onSuccess: async (data) => {
      await onPaymentOrder(data.clientSecret, data.orderId);
    },
    onError: (e) => {
      showErrorToast("Error creating cart");
      idempotencyKeyRef.current = crypto.randomUUID();
    },
  });

  const total = itemsCalculation.reduce((sum, cartItem) => {
    return sum + cartItem.item.price * cartItem.quantity;
  }, 0);

  if (itemsCalculation.length === 0) return null;

  return (
    <View className="p-6">
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg text-white">Итого:</Text>
        <Text className="text-2xl font-bold text-white">
          {total.toLocaleString()} $
        </Text>
      </View>

      <View className="rounded-xl items-center">
        <MyButton onPress={() => mutate()}>Оформить заказ</MyButton>
      </View>
    </View>
  );
}
