import { ProductRepositoriesImpl } from "@/data/repositories/product/product_repositories_impl";
import { ProductEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { formatCurrency } from "react-native-format-currency";

function useDetailPage() {

    const { id } = useLocalSearchParams();
    const Uid = useAuthStore((s) => s.uid);

    const [DetailProduct, setDetailProduct] = useState<ProductEntities>();
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [withSymbol, withoutSymbol, symbol] = formatCurrency({
        amount: Number(DetailProduct?.price),
        code: "USD",
    });
    const [Count, setCount] = useState<number>(0);

    useEffect(() => {
        handleSingleProductAxios();
    }, []);

    const handleSingleProductAxios = async () => {
        if (!id || Array.isArray(id)) return;
        setLoading(true);
        const repositories = new ProductRepositoriesImpl();
        const response = await repositories.fetchSingleData(id);
        setDetailProduct(response);
        setLoading(false);
    }

    return {
        Uid,
        loading,
        adding,
        withSymbol,
        setAdding,
        DetailProduct,
        Count,
        setCount
    }
}

export default useDetailPage