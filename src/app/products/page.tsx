import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/products/ProductGrid";
import { getCategories, getProducts } from "@/lib/api/products";
import type { SortOrder } from "@/types/product";

export const metadata: Metadata = {
  title: "Products | Everyday Store",
  description: "Browse and filter the Everyday Store product catalog.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const query = await searchParams;
  const sortParameter = query.sort;
  let sortOrder: SortOrder | undefined;

  if (sortParameter === "asc" || sortParameter === "desc") {
    sortOrder = sortParameter;
  }

  let initialPage = 1;
  if (typeof query.page === "string") {
    const pageNumber = Number(query.page);
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      initialPage = pageNumber;
    }
  }

  const [productList, categoryList] = await Promise.all([
    getProducts(sortOrder),
    getCategories(),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-800">Thoughtful finds, every day</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-950">Shop the collection</h1>
        </div>
        <form action="/products" method="get" className="flex items-end gap-2">
          <input type="hidden" name="page" value="1" />
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Sort by price
            <select
              name="sort"
              defaultValue={sortOrder ?? ""}
              className="h-10 rounded-md border border-gray-300 bg-white px-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">Default order</option>
              <option value="asc">Price: low to high</option>
              <option value="desc">Price: high to low</option>
            </select>
          </label>
          <button
            type="submit"
            className="h-10 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Apply
          </button>
        </form>
      </div>

      <ProductGrid
        productList={productList}
        categoryList={categoryList}
        initialPage={initialPage}
      />
      <p className="mt-8 text-sm text-gray-600">
        Need help? <Link href="/cart" className="underline">View your cart</Link>
      </p>
    </main>
  );
}