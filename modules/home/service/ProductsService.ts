import { IProduct } from "@/types/models/IProducts";
import { $api } from "@/http";

class ProductsService {
  static async getAllProducts(name: string): Promise<IProduct[]> {
    const response = await $api.get(`/products?name=${name}`);
    return response.data;
  }

  static async getAllProductsByCategoryId(
    categoryId: string,
  ): Promise<IProduct[]> {
    const response = await $api.get(`/products/by/${categoryId}`);
    return response.data;
  }

  static async getProductById(id: string): Promise<IProduct> {
    const response = await $api.get(`/products/${id}`);
    return response.data;
  }
}

export default ProductsService;
