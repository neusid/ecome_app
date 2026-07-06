import { Product, getData } from "@/data/repositories/firestore.repository";
import { ProductRepositoriesImpl } from "@/data/repositories/product/product_repositories_impl";
import { ProductEntities } from "@/domain/entities/product_entities";

const productRepo = new ProductRepositoriesImpl();

export async function getFirestoreProductsUseCase(): Promise<Product[]> {
  return getData();
}

export async function getApiProductsUseCase(): Promise<ProductEntities[]> {
  return productRepo.fetchData();
}
