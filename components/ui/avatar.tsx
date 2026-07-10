import { View } from "react-native";
import { Image } from "expo-image";

export function Avatar() {
  return (
    <View>
      <Image
        source={require("@/assets/images/icon.png")}
        className="w-40 h-40 rounded-full"
        style={{
          width: 200,
          height: 200,
          marginInline: "auto",
          borderRadius: 100,
        }}
      />
    </View>
  );
}
