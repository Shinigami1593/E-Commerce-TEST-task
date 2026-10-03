import test from "node:test";
import assert from "node:assert/strict";

import { sortProducts } from "./products";

test("sortProducts keeps the original order when no sort is requested", () => {
  const products = [{ id: 1, price: 12 }, { id: 2, price: 8 }, { id: 3, price: 15 }];

  assert.deepEqual(sortProducts(products), products);
});

test("sortProducts sorts ascending by price", () => {
  const products = [{ id: 1, price: 12 }, { id: 2, price: 8 }, { id: 3, price: 15 }];

  assert.deepEqual(sortProducts(products, "asc"), [
    { id: 2, price: 8 },
    { id: 1, price: 12 },
    { id: 3, price: 15 },
  ]);
});

test("sortProducts sorts descending by price", () => {
  const products = [{ id: 1, price: 12 }, { id: 2, price: 8 }, { id: 3, price: 15 }];

  assert.deepEqual(sortProducts(products, "desc"), [
    { id: 3, price: 15 },
    { id: 1, price: 12 },
    { id: 2, price: 8 },
  ]);
});
