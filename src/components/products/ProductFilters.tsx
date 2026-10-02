"use client";

import type { Category } from "@/types/product";

interface ProductFiltersProps {
  categoryList: Category[];
  searchText: string;
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  onSearchTextChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export default function ProductFilters({
  categoryList,
  searchText,
  selectedCategory,
  minPrice,
  maxPrice,
  onSearchTextChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
}: ProductFiltersProps) {
  return (
    <section
      aria-label="Filter products"
      className="mb-7 grid grid-cols-1 gap-4 rounded-xl border border-emerald-950/10 bg-white/90 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 sm:p-5"
    >
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Search products
        <input
          type="search"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Search by name"
          className="h-10 rounded-md border border-gray-300 bg-white px-3 font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Category
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="">All categories</option>
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Minimum price
        <input
          type="number"
          min="0"
          step="0.01"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
          placeholder="$0.00"
          className="h-10 rounded-md border border-gray-300 bg-white px-3 font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Maximum price
        <input
          type="number"
          min="0"
          step="0.01"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          placeholder="Any price"
          className="h-10 rounded-md border border-gray-300 bg-white px-3 font-normal outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
      </label>
    </section>
  );
}