import { createStore } from "zustand";
import { IUser } from "@/types/models/IUser";
import { createBoundedUseStore } from "@/store/CreateBoundedUseStore";

interface AuthState {
  user: IUser | null;
  isAuth: boolean;
  accessToken: string | null;
  setIsAuth: (isAuth: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: IUser | null) => void;
}

export const authStore = createStore<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuth: false,

  setUser: (user) => set((state) => ({ user: user })),
  setAccessToken: (accessToken) =>
    set((state) => ({ accessToken: accessToken })),
  setIsAuth: (isAuth: boolean) => set((state) => ({ isAuth })),
}));

export const useAuthStore = createBoundedUseStore(authStore);
