import { useEffect, useState } from "react";
import { Product, getData } from "@/data/repositories/firestore.repository";
import { ProductRepositoriesImpl } from "@/data/repositories/product/product_repositories_impl";
import { ProductEntities } from "@/domain/entities/product_entities";

export function useHomePage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListAxios, setProductListAxios] = useState<ProductEntities[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getData();
      setProductList(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    handleTestAxios();
  }, []);

  const handleTestAxios = async () => {
    const repository = new ProductRepositoriesImpl();
    const response = await repository.fetchData();
    setProductListAxios(response);
  };

  return {
    productList,
    productListAxios,
    handleTestAxios,
  };
}
