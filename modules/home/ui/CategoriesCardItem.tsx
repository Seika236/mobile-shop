import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { getStaticImageUrl } from "@/lib/getStaticImageUrl";

interface Props {
  name: string;
  image: string;
  onClick: () => void;
}

export function CategoriesCardItem({ image, name, onClick }: Props) {
  return (
    <Pressable onPress={onClick}>
      <View
        className={
          "bg-zinc-700 w-[80px] p-2 flex items-center justify-center  rounded-2xl"
        }
      >
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={getStaticImageUrl(image)}
          alt={"image"}
        />
        <Text className={"text-white"}>{name}</Text>
      </View>
    </Pressable>
  );
}
