import { CheckoutCart, GetCart, batchDeleteCart, batchUpdateCart, deleteSingleCart } from "@/data/repositories/firestore.repository";
import { ProductCartEntities } from "@/domain/entities/product_entities";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useFocusEffect } from "expo-router/react-navigation";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatCurrency } from "react-native-format-currency";

function useCartPage() {

    const [Loading, setLoading] = useState<boolean>(false);
    const [InitialLoading, setInitialLoading] = useState<boolean>(false);
    const [DeleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [CartList, setCartList] = useState<ProductCartEntities[]>([]);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const pendingUpdates = useRef<Map<string, number>>(new Map());

    const setCount = useCartStore((s) => s.setCount);

    const Uid = useAuthStore((s) => s.uid ?? null);

    const isAllSelected = CartList.length > 0 && selectedIds.size === CartList.length;

    useEffect(() => {
        const count = CartList.reduce((sum, item) => sum + item.quantity, 0);
        setCount(count);
    }, [CartList]);

    const TransformPrice = (price: number): string => {
        const roundedPrice = Math.round(price * 100) / 100;

        const [withSymbol] = formatCurrency({
            amount: roundedPrice,
            code: "USD",
        });

        return withSymbol;
    };

    const fetchCart = async (uid: string) => {
        setInitialLoading(true);
        const data = await GetCart(uid);
        setCartList(data);
        setInitialLoading(false);
    };

    const handleCheckout = async () => {
        if (!Uid || CartList.length === 0) return;

        await CheckoutCart(Uid, CartList);
        setSelectedIds(new Set());
        setSelectMode(false);
        await fetchCart(Uid);
    };

    const toggleSelectMode = () => {
        setSelectMode((prev) => {
            if (prev) {
                setSelectedIds(new Set());
            }
            return !prev;
        });
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(CartList.map((item) => item.id)));
        }
    };

    const handleDeleteSingle = async (id: string) => {

        setDeleteLoading(true);

        if (!Uid) return;
        console.log("Clicked!");

        await deleteSingleCart(id);
        await fetchCart(Uid);

        setDeleteLoading(false);
    }

    const handleDeleteSelected = async () => {
        if (!Uid || selectedIds.size === 0) return;

        setDeleteLoading(true);

        const ids = Array.from(selectedIds);
        await batchDeleteCart(ids);

        setSelectedIds(new Set());
        setSelectMode(false);
        await fetchCart(Uid);

        setDeleteLoading(false);
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

    useFocusEffect(
        useCallback(() => {
            if (!Uid) return;
            const timer = setTimeout(() => fetchCart(Uid), 0);
            return () => clearTimeout(timer);
        }, [Uid])
    );

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
        if (selectMode) return;
        setCartList((prev) =>
            prev.map((item) =>
                item.id === cartId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        const item = CartList.find((i) => i.id === cartId);
        if (item) queueUpdate(cartId, item.quantity + 1);
    };

    const handleLocalDecrease = (cartId: string) => {
        if (selectMode) return;
        const item = CartList.find((i) => i.id === cartId);
        if (!item) return;

        if (item.quantity <= 1) {
            setDeleteLoading(true);
            queueUpdate(cartId, 0);
            setCartList((prev) => prev.filter((i) => i.id !== cartId));
            setDeleteLoading(false);
            return;
        }

        queueUpdate(cartId, item.quantity - 1);
        setCartList((prev) =>
            prev.map((i) =>
                i.id === cartId
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            )
        );
    };

    const totalPrice = CartList.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0);
    return {
        Uid,
        CartList,
        totalPrice,
        handleCheckout,
        handleLocalIncrease,
        handleLocalDecrease,
        TransformPrice,
        selectMode,
        selectedIds,
        isAllSelected,
        toggleSelectMode,
        handleToggleSelect,
        handleSelectAll,
        handleDeleteSelected,
        Loading,
        handleDeleteSingle,
        InitialLoading,
        DeleteLoading
    }
}

export default useCartPage
