import { Text, View } from "react-native";
import { useCartStore } from "@/store/CartStore";
import { useMemo } from "react";
import { CartItem } from "@/modules/cart/ui/CartItem";
import { CartSummary } from "@/modules/cart/ui/CartSummary";

export function CartList() {
  const { items } = useCartStore();

  const cartItems = useMemo(() => {
    return Object.values(items);
  }, [items]);

  return (
    <View>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })
      ) : (
        <Text>Нет товаров</Text>
      )}
      <View>
        <CartSummary />
      </View>
    </View>
  );
}
