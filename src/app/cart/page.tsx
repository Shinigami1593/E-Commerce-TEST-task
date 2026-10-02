"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const cart = useCart();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-emerald-800">Almost yours</p>
      <h1 className="mt-2 text-4xl font-bold text-gray-950">Your cart</h1>
      {cart.items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-emerald-950/10 bg-white px-4 py-12 text-center shadow-sm">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section aria-label="Cart items">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>
          <CartSummary totalPrice={cart.getTotalPrice()} />
        </div>
      )}
    </main>
  );
}