import { GetOrder, batchDeleteOrder } from "@/data/repositories/firestore.repository";
import { Orders } from "@/domain/entities/orders_entities";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

function useTransactionPage() {
    const Uid = useAuthStore((s) => s.uid);

    const [TransactionCartList, setTransactionCartList] = useState<Orders[]>([]);
    const [Loading, setLoading] = useState<boolean>(false);
    const [SelectMode, setSelectMode] = useState(false);
    const [SelectedIdMaps, setSelectedIdMaps] = useState<Set<string>>(new Set());

    const isAllSelected =
        TransactionCartList.length > 0 &&
        SelectedIdMaps.size === TransactionCartList.length;

    useEffect(() => {
        handleGetData();
    }, []);

    const handleGetData = async () => {
        if (!Uid || Array.isArray(Uid)) return;
        setLoading(true);
        const response = await GetOrder(Uid as string);
        setTransactionCartList(response);
        setLoading(false);
    };

    const toggleSelectMode = () => {
        setSelectMode((prev) => {
            if (prev) {
                setSelectedIdMaps(new Set());
            }
            return !prev;
        });
    };

    const handleToggleSelect = (id: string) => {
        setSelectedIdMaps((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIdMaps(new Set());
        } else {
            setSelectedIdMaps(new Set(TransactionCartList.map((item) => item.id)));
        }
    };

    const handleDeleteSelected = async () => {
        if (!Uid || SelectedIdMaps.size === 0) return;

        setLoading(true);
        const ids = Array.from(SelectedIdMaps);
        await batchDeleteOrder(ids);

        setSelectedIdMaps(new Set());
        setSelectMode(false);
        await handleGetData();
        setLoading(false);
    };

    return {
        TransactionCartList,
        Loading,
        SelectMode,
        SelectedIdMaps,
        isAllSelected,
        toggleSelectMode,
        handleToggleSelect,
        handleSelectAll,
        handleDeleteSelected,
    };
}

export default useTransactionPage;
