import { notFound } from "next/navigation";
import type { Category, Product, SortOrder } from "@/types/product";
import { apiFetch } from "./client";
import fixtureProducts from "@/lib/api/fixtures/products.json";
import fixtureCategories from "@/lib/api/fixtures/categories.json";

export function sortProducts<T extends { price: number }>(
  productList: T[],
  sort?: SortOrder,
): T[] {
  const sortedProducts = [...productList];

  if (sort === "asc") {
    sortedProducts.sort((firstProduct, secondProduct) => {
      return firstProduct.price - secondProduct.price;
    });
  }

  if (sort === "desc") {
    sortedProducts.sort((firstProduct, secondProduct) => {
      return secondProduct.price - firstProduct.price;
    });
  }

  return sortedProducts;
}

export async function getProducts(sort?: SortOrder): Promise<Product[]> {
  try {
    const productList = await apiFetch<Product[]>("/products");
    return sortProducts(productList, sort);
  } catch (error) {
    console.warn("Fake Store API unreachable, using local fixture data", error);
    return sortProducts([...((fixtureProducts as Product[]) ?? [])], sort);
  }
}

export async function getProductById(id: string): Promise<Product> {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  let product: Product | null;

  try {
    product = await apiFetch<Product>(`/products/${id}`);
  } catch (error) {
    console.warn("Fake Store API unreachable, using local fixture data", error);
    product = (fixtureProducts as Product[]).find((item) => item.id === numericId) ?? null;
  }

  if (product === null) {
    notFound();
  }

  return product;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categoryList = await apiFetch<Category[]>("/products/categories");
    return categoryList;
  } catch (error) {
    console.warn("Fake Store API unreachable, using local fixture data", error);
    return fixtureCategories as Category[];
  }
}