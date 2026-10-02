"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  function addProductToCart() {
    cart.addToCart(product, quantity);
    setAddedToCart(true);
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center rounded-md border border-gray-300 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className="h-10 w-10 transition-colors hover:bg-emerald-50 disabled:opacity-40"
          >
            -
          </button>
          <span className="min-w-10 text-center" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10 transition-colors hover:bg-emerald-50"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={addProductToCart}
        className="rounded-md bg-emerald-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-900"
      >
        Add to cart
      </button>
      {addedToCart && (
        <p role="status" className="text-sm text-green-700">
          Added to cart.
        </p>
      )}
    </div>
  );
}