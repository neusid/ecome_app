import { GetOrder } from "@/data/repositories/firestore.repository";
import { Orders } from "@/domain/entities/orders_entities";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

function useTransactionPage() {
    const Uid = useAuthStore((s) => s.uid);

    const [TransactionCartList, setTransactionCartList] = useState<Orders[]>();
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        handleGetData();
    }, []);

    const handleGetData = async () => {
        console.log(Uid);
        if (!Uid || Array.isArray(Uid)) return;
        setLoading(true);
        const response = await GetOrder(Uid as string);
        setTransactionCartList(response);
        setLoading(false);
    };

    return {
        TransactionCartList,
        Loading,
        setTransactionCartList,
        setLoading,
        handleGetData,
    };
}

export default useTransactionPage
