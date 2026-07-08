import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CheckCart = {
    check: boolean;
    setCheck: (item: boolean) => void;
}

export const useCheckCart = create<CheckCart>()(
    persist(
        (set) => ({
            check: false,
            setCheck: (item: boolean) => set((s) => ({ check: item })),
        }),
        {
            name: 'check-cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
