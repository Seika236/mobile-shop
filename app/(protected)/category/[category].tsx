import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "@/modules/home/service/ProductsService";
import clsx from "clsx";
import { ProductCardItem } from "@/components/ui/ProductCardItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function category() {
  const { category } = useLocalSearchParams();

  const { isLoading, error, data } = useQuery({
    queryKey: [`get:all:products:by:categoryId:${category}`],
    queryFn: () =>
      ProductsService.getAllProductsByCategoryId(category as string),
  });

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        numColumns={2}
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => (
          <View className={clsx("w-1/2", index % 2 ? "pl-2" : "pr-2")}>
            <ProductCardItem
              id={item.id}
              name={item.name}
              image={item.imageUrl}
              price={item.price}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
