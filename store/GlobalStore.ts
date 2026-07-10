import { createStore } from "zustand";
import { createBoundedUseStore } from "@/store/CreateBoundedUseStore";

interface GlobalState {
  isLoading: boolean;

  setIsLoading: (bool: boolean) => void;
}

export const globalStore = createStore<GlobalState>((set) => ({
  isLoading: false,

  setIsLoading: (bool) => set({ isLoading: bool }),
}));

export const useGlobalStore = createBoundedUseStore(globalStore);
