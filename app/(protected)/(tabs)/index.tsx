import { StatusBar } from "expo-status-bar";
import { OrderCard } from "@/modules/home";
import { CategoriesCardList } from "@/modules/home/components/CategoriesCardList";
import { ProductCardList } from "@/components/ProductCardList";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/AuthStore";
import ProductsService from "@/modules/home/service/ProductsService";
import { ActivityIndicator, Text, View } from "react-native";

export default function TestScreen() {
  const { isAuth } = useAuthStore();
  const { isLoading, error, data } = useQuery({
    queryKey: [`get:all:products`],
    queryFn: () => ProductsService.getAllProducts(""),
    enabled: isAuth,
  });

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

  return (
    <>
      <OrderCard />
      <CategoriesCardList />
      <ProductCardList products={data?.slice(0, 6) || []} isShort={true} />
      <StatusBar style="light" />
    </>
  );
}
