import { api } from "@/data/api/api";
import { ProductEntities } from "@/domain/entities/product_entities";
import { ProductRepositories } from "@/domain/repositories/product/product_repositories";

export class ProductRepositoriesImpl implements ProductRepositories {
    async fetchData(): Promise<ProductEntities[]> {
        const response = await api.get<ProductEntities[]>(
            "/products"
        )
        return response.data;
    }

    async fetchSingleData(id: string): Promise<ProductEntities> {
        const response = await api.get<ProductEntities>(
            `/products/${id}`
        )
        return response.data;
    }
}