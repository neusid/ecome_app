import { GetSingleOrder } from "@/data/repositories/firestore.repository";
import { Orders } from "@/domain/entities/orders_entities";
import { useAuthStore } from "@/stores/authStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

function useDetailTransactionPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [order, setOrder] = useState<Orders | null>(null);
    const [loading, setLoading] = useState(true);
    const [DetailTransaction, setDetailTransaction] = useState<Orders>();
    const Uid = useAuthStore((s) => s.uid ?? null);

    useEffect(() => {
        handleGetData();
    }, []);

    const handleGetData = async () => {
        console.log(Uid);
        if (!Uid || Array.isArray(Uid)) return;
        setLoading(true);
        const response = await GetSingleOrder(id);
        if (response == null) return;
        setDetailTransaction(response);
        setLoading(false);
    };

    return {
        loading,
        DetailTransaction,
        setDetailTransaction,
        setLoading,
        handleGetData,
    };



}

export default useDetailTransactionPage;