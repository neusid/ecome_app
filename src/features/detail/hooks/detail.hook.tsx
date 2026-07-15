import { GetSingleCart } from "@/data/repositories/firestore.repository";
import { ProductRepositoriesImpl } from "@/data/repositories/product/product_repositories_impl";
import { ProductEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useCheckCart } from "@/stores/checkCartStore";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router/react-navigation";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "react-native-format-currency";

function useDetailPage() {
    const { id } = useLocalSearchParams();
    const Uid = useAuthStore((s) => s.uid);
    const setCheck = useCheckCart((s) => s.setCheck);

    const [DetailProduct, setDetailProduct] = useState<ProductEntities>();
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [Counts, setCounts] = useState<number>(0);


    const [withSymbol] = formatCurrency({
        amount: Number(DetailProduct?.price),
        code: "USD",
    });

    useEffect(() => {
        handleSingleProductAxios();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!Uid || !id || Array.isArray(id)) return;
            const timer = setTimeout(() => checkSingleProduct(), 0);
            return () => clearTimeout(timer);
        }, [Uid, id])
    );

    const checkSingleProduct = async () => {
        if (!Uid || !id || Array.isArray(id)) return;
        try {
            const data = await GetSingleCart(Uid, id as string);
            if (!data || data.quantity <= 0) {
                setCheck(true);
            } else {
                setCheck(false);
            }
        } catch {
            setCheck(true);
        }
    };

    const handleSingleProductAxios = async () => {
        console.log(id);
        if (!id || Array.isArray(id)) return;
        setLoading(true);
        const repositories = new ProductRepositoriesImpl();
        const response = await repositories.fetchSingleData(id);
        setDetailProduct(response);
        checkSingleProduct();
    };

    return {
        Uid,
        loading,
        setLoading,
        adding,
        withSymbol,
        setAdding,
        DetailProduct,
        Counts,
        setCounts,
        checkSingleProduct,
    };
}

export default useDetailPage
