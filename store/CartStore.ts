import { createStore } from "zustand";
import { createBoundedUseStore } from "@/store/CreateBoundedUseStore";
import { IProduct } from "@/types/models/IProducts";
import { CartItemType } from "@/modules/cart/types/CartItemType";

interface CartState {
  items: Record<number, CartItemType>;

  addItem: (item: IProduct) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const cartStore = createStore<CartState>((set) => ({
  items: {},

  addItem: (product: IProduct) =>
    set((state) => {
      const existing = state.items[product.id];
      return {
        items: {
          ...state.items,
          [product.id]: {
            id: product.id,
            item: product,
            quantity: existing ? existing.quantity + 1 : 1,
          },
        },
      };
    }),

  removeItem: (id: number) =>
    set((state) => {
      const existing = state.items[id];
      if (!existing) return state;

      const newItems = { ...state.items };

      if (existing.quantity > 1) {
        newItems[id] = { ...existing, quantity: existing.quantity - 1 };
      } else {
        delete newItems[id];
      }

      return { items: newItems };
    }),
  clearCart: () => set({ items: {} }),
}));

export const useCartStore = createBoundedUseStore(cartStore);
