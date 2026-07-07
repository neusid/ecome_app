import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
    count: number;
    setCount: (item: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            count: 0,
            setCount: (item: number) => set((s) => ({ count: item })),
        }),
        {
            name: 'counter-cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
