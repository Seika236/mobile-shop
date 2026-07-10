import { Text, View } from "react-native";
import { MyButton } from "@/components/ui/MyButton";
import { Image } from "expo-image";

export function OrderCard() {
  return (
    <View className="flex flex-row justify-between w-full items-start bg-green-600 p-4 rounded-2xl">
      <View className="flex w-[70%] gap-y-2">
        <Text className="text-white text-xl">
          Fast delivery -delicious choice every time!
        </Text>
        <View>
          <MyButton type={"black"}>Order now</MyButton>
        </View>
      </View>

      <View className="w-[30%]">
        <Image
          style={{
            width: 100,
            height: 120,
          }}
          source={require("@/assets/order-card.png")}
          alt="Order Card"
        />
      </View>
    </View>
  );
}
