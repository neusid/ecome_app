import { GetSingleCart } from "@/data/repositories/firestore.repository";
import { ProductRepositoriesImpl } from "@/data/repositories/product/product_repositories_impl";
import { ProductEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
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
    const [Counts, setCounts] = useState<number>(0);
    const setCount = useCartStore((s) => s.setCount);


    useEffect(() => {
        handleSingleProductAxios();
    }, []);

    const handleSingleProductAxios = async () => {
        console.log(id);
        if (!id || Array.isArray(id)) return;
        setLoading(true);
        const repositories = new ProductRepositoriesImpl();
        const response = await repositories.fetchSingleData(id);
        const responseCart = await GetSingleCart(Uid!, id as string);
        console.log(`${Uid} ${id}`);
        setCount(responseCart?.quantity ?? 0);
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
        Counts,
        setCounts
    }
}

export default useDetailPage