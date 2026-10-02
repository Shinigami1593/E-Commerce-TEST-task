import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartProduct[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
}

export const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity) => {
        let safeQuantity = Math.floor(quantity);
        if (!Number.isFinite(safeQuantity) || safeQuantity < 1) {
          safeQuantity = 1;
        }

        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingProduct) {
            return {
              items: state.items.map((item) => {
                if (item.id === product.id) {
                  return { ...item, quantity: item.quantity + safeQuantity };
                }
                return item;
              }),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: safeQuantity,
              },
            ],
          };
        });
      },
      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (!Number.isFinite(quantity)) {
          return;
        }

        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }));
          return;
        }

        const safeQuantity = Math.floor(quantity);
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: safeQuantity };
            }
            return item;
          }),
        }));
      },
      getTotalPrice: () => {
        let totalPrice = 0;

        for (const item of get().items) {
          totalPrice += item.price * item.quantity;
        }

        return totalPrice;
      },
    }),
    {
      name: "everyday-store-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);