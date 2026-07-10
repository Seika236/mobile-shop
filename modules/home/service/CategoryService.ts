import { ICategory } from "@/types/models/ICategory";
import { $api } from "@/http";

class CategoryService {
  static async getAllCategories(): Promise<ICategory[]> {
    const response = await $api.get<ICategory[]>("/categories");
    return response.data;
  }
}

export default CategoryService;
