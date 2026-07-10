import { useLocalSearchParams } from "expo-router";
import { useAuthStore } from "@/store/AuthStore";
import { UseToaster } from "@/hooks/use-toaster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductsService from "@/modules/home/service/ProductsService";
import FavoriteService from "@/modules/favorites/services/FavoriteService";

export function useProductItem() {
  const { item } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { showErrorToast, showSuccessToast } = UseToaster();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: [`get:product:by:id:${item}`],
    queryFn: () => ProductsService.getProductById(item as string),
  });

  const { data: isFavorite, isLoading: isCheckFavoriteItemLoading } = useQuery({
    queryKey: ["check", "isFavorite", `by:${user?.userId}:${item}`],
    queryFn: () => FavoriteService.checkFavorite(user?.userId as number, +item),
    enabled: !!user?.userId && !!item,
  });

  const { mutate: createFavorite } = useMutation({
    mutationKey: ["create", `favorite:by:${user}:${item}`],
    mutationFn: () =>
      FavoriteService.createFavorite({
        userId: user?.userId as number,
        productId: +item,
      }),
    onSuccess: () => {
      showSuccessToast("success create favorite");
      queryClient.invalidateQueries({
        queryKey: ["check", "isFavorite", `by:${user?.userId}:${item}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`get:all:favorites:${user?.userId}`],
      });
    },
    onError: () => {
      showErrorToast("failed create favorite");
    },
  });

  const { mutate: removeFavorite } = useMutation({
    mutationKey: [`remove:favorite:for:item:${item}`],
    mutationFn: () =>
      FavoriteService.deleteFavorite(user?.userId as number, +item),
    onSuccess: () => {
      showSuccessToast("Successfully deleted item!");
      queryClient.invalidateQueries({
        queryKey: ["check", "isFavorite", `by:${user?.userId}:${item}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`get:all:favorites:${user?.userId}`],
      });
    },
    onError: () => {
      showErrorToast("Error deleting item!");
    },
  });

  return {
    isLoading,
    error,
    data,
    isCheckFavoriteItemLoading,
    isFavorite,
    removeFavorite,
    createFavorite,
  };
}
