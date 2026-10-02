import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
      <p className="text-gray-600">This product may have been removed.</p>
      <Link
        href="/products"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Browse products
      </Link>
    </main>
  );
}