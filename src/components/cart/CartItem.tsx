"use client";

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import type { CartProduct } from "@/store/cartStore";

interface CartItemProps {
  item: CartProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const cart = useCart();

  return (
    <article className="grid grid-cols-[5rem_1fr] gap-4 border-b border-emerald-950/10 py-5 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
      <div className="relative aspect-square rounded-lg border border-emerald-950/10 bg-white p-2 shadow-sm">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0">
        <h2 className="line-clamp-2 font-semibold text-gray-900">{item.title}</h2>
        <p className="mt-1 text-sm text-gray-600">${item.price.toFixed(2)} each</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label={`Decrease ${item.title} quantity`}
            disabled={item.quantity <= 1}
            onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-300 text-gray-800 transition-colors hover:border-emerald-700 hover:bg-emerald-50 disabled:opacity-40"
          >
            -
          </button>
          <span className="min-w-8 text-center" aria-label="Quantity">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label={`Increase ${item.title} quantity`}
            onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
            className="h-8 w-8 cursor-pointer rounded border border-gray-300 text-gray-800 transition-colors hover:border-emerald-700 hover:bg-emerald-50"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => cart.removeFromCart(item.id)}
            className="ml-2 text-sm font-medium text-red-700 underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="col-span-2 text-right font-semibold text-gray-900 sm:col-span-1">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </article>
  );
}