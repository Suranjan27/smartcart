import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  // ➕ Add to cart (with quantity logic)
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        // increase quantity if already exists
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // new item
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  // ❌ Remove item
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // ➕ Increase quantity
  increaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  // ➖ Decrease quantity
  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0), // remove if 0
    })),
}));