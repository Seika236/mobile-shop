import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { getStaticImageUrl } from "@/lib/getStaticImageUrl";
import clsx from "clsx";
import { useProductItem } from "@/hooks/use-product-item";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/store/CartStore";
import { IProduct } from "@/types/models/IProducts";
import { UseToaster } from "@/hooks/use-toaster";

export default function item() {
  const { items, addItem } = useCartStore();
  const { showInfoToast } = UseToaster();
  const {
    isCheckFavoriteItemLoading,
    createFavorite,
    removeFavorite,
    isFavorite,
    isLoading,
    error,
    data,
  } = useProductItem();

  if (error) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  if (isLoading) {
    return <ActivityIndicator color={"white"} />;
  }

  const onAddCartItem = (item: IProduct) => {
    addItem(item);
    const currentQuantity = items[item.id]?.quantity || 1;
    showInfoToast("Добавлен товар текущее количество = " + currentQuantity);
  };

  return (
    data && (
      <SafeAreaView className={"p-4"}>
        <Text className={"text-2xl font-bold mb-2 text-white"}>
          {data.name}
        </Text>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "contain" }}
          source={getStaticImageUrl(data.imageUrl)}
          alt={data?.name}
        />
        <Text
          className={
            "text-white text-xl mt-2 border-2 border-orange-300 p-2 my-3"
          }
        >
          Price: ${data.price}
        </Text>
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => onAddCartItem(data)}
            className="flex-1 bg-blue-600 p-4 rounded-xl items-center justify-center"
          >
            <Text className="text-white font-bold">В корзину</Text>
          </Pressable>

          <Pressable
            disabled={isCheckFavoriteItemLoading}
            onPress={
              isFavorite ? () => removeFavorite() : () => createFavorite()
            }
            className={clsx(
              "p-4 rounded-xl items-center justify-center border border-zinc-600",
              isFavorite ? "bg-red-600" : "bg-zinc-700",
            )}
          >
            <Text className="text-white font-bold">♥</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  );
}
