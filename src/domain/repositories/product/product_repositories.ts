import { ProductEntities } from "@/domain/entities/product_entities";

export interface ProductRepositories {
    fetchData(): Promise<ProductEntities[]>;
    fetchSingleData(id: string): Promise<ProductEntities>;
}