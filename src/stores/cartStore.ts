// // import { create } from "zustand";

// type AuthState = {
//     uid: string | null;
//     setUid: (uid: string | null) => void;
//     clearUid: () => void;
// }

// export const useAuthStore = create<AuthState>()((set) => ({
//     uid: null,
//     setUid: (uid) => set({ uid }),
//     clearUid: () => set({ uid: null }),
// }));


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
            setCount: (item) => set((s) => ({ count: item })),
        }),
        {
            name: 'counter-cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)