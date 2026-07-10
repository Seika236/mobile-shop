import { Text, TouchableOpacity, View } from "react-native";
import { CartItemType } from "@/modules/cart/types/CartItemType";
import { useCartStore } from "@/store/CartStore";
import { Image } from "expo-image";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const { addItem, removeItem } = useCartStore();

  return (
    <View className="flex-row items-center bg-white p-3 mx-4 my-2 rounded-xl shadow-sm border border-gray-100">
      <Image
        source={{ uri: item.item.imageUrl }}
        className="w-16 h-16 rounded-lg bg-gray-100"
      />

      <View className="flex-1 ml-3">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {item.item.name}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">{item.item.price} ₽</Text>
      </View>

      <View className="flex-row items-center bg-gray-50 rounded-full p-1">
        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
          onPress={() => removeItem(item.id)}
        >
          <Text className="text-lg font-bold text-gray-700">-</Text>
        </TouchableOpacity>

        <Text className="mx-3 text-base font-bold text-gray-900 w-6 text-center">
          {item.quantity}
        </Text>

        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
          onPress={() => addItem(item.item)}
        >
          <Text className="text-lg font-bold text-gray-700">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
