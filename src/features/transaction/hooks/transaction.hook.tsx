import { GetOrder, batchDeleteOrder, deleteSingleOrder, } from "@/data/repositories/firestore.repository";
import { Orders } from "@/domain/entities/orders_entities";
import { useAuthStore } from "@/stores/authStore";
import { DocumentData, QueryDocumentSnapshot, } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState, } from "react";

function useTransactionPage() {
    const Uid = useAuthStore((s) => s.uid);

    const [TransactionCartList, setTransactionCartList] = useState<Orders[]>([]);

    const [InitialLoading, setInitialLoading] = useState(false);
    const [PaginationLoading, setPaginationLoading] = useState(false);
    const [DeleteLoading, setDeleteLoading] = useState(false);

    const [SelectMode, setSelectMode] = useState(false);
    const [SelectedIdMaps, setSelectedIdMaps] = useState<Set<string>>(new Set());

    const lastPageRef = useRef<QueryDocumentSnapshot<DocumentData> | undefined>(undefined);

    const hasMoreRef = useRef(true);
    const isLoadingRef = useRef(false);

    const isAllSelected = TransactionCartList.length > 0 && SelectedIdMaps.size === TransactionCartList.length;

    const handleGetData = useCallback(async () => {
        if (!Uid || !hasMoreRef.current || isLoadingRef.current) {
            return;
        }

        const isInitialLoad = lastPageRef.current === undefined;

        isLoadingRef.current = true;

        if (isInitialLoad) {
            setInitialLoading(true);
        } else {
            setPaginationLoading(true);
        }

        try {
            const response = await GetOrder(
                Uid,
                lastPageRef.current
            );

            if (response.lastDoc != null) {
                lastPageRef.current = response.lastDoc;
            } else {
                hasMoreRef.current = false;
            }

            setTransactionCartList((prev) => {
                const map = new Map<string, Orders>();

                [...prev, ...response.orders].forEach((order) => {
                    map.set(order.id, order);
                });

                return Array.from(map.values()).sort((a, b) => {
                    const timeA = a.created_at?.seconds ?? 0;
                    const timeB = b.created_at?.seconds ?? 0;

                    return timeB - timeA;
                });
            });
        } catch (error) {
            console.error("Gagal mengambil order:", error);
        } finally {
            setInitialLoading(false);
            setPaginationLoading(false);
            isLoadingRef.current = false;
        }
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

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        setSelectedIdMaps((prev) => {
            const allSelected =
                TransactionCartList.length > 0 &&
                prev.size === TransactionCartList.length;

            if (allSelected) {
                return new Set();
            }

            return new Set(
                TransactionCartList.map((item) => item.id)
            );
        });
    }, [TransactionCartList]);

    const handleDeleteSelected = useCallback(async () => {
        if (!Uid || SelectedIdMaps.size === 0) {
            return;
        }

        try {
            setDeleteLoading(true);

            const ids = Array.from(SelectedIdMaps);

            await batchDeleteOrder(ids);

            setTransactionCartList((prev) =>
                prev.filter((item) => !SelectedIdMaps.has(item.id))
            );

            setSelectedIdMaps(new Set());
            setSelectMode(false);
        } catch (error) {
            console.error("Gagal menghapus order:", error);
        } finally {
            setDeleteLoading(false);
        }
    }, [Uid, SelectedIdMaps]);

    const handleDeleteSwipe = useCallback(
        async (id: string) => {
            if (!Uid) {
                return;
            }

            try {
                setDeleteLoading(true);

                await deleteSingleOrder(id);

                setTransactionCartList((prev) =>
                    prev.filter((item) => item.id !== id)
                );

                setSelectedIdMaps((prev) => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            } catch (error) {
                console.error("Gagal menghapus order:", error);
            } finally {
                setDeleteLoading(false);
            }
        },
        [Uid]
    );

    return {
        TransactionCartList,

        InitialLoading,
        PaginationLoading,
        DeleteLoading,

        SelectMode,
        SelectedIdMaps,
        isAllSelected,

        toggleSelectMode,
        handleToggleSelect,
        handleSelectAll,
        handleDeleteSelected,
        handleGetData,
        handleDeleteSwipe,
    };
}

export default useTransactionPage;