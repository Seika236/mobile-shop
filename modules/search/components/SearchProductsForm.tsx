import { ActivityIndicator, Text, View } from "react-native";
import { ProductCardList } from "@/components/ProductCardList";
import { MyInput } from "@/components/ui/MyInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchProductSchema } from "@/modules/search/types/schemas/SearchProductSchema";
import { useAuthStore } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "@/modules/home/service/ProductsService";
import { useDebounce } from "@/hooks/use-debounce";

interface Props {}

export function SearchProductsForm({}: Props) {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<SearchProductSchema>({
    resolver: zodResolver(SearchProductSchema),
  });

  const debouncedName = useDebounce({
    value: watch("productName") || "",
    delay: 200,
  });

  const { isAuth } = useAuthStore();
  const { isLoading, error, data } = useQuery({
    queryKey: [`get:all:products:by:${debouncedName}`],
    queryFn: () => ProductsService.getAllProducts(debouncedName),
    enabled: isAuth,
  });

  if (error) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View>
      <MyInput control={control} name={"productName"} />
      {isLoading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <ProductCardList products={data || []} bottomOffset={100} />
      )}
    </View>
  );
}
