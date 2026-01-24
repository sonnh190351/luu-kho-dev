import { create } from 'zustand';
import type {UserDetails} from "../models/user_details.ts";

interface AuthState {
    user: UserDetails | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            set({ error: 'Invalid credentials', loading: false });
        } catch {
            set({ error: 'Login failed', loading: false });
        }
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },
}));
