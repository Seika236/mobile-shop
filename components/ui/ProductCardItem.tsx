import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { getStaticImageUrl } from "@/lib/getStaticImageUrl";
import { transformProductPriceForDollar } from "@/lib/transformProductPriceForDollar";
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import FavoriteService from "@/modules/favorites/services/FavoriteService";
import { useAuthStore } from "@/store/AuthStore";
import { useToast } from "react-native-toast-message/lib/src/useToast";
import { UseToaster } from "@/hooks/use-toaster";

interface Props {
  id: number;
  name: string;
  image: string;
  price: number;
}

export function ProductCardItem({ price, name, image, id }: Props) {
  const router = useRouter();
  const onClick = (id: number) => {
    router.push(`/(protected)/item/${id}`);
  };

  return (
    <Pressable onPress={() => onClick(id)}>
      <View>
        <View
          className={
            "bg-zinc-700 p-4 flex items-center justify-center  rounded-2xl"
          }
        >
          <Image
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 60,
            }}
            source={getStaticImageUrl(image)}
            alt={name}
          />
        </View>
        <Text className={"text-white"}>{name}</Text>
        <Text
          className={
            "inline-flex self-start text-white rounded bg-green-700 px-1"
          }
        >
          {transformProductPriceForDollar(price)}
        </Text>
      </View>
    </Pressable>
  );
}
