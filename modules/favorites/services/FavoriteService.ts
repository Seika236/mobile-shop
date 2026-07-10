import { $api } from "@/http";
import { IProduct } from "@/types/models/IProducts";
import { CreateFavoriteRequest } from "@/modules/favorites/types/requests/createFavoriteRequest";

class FavoriteService {
  async getAllFavoritesByUserId(userId: number): Promise<IProduct[]> {
    const response = await $api.get<IProduct[]>(`/favorites/${userId}`);
    return response.data;
  }

  async checkFavorite(userId: number, productId: number): Promise<boolean> {
    const response = await $api.get<boolean>(
      `/favorites/${userId}/${productId}`,
    );
    return response.data;
  }

  async deleteFavorite(userId: number, productId: number): Promise<void> {
    await $api.delete<boolean>(`/favorites/${userId}/${productId}`);
  }

  async createFavorite(data: CreateFavoriteRequest): Promise<void> {
    await $api.post(`/favorites`, data);
  }
}

export default new FavoriteService();
