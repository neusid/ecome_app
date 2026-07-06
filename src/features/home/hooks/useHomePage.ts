import { useEffect, useState } from "react";
import { Product } from "@/data/repositories/firestore.repository";
import { ProductEntities } from "@/domain/entities/product_entities";
import {
  getApiProductsUseCase,
  getFirestoreProductsUseCase,
} from "@/domain/usecases/product/GetProductsUseCase";

export function useHomePage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListAxios, setProductListAxios] = useState<ProductEntities[]>(
    []
  );

  useEffect(() => {
    getFirestoreProductsUseCase().then(setProductList);
  }, []);

  useEffect(() => {
    getApiProductsUseCase().then(setProductListAxios);
  }, []);

  const handleTestAxios = async () => {
    const data = await getApiProductsUseCase();
    setProductListAxios(data);
  };

  return {
    productList,
    productListAxios,
    handleTestAxios,
  };
}
