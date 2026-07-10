import { GetOrder, batchDeleteOrder } from "@/data/repositories/firestore.repository";
import { Orders } from "@/domain/entities/orders_entities";
import { useAuthStore } from "@/stores/authStore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

function useTransactionPage() {
    const Uid = useAuthStore((s) => s.uid);

    const [TransactionCartList, setTransactionCartList] = useState<Orders[]>([]);
    const [Loading, setLoading] = useState<boolean>(false);
    const [SelectMode, setSelectMode] = useState(false);
    const [SelectedIdMaps, setSelectedIdMaps] = useState<Set<string>>(new Set());

    const lastPageRef = useRef<QueryDocumentSnapshot<DocumentData> | undefined>(undefined);
    const hasMoreRef = useRef(true);
    const isLoadingRef = useRef(false);

    const isAllSelected =
        TransactionCartList.length > 0 &&
        SelectedIdMaps.size === TransactionCartList.length;

    const handleGetData = useCallback(async () => {
        if (!Uid || !hasMoreRef.current || isLoadingRef.current) return;
        isLoadingRef.current = true;
        setLoading(true);

        const response = await GetOrder(Uid as string, lastPageRef.current);

        if (response.lastDoc != null) {
            lastPageRef.current = response.lastDoc;
        } else {
            hasMoreRef.current = false;
        }

        setTransactionCartList(prev => [...prev, ...response.orders]);
        setLoading(false);
        isLoadingRef.current = false;
    }, [Uid]);

    useEffect(() => {
        handleGetData();
    }, [handleGetData]);

    const toggleSelectMode = useCallback(() => {
        setSelectMode((prev) => {
            if (prev) {
                setSelectedIdMaps(new Set());
            }
            return !prev;
        });
    }, []);

    const handleToggleSelect = useCallback((id: string) => {
        setSelectedIdMaps((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        setTransactionCartList((list) => {
            setSelectedIdMaps((prev) => {
                const allSelected = list.length > 0 && prev.size === list.length;
                if (allSelected) {
                    return new Set();
                } else {
                    return new Set(list.map((item) => item.id));
                }
            });
            return list;
        });
    }, []);

    const handleDeleteSelected = useCallback(async () => {
        if (!Uid || SelectedIdMaps.size === 0) return;
        setLoading(true);
        const ids = Array.from(SelectedIdMaps);
        await batchDeleteOrder(ids);

        setSelectedIdMaps(new Set());
        setSelectMode(false);
        setTransactionCartList([]);
        lastPageRef.current = undefined;
        hasMoreRef.current = true;
        handleGetData();
    }, [Uid, SelectedIdMaps, handleGetData]);

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
        handleGetData
    };
}

export default useTransactionPage;
