import { create } from "zustand";

type AuthState = {
    uid: string | null;
    setUid: (uid: string | null) => void;
    clearUid: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    uid: null,
    setUid: (uid) => set({ uid }),
    clearUid: () => set({ uid: null }),
}));