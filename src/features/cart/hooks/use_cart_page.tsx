import { CheckoutCart, GetCart, batchUpdateCart } from "@/data/repositories/firestore.repository";
import { ProductCartEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatCurrency } from "react-native-format-currency";


function useCartPage() {

    const [CartList, setCartList] = useState<ProductCartEntities[]>([]);
    const pendingUpdates = useRef<Map<string, number>>(new Map());

    const setCount = useCartStore((s) => s.setCount);

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
        const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
        setCount(totalItems);
    };

    const handleCheckout = async () => {
        if (!Uid || CartList.length === 0) return;

        await CheckoutCart(Uid, CartList);
        await fetchCart(Uid);
    };

    const syncToFirestore = useMemo(
        () => debounce(async () => {
            if (pendingUpdates.current.size === 0) return;

            const changes: { id: string; quantity: number }[] = [];

            pendingUpdates.current.forEach((quantity, id) => {
                changes.push({ id, quantity });
            });
            pendingUpdates.current.clear();

            await batchUpdateCart(changes);
        }, 900),
        []
    );

    useEffect(() => {
        if (!Uid) return;
        fetchCart(Uid);
    }, [Uid]);

    useEffect(() => {
        return () => {
            syncToFirestore.flush();
        };
    }, [syncToFirestore]);

    const queueUpdate = (cartId: string, newQuantity: number) => {
        pendingUpdates.current.set(cartId, newQuantity);
        syncToFirestore();
    };

    const handleLocalIncrease = (cartId: string) => {
        setCartList(prev => {
            const updated = prev.map(item => item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item);
            const item = updated.find(i => i.id === cartId);
            if (item) queueUpdate(cartId, item.quantity);
            setCount(updated.reduce((sum, i) => sum + i.quantity, 0));
            return updated;
        });
    };

    const handleLocalDecrease = (cartId: string) => {
        setCartList(prev => {
            const item = prev.find(i => i.id === cartId);
            if (!item) return prev;
            if (item.quantity <= 1) {
                queueUpdate(cartId, 0);
                const updated = prev.filter(i => i.id !== cartId);
                setCount(updated.reduce((sum, i) => sum + i.quantity, 0));
                return updated;
            }
            const updated = prev.map(i => i.id === cartId ? { ...i, quantity: i.quantity - 1 } : i);
            queueUpdate(cartId, item.quantity - 1);
            setCount(updated.reduce((sum, i) => sum + i.quantity, 0));
            return updated;
        });
    };

    const totalPrice = CartList.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0);
    return { Uid, fetchCart, CartList, totalPrice, handleCheckout, handleLocalIncrease, handleLocalDecrease, TransformPrice }
}

export default useCartPage
