import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/modules/home/service/CategoryService";
import { useAuthStore } from "@/store/AuthStore";
import { CategoriesCardItem } from "@/modules/home/ui/CategoriesCardItem";
import { useRouter } from "expo-router";

interface Props {}

export function CategoriesCardList({}: Props) {
  const { isAuth } = useAuthStore();
  const { isLoading, error, data } = useQuery({
    queryKey: ["get:all:categories"],
    queryFn: CategoryService.getAllCategories,
    enabled: isAuth,
  });
  const route = useRouter();

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

  const onCategoryItemClick = (category: number) => {
    route.push(`/category/${category}`);
  };

  return (
    <View className={"flex flex-col gap-y-2 mt-4"}>
      <Text className={"text-white text-2xl"}>Categories</Text>
      <View className={"flex flex-row justify-between w-full"}>
        {data &&
          data.map((category) => (
            <CategoriesCardItem
              onClick={() => onCategoryItemClick(category.id)}
              key={category.id}
              name={category.name}
              image={category.image_url}
            />
          ))}
      </View>
    </View>
  );
}
