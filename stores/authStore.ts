import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    address: string | null;
    chainId: number | null;
    setToken: (token: string | null) => void;
    setAddress: (address: string | null) => void;
    setChainId: (chainId: number | null) => void;
    clearAuth: () => void; // 新增
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            address: null,
            chainId: null,
            setToken: (token) => set({ token }),
            setAddress: (address) => set({ address }),
            setChainId: (chainId) => set({ chainId }),
            clearAuth: () =>
                set({
                    token: null,
                    address: null,
                    chainId: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);

// 工具函数获取当前 token
export const getAuthToken = () => useAuthStore.getState().token;