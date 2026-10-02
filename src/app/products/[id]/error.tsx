"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ reset }: ProductErrorProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20">
      <ErrorMessage message="We couldn't load this product. Please try again." />
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Retry
      </button>
    </main>
  );
}