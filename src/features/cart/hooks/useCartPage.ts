import { CheckoutCart, GetCart } from "@/data/repositories/firestore.repository";
import { ProductCartEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { formatCurrency } from "react-native-format-currency";


function useCartPage() {

    const [CartList, setCartList] = useState<ProductCartEntities[]>([]);

    const Uid = useAuthStore((s) => s.uid ?? null);
    const TransformPrice = (price: number): string => {
        const roundedPrice = Math.round(price * 100) / 100;

        const [withSymbol] = formatCurrency({
            amount: roundedPrice,
            code: "USD",
        });

        return withSymbol;
    };

    const fetchCart = async (uid: string) => {
        const data = await GetCart(uid);
        setCartList(data);
    };

    const handleCheckout = async () => {
        if (!Uid || CartList.length === 0) return;

        await CheckoutCart(Uid, CartList);
        await fetchCart(Uid);
    };

    useEffect(() => {
        if (!Uid) return;

        fetchCart(Uid);
    }, [Uid]);

    const totalPrice = CartList.reduce(
        (sum, item) =>
            sum +
            item.product.price * item.quantity,
        0
    );
    return {
        Uid,
        fetchCart,
        CartList,
        totalPrice,
        handleCheckout,
        TransformPrice,
    }
}

export default useCartPage