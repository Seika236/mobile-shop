import { Text, View } from "react-native";
import { CartList } from "@/modules/cart/components/CartList";

export default function cart() {
  return (
    <View>
      <Text>cart</Text>
      <CartList />
    </View>
  );
}
