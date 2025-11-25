"use client";

import { useCart } from "@/hooks/use-cart";
import { createContext, useContext, type ReactNode } from "react";

type CartContextType = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const cart = useCart();

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCartContext must be used inside <CartProvider>");
    }
    return ctx;
}