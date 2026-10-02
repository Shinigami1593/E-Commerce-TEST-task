"use client";

import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import Pagination from "@/components/ui/Pagination";
import type { Category, Product } from "@/types/product";

const PRODUCTS_PER_PAGE = 12;

interface ProductGridProps {
  productList: Product[];
  categoryList: Category[];
  initialPage: number;
}

export default function ProductGrid({
  productList,
  categoryList,
  initialPage,
}: ProductGridProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const filteredProductList: Product[] = [];

  for (const product of productList) {
    if (
      searchText !== "" &&
      !product.title.toLowerCase().includes(searchText.toLowerCase())
    ) {
      continue;
    }

    if (selectedCategory !== "" && product.category !== selectedCategory) {
      continue;
    }

    if (minPrice !== "" && product.price < Number(minPrice)) {
      continue;
    }

    if (maxPrice !== "" && product.price > Number(maxPrice)) {
      continue;
    }

    filteredProductList.push(product);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProductList.length / PRODUCTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstProductIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProductList = filteredProductList.slice(
    firstProductIndex,
    firstProductIndex + PRODUCTS_PER_PAGE,
  );

  function changeSearchText(value: string) {
    setSearchText(value);
    setCurrentPage(1);
  }

  function changeCategory(value: string) {
    setSelectedCategory(value);
    setCurrentPage(1);
  }

  function changeMinPrice(value: string) {
    setMinPrice(value);
    setCurrentPage(1);
  }

  function changeMaxPrice(value: string) {
    setMaxPrice(value);
    setCurrentPage(1);
  }

  return (
    <div>
      <ProductFilters
        categoryList={categoryList}
        searchText={searchText}
        selectedCategory={selectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSearchTextChange={changeSearchText}
        onCategoryChange={changeCategory}
        onMinPriceChange={changeMinPrice}
        onMaxPriceChange={changeMaxPrice}
      />

      {visibleProductList.length === 0 ? (
        <p className="rounded-xl border border-emerald-950/10 bg-white px-4 py-12 text-center text-gray-600 shadow-sm">
          No products match your filters
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProductList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}