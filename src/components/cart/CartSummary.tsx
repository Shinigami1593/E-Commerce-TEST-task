interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({ totalPrice }: CartSummaryProps) {
  return (
    <aside className="h-fit rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
      <div className="mt-4 flex justify-between border-b border-gray-200 pb-4 text-sm text-gray-700">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button
        type="button"
        disabled
        className="mt-6 w-full rounded-md bg-emerald-800 px-4 py-3 font-semibold text-white opacity-60"
      >
        Checkout unavailable
      </button>
    </aside>
  );
}