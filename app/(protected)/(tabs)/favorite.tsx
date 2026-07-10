import { ActivityIndicator, Text, View } from "react-native";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import FavoriteService from "@/modules/favorites/services/FavoriteService";
import { ProductCardList } from "@/components/ProductCardList";

interface Props {}

export default function favorite({}: Props) {
  const { user, isAuth } = useAuthStore();
  const { isLoading, error, data } = useQuery({
    queryKey: [`get:all:favorites:${user?.userId}`],
    queryFn: () =>
      FavoriteService.getAllFavoritesByUserId(user?.userId as number),
    enabled: isAuth && user?.userId !== undefined,
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
    <View>
      <ProductCardList products={data || []} />
    </View>
  );
}
