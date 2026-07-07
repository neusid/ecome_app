import { Product, batchUpdateCart } from "@/data/repositories/firestore.repository";
import { ProductCartEntities, ProductEntities } from "@/domain/entities/product_entities";
import {
  getApiProductsUseCase,
  getFirestoreProductsUseCase,
} from "@/domain/usecases/product/get_products_usecase";
import { useAuthStore } from "@/stores/authStore";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState } from "react";

export function useHomePage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListAxios, setProductListAxios] = useState<ProductEntities[]>([]);
  const Uid = useAuthStore((s) => s.uid ?? null);
  const [CartList, setCartList] = useState<ProductCartEntities[]>([]);
  const pendingUpdates = useRef<Map<string, number>>(new Map());

  const syncToFirestore = useMemo(
    () => debounce(async () => {
      if (pendingUpdates.current.size === 0) return;

      const changes: { id: string; quantity: number }[] = [];
      pendingUpdates.current.forEach((quantity, id) => {
        changes.push({ id, quantity });
      });
      pendingUpdates.current.clear();

      await batchUpdateCart(changes);
    }, 900), []);

  useEffect(
    () => {
      return () => {
        syncToFirestore.flush();
      }
    }, [syncToFirestore]);

  const queueUpdate = (cartId: string, newQuantity: number) => {
    pendingUpdates.current.set(cartId, newQuantity);
    syncToFirestore();
  }

  const handleLocalIncrease = (cartId: string) => {
    setCartList(prev => {
      const updated = prev.map(item =>
        item.id === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const item = updated.find(i => i.id === cartId);
      if (item) queueUpdate(cartId, item.quantity);
      return updated;
    });
  };

  const handleLocalDecrease = (cartId: string) => {
    setCartList(prev => {
      const item = prev.find(i => i.id === cartId);
      if (!item) return prev;
      if (item.quantity <= 1) {
        queueUpdate(cartId, 0);
        return prev.filter(i => i.id !== cartId);
      }
      const updated = prev.map(i =>
        i.id === cartId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
      queueUpdate(cartId, item.quantity - 1);
      return updated;
    });
  };

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

  return { productList, productListAxios, handleTestAxios, handleLocalIncrease, handleLocalDecrease };
}
