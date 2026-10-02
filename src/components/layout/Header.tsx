"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function Header() {
  const cart = useCart();
  let itemCount = 0;

  for (const item of cart.items) {
    itemCount += item.quantity;
  }

  return (
    <header className="border-b border-emerald-950/15 bg-[#153d31] text-white shadow-sm">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/products" className="text-lg font-bold tracking-wide text-white">
          Everyday <span className="text-emerald-300">Store</span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-emerald-50">
          <Link href="/products" className="transition-colors hover:text-emerald-300">
            Products
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart, ${itemCount} items`}
            className="transition-colors hover:text-emerald-300"
          >
            Cart ({itemCount})
          </Link>
        </div>
      </nav>
    </header>
  );
}