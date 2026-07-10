import { FlatList, Text, View } from "react-native";
import { ProductCardItem } from "@/components/ui/ProductCardItem";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IProduct } from "@/types/models/IProducts";

interface Props {
  bottomOffset?: number;
  isShort?: boolean;
  products: IProduct[];
}

export function ProductCardList({
  bottomOffset = 320,
  isShort = false,
  products,
}: Props) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="mt-3" style={{ paddingBottom: bottom + bottomOffset }}>
      <Text className="text-white text-2xl mb-2">Products</Text>
      <FlatList
        data={isShort ? products.slice(0, 6) : products}
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
    </View>
  );
}
